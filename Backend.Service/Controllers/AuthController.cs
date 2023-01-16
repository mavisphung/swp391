using Backend.Service.Consts;
using Backend.Service.Models.Login;
using Backend.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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
                        return StatusCode(StatusCodes.Status400BadRequest,
                        new
                        {
                            errorCode = BaseError.BAD_REQUEST_ERROR,
                            message = EnumStringMessage.ToDescriptionString(BaseError.BAD_REQUEST_ERROR)
                        });
                    }
                    loginResponseModel = await _authService.Login(loginRequest);
                    
                    break;
                case "google":
                    if (tokenId == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest,
                        new
                        {
                            errorCode = BaseError.BAD_REQUEST_ERROR,
                            message = EnumStringMessage.ToDescriptionString(BaseError.BAD_REQUEST_ERROR)
                        });
                    }
                    loginResponseModel = await _authService.LoginGoogle(tokenId);
                    break;
                default:
                    break;
            }

            if (loginResponseModel != null)
            {
                if (!loginResponseModel.Status)
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new
                        {
                            errorCode = BaseError.INTERNAL_SERVER_ERROR,
                            message = EnumStringMessage.ToDescriptionString(BaseError.INTERNAL_SERVER_ERROR)
                        });
                return Ok(loginResponseModel);
            }

            return StatusCode(StatusCodes.Status500InternalServerError,
                new
                {
                    errorCode = BaseError.INTERNAL_SERVER_ERROR,
                    message = EnumStringMessage.ToDescriptionString(BaseError.INTERNAL_SERVER_ERROR)
                });
        }
    }
}
