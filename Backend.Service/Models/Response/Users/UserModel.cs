﻿using Backend.Service.Entities;

namespace Backend.Service.Models.Response.Users
{
    public class UserModel : BaseModel<User>
    {
        public string Fullname { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Phone { get; set; } = String.Empty;
        public string Avatar { get; set; } = String.Empty;
        public bool Gender { get; set; } = false;

        //public UserModel() { }

        public UserModel(User user) : base(user)
        {
            Fullname = user.Fullname;
            Email = user.Email;
            Phone = user.Phone;
            Avatar = user.Avatar ?? "";
            Gender = user.Gender ?? false;
        }
    }
}
