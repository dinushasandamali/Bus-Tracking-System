using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Bus> Buses => Set<Bus>();

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);
            
            // User configuration
            mb.Entity<User>().HasIndex(u => u.Username).IsUnique();
            mb.Entity<User>().HasIndex(u => u.Email).IsUnique();
            
            // RouteStop - composite primary key for many-to-many relationship
            mb.Entity<RouteStop>()
                .HasKey(rs => new { rs.RouteId, rs.StopId });
            
            mb.Entity<RouteStop>()
                .HasOne(rs => rs.Route)
                .WithMany(r => r.RouteStops)
                .HasForeignKey(rs => rs.RouteId);
            
            mb.Entity<RouteStop>()
                .HasOne(rs => rs.Stop)
                .WithMany(s => s.RouteStops)
                .HasForeignKey(rs => rs.StopId);
        }
    }
}
