using System.Net;
using System.Text.Json;
using Backend.Service.Consts;
using Backend.Service.Entities;
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
        //private readonly ApplicationDbContext _context;
        private Dictionary<string, Func<Exception, ErrorResponse>> _cachedException;

        public ExceptionHandlingMiddleware(
            RequestDelegate next,
            ExceptionHandler handler
            )
        {
            _next = next;
            _handler = handler;
            //_context = new ApplicationDbContext();
            // Add exception here
            _cachedException = new Dictionary<string, Func<Exception, ErrorResponse>>
            {
                { typeof(NotFoundException).Name, _handler.HandleNotFound },
                { typeof(BaseException).Name, _handler.HandleBaseException },
                { typeof(Exception).Name,         _handler.HandleInternalServer }

            };
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            //using var transaction = _context.Database.BeginTransaction();
            try
            {
                await _next(httpContext);
                //await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await Task.WhenAll(
                    //transaction.RollbackAsync(),
                    HandleExceptionAsync(httpContext, ex));
                //await transaction.RollbackAsync();
                //await HandleExceptionAsync(httpContext, ex);
            }
        }

        
        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            ErrorResponse errorResponse = new ErrorResponse();
            if (_cachedException.ContainsKey(exception.GetType().Name)) {
                errorResponse = _cachedException[exception.GetType().Name](exception);
            } else
            {
                errorResponse = _cachedException[typeof(Exception).Name](exception);
            }
             
            context.Response.StatusCode = (int)errorResponse.HttpStatus;
            var result = JsonSerializer.Serialize(errorResponse);
            await context.Response.WriteAsync(result);
        }
    }
}
