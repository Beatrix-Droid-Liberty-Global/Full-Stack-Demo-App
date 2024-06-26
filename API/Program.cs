
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddApplicationServices(builder.Configuration);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
using var scope=app.Services.CreateScope(); //hte using statement heps us dispose of everything once everything is done in this scope. Deleted from memory once it is finished
var services=scope.ServiceProvider;
try{
    var context=services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();  //will migrate the db for us
    await Seed.SeedData(context);  
}

catch(System.Exception ex){
    var logger= services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during the migration: "+ex.Message);
  throw;  
}
app.Run();
