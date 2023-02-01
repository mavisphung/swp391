using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Service.Entities
{
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
    }
}
