using System.Net;
using Backend.Service.Consts;
using Backend.Service.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Backend.Service.Models.Validation
{
    public class ValidationResultModel
    {
        public string Message { get; }

        public List<ValidationError> Errors { get; }

        public int ErrorCode { get; }

        public ValidationResultModel(ModelStateDictionary modelState)
        {
            ErrorCode = (int)HttpStatusCode.BadRequest;
            Message = BaseError.INVALID_INPUT.ToString();
            Errors = modelState.Keys
                    .SelectMany(key => modelState[key].Errors.Select(x => new ValidationError(StringExtension.ToCamelCase(key), 0, x.ErrorMessage)))
                    .ToList();
        }
    }
}
