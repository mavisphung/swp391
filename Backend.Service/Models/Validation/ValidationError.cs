using Newtonsoft.Json;

namespace Backend.Service.Models.Validation
{
    public class ValidationError
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string? Field { get; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int Code { get; set; }

        public string Message { get; }

        public ValidationError(string field, int code, string message)
        {
            Field = !string.IsNullOrEmpty(field) ? field : null;
            Code = code != 0 ? code : 400;  //set the default code to 55. you can remove it or change it to 400.  
            Message = message;
        }
    }
}
