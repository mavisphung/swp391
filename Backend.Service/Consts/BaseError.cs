using System.ComponentModel;
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

        [Description("Account is disable")]
        USER_INACTIVE = 3,

        [Description("Password is not correct")]
        INVALID_PASSWORD = 4,

        [Description("User is not exist in database")]
        USER_NOT_FOUND = 5,

        [Description("Firebase token not found")]
        FIREBASE_TOKEN_NOT_FOUND = 6,

        NOT_FOUND = 7,

        INVALID_INPUT = 8,
        CATEGORY_NOT_FOUND,
        PRODUCT_NOT_FOUND,
        BANNER_NOT_FOUND,
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

