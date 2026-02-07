using System;
using System.Collections.Generic;

namespace backend.Models
{
    public enum TripStatus { Scheduled, Ongoing, Completed, Cancelled }

    public class Trip
    {
        public Guid Id { get; set; }
        public Guid BusRouteId { get; set; }
        public BusRoute BusRoute { get; set; } = null!;
        public Guid BusId { get; set; }
        public Bus Bus { get; set; } = null!;
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public TripStatus Status { get; set; } = TripStatus.Scheduled;
        public ICollection<Location>? Locations { get; set; }
    }
}
