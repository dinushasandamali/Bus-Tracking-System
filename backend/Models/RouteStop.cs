using System;

namespace backend.Models
{
    public class RouteStop
    {
        public Guid RouteId { get; set; }
        public Route Route { get; set; } = null!;
        public Guid StopId { get; set; }
        public Stop Stop { get; set; } = null!;
        public int StopOrder { get; set; }
    }
}
