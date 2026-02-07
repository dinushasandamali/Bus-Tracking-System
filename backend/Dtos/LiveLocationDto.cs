using System;

namespace backend.Dtos
{
    public class LiveLocationDto
    {
        public Guid BusId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
