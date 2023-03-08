using Backend.Service.Consts;
using Backend.Service.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace Backend.Service.Annotations
{
    public class AttributeMinMax : ValidationAttribute
    {
        public string ErrorMessage { get; set; }
        public int Minimum { get; set; }
        public int Maximum { get; set; }

        public override bool IsValid(object value)
        {
            string strValue = value + "";
            if (!string.IsNullOrEmpty(strValue))
            {
                int intValue = int.Parse(strValue);
                if (intValue < Minimum || intValue > Maximum)
                {
                    throw new BaseException
                    {
                        ErrorMessage = ErrorMessage,
                        HttpStatus = HttpStatusCode.BadRequest
                    };
                }
                return true;
                
            }
            throw new BaseException
            {
                ErrorMessage = ErrorMessage,
                HttpStatus = HttpStatusCode.BadRequest
            };
        }
    }
}
