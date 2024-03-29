﻿using System;
using System.Net;
using Backend.Service.Consts;
using Backend.Service.Exceptions;
using Backend.Service.Models.Response;

namespace Backend.Service.Helper.GlobalErrorHanding
{
    public class ExceptionHandler
    {
        private readonly ILogger<ExceptionHandler> _logger;
        public ExceptionHandler(
            ILogger<ExceptionHandler> logger
            )
        {
            _logger = logger;
        }

        private void _Logging(Exception exception)
        {
            _logger.LogError($"Exception: {exception.GetType().FullName}");
            _logger.LogError($"Message: {exception.Message}");
            _logger.LogError($"Stack trace: {exception.StackTrace}");
        }

        public ErrorResponse HandleNotFound(Exception exception)
        {
            _Logging(exception);
            var exc = (NotFoundException)exception;
            return new ErrorResponse 
            {
                HttpStatus = exc.HttpStatus,
                ErrorCode = (int)exc.HttpStatus,
                Message = exc.ErrorMessage
            };
        }

        public ErrorResponse HandleBaseException(Exception exception)
        {
            _Logging(exception);
            var exc = (BaseException)exception;
            return new ErrorResponse
            {
                HttpStatus = exc.HttpStatus,
                ErrorCode = (int)exc.HttpStatus,
                Message = exc.ErrorMessage
            };
        }

        public ErrorResponse HandleInternalServer(Exception exception)
        {
            _Logging(exception);
            return new ErrorResponse
            {
                HttpStatus = HttpStatusCode.InternalServerError,
                ErrorCode = (int)HttpStatusCode.InternalServerError,
                Message = exception.Message
            };
        }

        internal ErrorResponse HandleUserExisted(Exception exception)
        {
            _Logging(exception);
            var exc = (BaseException)exception;
            return new ErrorResponse
            {
                HttpStatus = exc.HttpStatus,
                ErrorCode = exc.StatusCode,
                Message = exc.ErrorMessage
            };
        }

        internal ErrorResponse HandleAuthenticationException(Exception exception)
        {
            _Logging(exception);
            var exc = (UnauthenticatedException)exception;
            return new ErrorResponse
            {
                HttpStatus = exc.HttpStatus,
                ErrorCode = exc.StatusCode,
                Message = exc.ErrorMessage
            };
        }
    }
}
