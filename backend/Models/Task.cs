using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Task
    {
        /// <summary>
        /// The id of a tasks
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// The id of the user attributed for this task
        /// </summary>
        public int? UserId { get; set; }
        /// <summary>
        /// The label of the task
        /// </summary>
        [Required, MaxLength(255)]
        public string Label { get; set; } = string.Empty;
        /// <summary>
        /// The status of the task (0 = In progress, 1 = Blocked, 2 = Completed)
        /// </summary>
        [Range(0, 2, ErrorMessage = "Status must be between 0 and 2.")]
        public byte Status { get; set; }
        /// <summary>
        /// Ref of UserId
        /// </summary>
        public User? User { get; set; }
    }
}
