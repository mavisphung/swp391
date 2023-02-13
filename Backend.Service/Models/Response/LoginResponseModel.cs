using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Service.Models.Response
{
    public class LoginResponseModel
    {
        public string JwtToken { get; set; }
        public int Id { get; set; }
        public string Fullname  { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Avatar { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public bool Status { get; set; }
    }
}
