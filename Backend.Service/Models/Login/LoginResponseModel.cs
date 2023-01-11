using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LOSMST.Models.Helper.Login
{
    public class LoginResponseModel
    {
        public string JwtToken { get; set; }
        public int Id { get; set; }
        public string? Fullname  { get; set; }
        public string? Phone { get; set; }
        public string? Avatar { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public bool Status { get; set; }
    }
}
