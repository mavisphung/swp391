﻿using System.ComponentModel;
using System.Runtime.Serialization;

namespace Backend.Service.Consts
{
    public enum BaseError
    {
        //400
        [Description("Bad Request")]
        BAD_REQUEST_ERROR = 1,
        //500
        [Description("Internal Server Error")]
        INTERNAL_SERVER_ERROR = 2,
        //500
        [Description("Account is disable")]
        USER_INACTIVE = 3,
    }

    public static class EnumStringMessage
    {
        public static string ToDescriptionString(this BaseError val)
        {
            DescriptionAttribute[] attributes = (DescriptionAttribute[]) val
               .GetType()
               .GetField(val.ToString())
               .GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length > 0 ? attributes[0].Description : string.Empty;
        }
    }
}
