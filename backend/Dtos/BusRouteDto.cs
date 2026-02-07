using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class BusRouteDto
    {
        [Required] public string RouteName { get; set; } = null!;
        [Required] public string StartLocation { get; set; } = null!;
        [Required] public string EndLocation { get; set; } = null!;
        public string? PathJson { get; set; }
        public Guid? BusId { get; set; }
    }
}
