using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Service.Models.Login
{
    public class LoginRequestModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
