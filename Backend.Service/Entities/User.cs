using System;
using System.Collections.Generic;

namespace Backend.Service.Entities
{
    public partial class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Fullname { get; set; } = null!;
        public string? Avatar { get; set; }
        public bool? Gender { get; set; }
        public string Phone { get; set; } = null!;
        public bool Status { get; set; }
        public int RoleId { get; set; }
    }
}
