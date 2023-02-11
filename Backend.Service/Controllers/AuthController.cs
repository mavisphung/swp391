using Backend.Service.Consts;
using Backend.Service.Exceptions;
using Backend.Service.Models.Request;
using Backend.Service.Models.Response;
using Backend.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Net;

namespace Backend.Service.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("sign-in")]
        public async Task<ActionResult<LoginResponseModel>> SignIn([FromHeader] string? tokenId,
                                                                    [FromHeader] string signUpMethod,
                                                                    [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] LoginRequestModel? loginRequest)
        {
            LoginResponseModel loginResponseModel = new LoginResponseModel();
            switch (signUpMethod)
            {
                case "local":
                    if (loginRequest == null)
                    {
                        throw new BaseException
                        {
                            StatusCode = (int)BaseError.BAD_REQUEST_ERROR,
                            ErrorMessage = EnumStringMessage.ToDescriptionString(BaseError.BAD_REQUEST_ERROR),
                            HttpStatus = HttpStatusCode.BadRequest
                        };
                    }
                    loginResponseModel = await _authService.Login(loginRequest);
                    break;
                case "google":
                    if (tokenId == null)
                    {
                        throw new BaseException
                        {
                            StatusCode = (int)BaseError.FIREBASE_TOKEN_NOT_FOUND,
                            ErrorMessage = EnumStringMessage.ToDescriptionString(BaseError.FIREBASE_TOKEN_NOT_FOUND),
                            HttpStatus = HttpStatusCode.BadRequest
                        };
                    }
                    loginResponseModel = await _authService.LoginGoogle(tokenId);
                    break;
                default:
                    break;
            }

            if (loginResponseModel != null)
            {
                if (!loginResponseModel.Status)
                    throw new BaseException
                    {
                        StatusCode = (int) BaseError.USER_INACTIVE,
                        ErrorMessage = EnumStringMessage.ToDescriptionString(BaseError.USER_INACTIVE),
                        HttpStatus = HttpStatusCode.InternalServerError
                    };
                return Ok(loginResponseModel);
            }

            throw new BaseException
            {
                StatusCode = (int)BaseError.INTERNAL_SERVER_ERROR,
                ErrorMessage = EnumStringMessage.ToDescriptionString(BaseError.INTERNAL_SERVER_ERROR),
                HttpStatus = HttpStatusCode.InternalServerError
            };
        }
    }
}
