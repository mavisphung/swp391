using System.ComponentModel.DataAnnotations.Schema;
using Backend.Service.Models.Response.Users;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Entities
{
    [Table("Users")]

    [Index(nameof(Email), nameof(Phone), IsUnique = true)]
    public partial class User : BaseEntity
    {
        
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Fullname { get; set; } = null!;
        public string? Avatar { get; set; } = "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/320620423_645965470600283_5399016748258514205_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RVQImNi32mwAX_n7MH6&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdSDrO96shUdednMeFri54TmEbV6_Kw7EL7RVVzcwLl0WA&oe=6408565D";
        public bool? Gender { get; set; } = false;
        public string Phone { get; set; } = null!;
        public bool Status { get; set; } = true;

        // Foreign key
        public int RoleId { get; set; } = 3;
        public Role Role { get; set; } = null!;

        // One to Many
        public virtual ICollection<ShippingAddress> ShippingAddresses { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }
        // One to one or zero relationship
        public virtual Cart? Cart { get; set; }



        public UserModel ToData()
        {
            return new UserModel(this);
        }
    }
}
