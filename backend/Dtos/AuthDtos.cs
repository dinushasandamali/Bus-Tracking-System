using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; } = null!;
        [Required] public string Email { get; set; } = null!;
        [Required] public string Password { get; set; } = null!;
    }

    public class LoginDto
    {
        [Required] public string Username { get; set; } = null!;
        [Required] public string Password { get; set; } = null!;
    }
}
