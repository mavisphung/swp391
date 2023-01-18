using System.Net;
using System.Text.Json;
using Backend.Service.Consts;
using Backend.Service.Exceptions;
using Backend.Service.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Helper.GlobalErrorHanding
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            var errorResponse = new ErrorResponse();
            switch (exception)
            {
                case BaseException ex:
                        errorResponse.HttpStatus = ex.HttpStatus;
                    errorResponse.ErrorCode = ex.StatusCode;
                    errorResponse.Message = ex.ErrorMessage;
                    break;
                default:
                    errorResponse.HttpStatus = HttpStatusCode.InternalServerError;
                    errorResponse.ErrorCode = (int) BaseError.INTERNAL_SERVER_ERROR;
                    errorResponse.Message = EnumStringMessage.ToDescriptionString(BaseError.INTERNAL_SERVER_ERROR);
                    break;
            }
            _logger.LogError(exception.Message);
            var result = JsonSerializer.Serialize(errorResponse);
            context.Response.StatusCode = (int) errorResponse.HttpStatus;

            await context.Response.WriteAsync(result);
        }
    }
}
