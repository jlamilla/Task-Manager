using System.ComponentModel.DataAnnotations;

namespace TaskManagementAPI.Models.Dto
{
    public class LoginRequestDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
    }
}
