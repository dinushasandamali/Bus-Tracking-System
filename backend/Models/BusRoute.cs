using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class BusRoute
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string RouteName { get; set; } = null!;

        [Required]
        public string StartLocation { get; set; } = null!;

        [Required]
        public string EndLocation { get; set; } = null!;

        // Optional: store path as JSON (list of lat/lng points)
        public string? PathJson { get; set; }

        // Optional: associate with a bus
        public Guid? BusId { get; set; }
    }
}
