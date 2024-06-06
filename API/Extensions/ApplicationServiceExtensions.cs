using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(opt => opt.UseSqlite(config.GetConnectionString("DefaultConnection")));  //tell program about db
        services.AddCors(opt=>{ opt.AddPolicy("CorsPolicy", policy=>{policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://127.0.0.1:3000");});});  // allow any policy
        services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(Application.Activities.List).Assembly));  ///add mediator that allows one to talk to the api and send and receive data from it
        services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

        return services;
    }
}