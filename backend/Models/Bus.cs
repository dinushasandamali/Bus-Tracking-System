using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Bus
    {
        public Guid Id { get; set; }
        public string RegistrationNumber { get; set; } = null!;
        public int Capacity { get; set; }
        public string? Description { get; set; }

        public ICollection<Trip>? Trips { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime LastUpdated { get; set;}
    }
}
