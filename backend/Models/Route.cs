using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Route
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public ICollection<RouteStop>? RouteStops { get; set; }
        public ICollection<Trip>? Trips { get; set; }
    }
}
