using Backend.Service.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Backend.Service.Models.Request
{
    public class LoginRequestModel
    {
        [AttributeNotBlank(ErrorMessage = "Email is not empty")]
        public string Email { get; set; }
        [AttributeNotBlank(ErrorMessage = "Password is not empty")]
        public string Password { get; set; }
    }
}
