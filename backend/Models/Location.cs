using System;

namespace backend.Models
{
    public class Location
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public Trip Trip { get; set; } = null!;
        public Guid BusId { get; set; }
        public Bus Bus { get; set; } = null!;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double? Speed { get; set; }
        public double? Heading { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
