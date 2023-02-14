using System.Net;
using Backend.Service.Consts;

namespace Backend.Service.Exceptions
{
    public class UserExistException : BaseException
    {
        public UserExistException()
        {
            ErrorMessage = BaseError.USER_EXISTED.ToString();
            StatusCode = (int)HttpStatusCode.BadRequest;
            HttpStatus = HttpStatusCode.BadRequest;
        }
    }
}
