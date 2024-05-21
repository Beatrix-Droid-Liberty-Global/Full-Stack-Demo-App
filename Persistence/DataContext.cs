using Domain;
using Microsoft.EntityFrameworkCore;
namespace Persistence;
public class DataContext : DbContext  //represents a session of the database
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Activity> Activities { get; set; }
}