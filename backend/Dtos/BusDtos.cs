using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class CreateBusDto
    {
        [Required] public string RegistrationNumber { get; set; } = null!;
        [Required] public int Capacity { get; set; }
        public string? Description { get; set; }
    }

    public class UpdateBusDto
    {
        [Required] public string RegistrationNumber { get; set; } = null!;
        [Required] public int Capacity { get; set; }
        public string? Description { get; set; }
    }
}
