using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        /// <summary>
        /// The id of a user
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// The lastname of the user
        /// </summary>
        [MaxLength(255)]
        public string Lastname { get; set; } = string.Empty;
        /// <summary>
        /// The firstname of the user
        /// </summary>
        [MaxLength(255)]
        public string Firstname { get; set; } = string.Empty;
        /// <summary>
        /// The avatar (photo) of the user
        /// </summary>
        [MaxLength(255)]
        public string Avatar { get; set; } = string.Empty;

        /// <summary>
        /// The tasks of a user
        /// </summary>
        public ICollection<Task> Tasks { get; set; } = new List<Models.Task>();

        /// <summary>
        /// Empty Contructor
        /// </summary>
        public User() { }
        /// <summary>
        /// Contructor for the init users at model creating context
        /// </summary>
        public User(int id, string lastname, string firstname, string avatar)
        {
            Id = id;
            Lastname = lastname;
            Firstname = firstname;
            Avatar = avatar;
            Tasks = new List<Models.Task>(); ;
        }
    }
}
