using Backend.Service.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Backend.Service.Models.Request
{
    public class LoginRequestModel
    {
        [AttributeNotBlank(ErrorCode = 900, ErrorMessage = "Email is not empty")]
        [EmailAddress]
        public string Email { get; set; }

        [AttributeNotBlank(ErrorCode = 901, ErrorMessage = "Password is not empty")]
        public string Password { get; set; }
    }
}
