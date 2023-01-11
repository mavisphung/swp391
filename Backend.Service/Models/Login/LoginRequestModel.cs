using System;
using System.Collections.Generic;
using System.Text;

namespace LOSMST.Models.Helper.Login
{
    public class LoginRequestModel
    {
        public string? Email { get; set; }
        public string? Password { get; set; }

        public string? SignInMethod { get; set; }
    }
}
