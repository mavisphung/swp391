using System.Net;

namespace Backend.Service.Exceptions
{
    public class BaseException : Exception
    {
        public string ErrorMessage { get; set; }
        public int StatusCode { get; set; }
        public HttpStatusCode HttpStatus { get; set; }
    }
}
