using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Bus> Buses => Set<Bus>();
        public DbSet<BusRoute> BusRoutes => Set<BusRoute>();
        public DbSet<Trip> Trips => Set<Trip>();
        public DbSet<Location> Locations => Set<Location>();



        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);

            // User unique constraints
            mb.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            mb.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Bus configuration
            mb.Entity<Bus>()
                .HasKey(b => b.Id);

            // BusRoute configuration
            mb.Entity<BusRoute>()
                .HasKey(br => br.Id);

            // Trip configuration
            mb.Entity<Trip>()
                .HasKey(t => t.Id);

            mb.Entity<Trip>()
                .HasOne(t => t.BusRoute)
                .WithMany()
                .HasForeignKey(t => t.BusRouteId)
                .OnDelete(DeleteBehavior.Restrict);

            mb.Entity<Trip>()
                .HasOne(t => t.Bus)
                .WithMany(b => b.Trips)
                .HasForeignKey(t => t.BusId)
                .OnDelete(DeleteBehavior.Restrict);

            // Location configuration
            mb.Entity<Location>()
                .HasKey(l => l.Id);

            mb.Entity<Location>()
                .HasOne(l => l.Trip)
                .WithMany(t => t.Locations)
                .HasForeignKey(l => l.TripId)
                .OnDelete(DeleteBehavior.Cascade);

            mb.Entity<Location>()
                .HasOne(l => l.Bus)
                .WithMany()
                .HasForeignKey(l => l.BusId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
