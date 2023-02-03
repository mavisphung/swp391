using System.Net;
using Backend.Service.Consts;

namespace Backend.Service.Exceptions
{
    public class NotFoundException : BaseException
    {
        public NotFoundException()
        {
            ErrorMessage = BaseError.NOT_FOUND.ToString();
            StatusCode = (int)BaseError.NOT_FOUND;
            HttpStatus = HttpStatusCode.NotFound;
        }
    }
}
