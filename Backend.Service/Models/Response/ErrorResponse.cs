using Backend.Service.Consts;
using System.Net;
using System.Text.Json.Serialization;

namespace Backend.Service.Models.Response
{
    public class ErrorResponse
    {
        [JsonPropertyName("errorCode")]
        public int ErrorCode { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }


        [JsonIgnore]
        public HttpStatusCode HttpStatus { get; set; }

        public void setError(BaseError errorCode)
        {
            if (errorCode != null)
            {
                ErrorCode = (int) errorCode;
                Message = EnumStringMessage.ToDescriptionString(errorCode);
            }
        }
    }
}
