using Backend.Service.Models.Response.Users;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Entities
{

    [Index(nameof(Email), IsUnique = true)]
    public partial class User : BaseEntity
    {
        
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Fullname { get; set; } = null!;
        public string? Avatar { get; set; }
        public bool? Gender { get; set; }
        public string Phone { get; set; } = null!;
        public bool Status { get; set; }

        // Foreign key
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;

        // One to Many
        public ICollection<ShippingAddress> ShippingAddresses { get; set; }

        public UserModel ToData()
        {
            return new UserModel(this);
        }
    }
}
