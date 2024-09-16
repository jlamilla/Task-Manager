using System.ComponentModel.DataAnnotations;

namespace TaskManagementAPI.Models
{
    public class Task
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
        public string CreateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? UpdateBy { get; set; }
        // Task Status: Pending, In Progress, Completed
        [Required]
        public string Status { get; set; }
    }
}
