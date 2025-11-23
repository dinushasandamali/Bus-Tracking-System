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
    }
}
