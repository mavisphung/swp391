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
        private readonly ExceptionHandler _handler;
        private Dictionary<string, Func<Exception, ErrorResponse>> _cachedException;

        public ExceptionHandlingMiddleware(
            RequestDelegate next,
            ExceptionHandler handler
            )
        {
            _next = next;
            _handler = handler;

            // Add exception here
            _cachedException = new Dictionary<string, Func<Exception, ErrorResponse>>
            {
                { typeof(NotFoundException).Name, _handler.HandleNotFound },
                { typeof(Exception).Name,         _handler.HandleInternalServer }

            };
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
            ErrorResponse errorResponse = _cachedException[exception.GetType().Name](exception);
            context.Response.StatusCode = (int)errorResponse.HttpStatus;
            var result = JsonSerializer.Serialize(errorResponse);
            await context.Response.WriteAsync(result);
        }
    }
}
