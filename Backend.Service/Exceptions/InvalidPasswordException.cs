using System.Net;
using Backend.Service.Consts;

namespace Backend.Service.Exceptions
{
    public class InvalidPasswordException : BaseException
    {
        public InvalidPasswordException()
        {
            ErrorMessage = BaseError.INVALID_PASSWORD.ToString();
            HttpStatus = HttpStatusCode.BadRequest;
            StatusCode = (int)HttpStatusCode.BadRequest;
        }
    }
}
