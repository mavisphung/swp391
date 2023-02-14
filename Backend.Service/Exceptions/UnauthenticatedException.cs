using System.Net;
using Backend.Service.Consts;

namespace Backend.Service.Exceptions
{
    public class UnauthenticatedException : BaseException
    {
        public UnauthenticatedException()
        {
            ErrorMessage = BaseError.UNAUTHENTICATED.ToString();
            StatusCode = (int)HttpStatusCode.Unauthorized;
            HttpStatus = HttpStatusCode.Unauthorized;
        }
    }
}
