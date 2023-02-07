using System.Net;
using Backend.Service.Consts;

namespace Backend.Service.Exceptions
{
    public class BaseException : Exception
    {
        public string ErrorMessage { get; set; } = BaseError.INTERNAL_SERVER_ERROR.ToString();
        public int StatusCode { get; set; } = (int)BaseError.INTERNAL_SERVER_ERROR;
        public HttpStatusCode HttpStatus { get; set; } = HttpStatusCode.InternalServerError;


        public BaseException(string errorMessage, int statusCode, HttpStatusCode httpStatus) : this(errorMessage)
        {
            StatusCode = statusCode;
            HttpStatus = httpStatus;
        }

        public BaseException(string message) : base(message)
        {
            ErrorMessage = message;
        }

        public BaseException() : base()
        { 
        }

        public BaseException(BaseError error) : base(error.ToDescriptionString())
        {
            ErrorMessage = error.ToString();
        }
    }
}
