using Backend.Service.Consts;
using Backend.Service.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace Backend.Service.Annotations
{
    public class AttributeNotBlank : ValidationAttribute
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }

        public override bool IsValid(object value)
        {
           string strValue = value + "";
            if (!string.IsNullOrEmpty(strValue))
            {
                return true;
            }
            throw new BaseException
            {
                StatusCode = ErrorCode,
                ErrorMessage = ErrorMessage,
                HttpStatus = HttpStatusCode.BadRequest
            };
        }
    }
}
