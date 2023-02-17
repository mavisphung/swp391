using Backend.Service.Consts;
using Backend.Service.Exceptions;
using Backend.Service.Models.Request;
using Backend.Service.Models.Response;
using Backend.Service.Models.User;
using Backend.Service.Models.Validation;
using Backend.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Net;

namespace Backend.Service.Controllers
{
    [Route("api/auth")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }


        /// <summary>
        /// Tạo tài khoản mới
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("register")]
        [ValidateModel]
        public async Task<IActionResult> Register([FromBody] CreateUserModel model)
        {
            var responseModel = await _authService.CreateUserAsync(model);
            return Created("", responseModel);
        }

        /// <summary>
        /// Đăng nhập bằng tài khoản (email) và mật khẩu
        /// </summary>
        /// <param name="signUpMethod"></param>
        /// <param name="loginRequestModel"></param>
        /// <returns></returns>
        /// <response code="201">Đăng nhập thành công</response>
        /// <response code="400">Sai email hoặc mật khẩu</response>
        [HttpPost("sign-en")]
        [ValidateModel]
        public async Task<IActionResult> SignInByHuyPhung(
            [FromBody] LoginRequestModel loginRequestModel,
            [FromHeader] string signUpMethod = "local")
        {
            LoginResponseModel responseModel = await _authService.Login2(loginRequestModel);
            return Created("", responseModel);
        }

        [HttpPost("sign-in")]
        public async Task<ActionResult<LoginResponseModel>> SignIn([FromHeader] string? tokenId,
                                                                    [FromHeader] string signUpMethod,
                                                                    [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] LoginRequestModel? loginRequest)
        {
            LoginResponseModel loginResponseModel = new LoginResponseModel();
            _logger.LogInformation($"[AuthController] : SignUpMethod = {signUpMethod}");
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
                        StatusCode = (int)BaseError.USER_INACTIVE,
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
