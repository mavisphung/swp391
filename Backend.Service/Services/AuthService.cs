using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using FirebaseAdmin;
using Backend.Service.Entities;
using System.Security.Cryptography;
using Backend.Service.Models.Response;
using Backend.Service.Repositories.IRepositories;
using Backend.Service.Consts;
using Backend.Service.Exceptions;
using System.Net;
using Backend.Service.Models.Request;
using Backend.Service.Models.User;
using Backend.Service.Extensions;
using FirebaseAdmin.Auth;
using Firebase.Auth;

namespace Backend.Service.Services
{
    public class AuthService
    {
        private readonly IUserRepository _accountRepository;
        private readonly IConfiguration _configuration;
        private readonly FirebaseApp _firebaseApp;
        private readonly FirebaseAuthProvider _firebaseAuthProvider;
        private readonly PasswordHasher _passwordHasher;
        private const int keySize = 64;
        private const int iterations = 350000;
        private HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        private BirdStoreConst _birdStoreConst;

        public AuthService(
            IConfiguration configuration, 
            IUserRepository accountRepository, 
            FirebaseApp firebase, 
            BirdStoreConst birdStoreConst,
            PasswordHasher passwordHasher,
            FirebaseAuthProvider authProvider)
        {
            _configuration = configuration;
            _accountRepository = accountRepository;
            _firebaseApp = firebase;
            _firebaseAuthProvider = authProvider;
            _birdStoreConst = birdStoreConst;
            _passwordHasher = passwordHasher;
        }


        /// <summary>
        /// Writen by Huy Phung
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        /// <exception cref="UserExistException"></exception>
        public async Task<UserResponseModel> CreateUserAsync(CreateUserModel model)
        {
            var user = new Entities.User()
            {
                Fullname = model.FullName,
                Email = model.Email,
                Password = _passwordHasher.HashPassword(model.Password),
                Phone = model.PhoneNumber,
                RoleId = 3,
                Gender = false,
                Status = true
            };

            try
            {
                await _accountRepository.AddAsync(user);
                await _accountRepository.SaveDbChangeAsync();

                // if success, update database on Firebase
                // Phone number must start with '+'
                await FirebaseAdmin.Auth.FirebaseAuth.GetAuth(_firebaseApp).CreateUserAsync(new UserRecordArgs()
                {
                    Disabled = false,
                    Email = user.Email,
                    DisplayName = user.Fullname,
                    Password = user.Password,
                    PhoneNumber = $"+84{user.Phone.Substring(0)}",
                    PhotoUrl = user.Avatar,
                    EmailVerified = false,
                    Uid = user.Id.ToString()
                });

                //List<Claim> claims = new List<Claim>
                //{
                //    new Claim(ClaimTypes.Role, user.RoleId.ToString()),
                //    new Claim(ClaimTypes.Name, user.Fullname),
                //    new Claim(ClaimTypes.Email, user.Email),
                //    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                //};
                Dictionary<string, object> claims2 = new Dictionary<string, object>()
                {
                    { ClaimTypes.Role, user.RoleId.ToString()},
                    { ClaimTypes.Name, user.Fullname },
                    { ClaimTypes.Email, user.Email },
                    { ClaimTypes.NameIdentifier, user.Id.ToString() }
                };


                await FirebaseAdmin.Auth.FirebaseAuth.GetAuth(_firebaseApp).SetCustomUserClaimsAsync(user.Id.ToString(), claims2);
            } catch (FirebaseAdmin.Auth.FirebaseAuthException _)
            {
                throw new BaseException(
                    errorMessage: BaseError.PHONE_NUMBER_EXISTED.ToString(),
                    statusCode: (int)HttpStatusCode.BadRequest,
                    httpStatus: HttpStatusCode.BadRequest);
            }
            catch (Exception _)
            {
                //throw _;
                throw new UserExistException();
            }

            return new UserResponseModel(user);
        }

        private async Task<LoginResponseModel> VerifyFirebaseTokenIdRegister(string idToken)
        {
            FirebaseToken decodedToken;
            try
            {
                decodedToken = await FirebaseAdmin.Auth.FirebaseAuth.GetAuth(_firebaseApp)
                       .VerifyIdTokenAsync(idToken);
            }
            catch (Exception ex)
            {
                throw new BaseException
                {
                    StatusCode = (int)BaseError.FIREBASE_TOKEN_NOT_FOUND,
                    ErrorMessage = EnumStringMessage.ToDescriptionString(BaseError.FIREBASE_TOKEN_NOT_FOUND),
                    HttpStatus = HttpStatusCode.BadRequest
                };
            }
            string uid = decodedToken.Uid;
            var firebaseUser = await FirebaseAdmin.Auth.FirebaseAuth.GetAuth(_firebaseApp).GetUserAsync(uid);
            var password = this.HashPasword("123456");
            var account = _accountRepository.GetFirstOrDefault(x => x.Email == firebaseUser.Email);
            if (account == null)
            {
                Entities.User userInfo = new Entities.User();
                userInfo.Email = firebaseUser.Email;
                userInfo.Password = password;
                userInfo.RoleId = 3;
                userInfo.Status = true;
                userInfo.Phone = String.Empty;
                userInfo.Fullname = String.IsNullOrEmpty(firebaseUser.DisplayName) ? "Chưa đặt tên" : firebaseUser.DisplayName;

                try
                {
                    _accountRepository.Add(userInfo);
                    _accountRepository.SaveDbChange();
                }
                catch (Exception)
                {
                    throw new Exception();
                }
            }

            account = _accountRepository.GetFirstOrDefault(x => x.Email == firebaseUser.Email);
            if (account != null)
            {
                var loginViewModel = new LoginResponseModel
                {
                    Id = account.Id,
                    Email = account.Email,
                    RoleId = account.RoleId,
                    Avatar = account.Avatar,
                    Fullname = account.Fullname,
                    Status = account.Status,
                    JwtToken = null,
                };
                var values = loginViewModel;
                return loginViewModel;
            }
            return null;
        }

        /// <summary>
        /// Hàm Xử lí lấy tài khoản và mật khẩu dưới db
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        /// <exception cref="BaseException"></exception>
        public async Task<(LoginResponseModel responseModel, string password)> VerifyUser(LoginRequestModel loginRequest)
        {
            // Query account table in DB

            var checkUser = _accountRepository.GetFirstOrDefault(filter: x => x.Email == loginRequest.Email);
            if (checkUser == null)
            {
                throw new NotFoundException(BaseError.USER_NOT_FOUND.ToString());
            }

            bool verify = this.VerifyPassword(loginRequest.Password, checkUser.Password);
            if (!verify)
            {
                throw new InvalidPasswordException();
            }

            var viewLoginModel = new LoginResponseModel
            {
                Id = checkUser.Id,
                Email = checkUser.Email,
                RoleId = checkUser.RoleId,
                Status = checkUser.Status,
                Fullname = checkUser.Fullname,
                Avatar = checkUser.Avatar,
                JwtToken = null
            };
            return (viewLoginModel, checkUser.Password);
        }

        private string HashPasword(string password)
        {
            var salt = _birdStoreConst.GetSalt();
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return Convert.ToHexString(hash);
        }

        private bool VerifyPassword(string password, string hash)
        {

            var salt = _birdStoreConst.GetSalt();
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(
                    Encoding.UTF8.GetBytes(password),
                    salt,
                    iterations,
                    hashAlgorithm,
                    keySize);

            return hashToCompare.SequenceEqual(Convert.FromHexString(hash));
        }

        /// <summary>
        /// Tham số truyền vào là 1 tuple với key - value như sau:
        ///     - viewLoginModel: LoginResponseModel
        ///     - Password: string
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        //create token
        private async Task<string> CreateToken((LoginResponseModel responseModel, string password) entity)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, entity.responseModel.RoleId.ToString()),
                new Claim(ClaimTypes.Name, entity.responseModel.Fullname),
                new Claim(ClaimTypes.Email, entity.responseModel.Email),
                new Claim(ClaimTypes.NameIdentifier, entity.responseModel.Id.ToString())
            };

            FirebaseAuthLink authLink = await _firebaseAuthProvider.SignInWithEmailAndPasswordAsync(entity.responseModel.Email, entity.password);
            return authLink.FirebaseToken;
        }
        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_birdStoreConst.GetTokenKey()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                 claims: claims,
                 expires: DateTime.Now.AddDays(1),
                 signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }

        /// <summary>
        /// Hàm này trigger từ controller của Dũng
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        public async Task<LoginResponseModel> Login(LoginRequestModel loginRequest)
        {
            ( var userViewModel, var password ) = await VerifyUser(loginRequest);
            var accessToken = await CreateToken((userViewModel, password));
            // var refreshToken = GenerateRefreshToken();

            userViewModel.JwtToken = accessToken;
            return userViewModel;
        }

        /// <summary>
        /// Hàm này trigger từ controller của Huy Phùng
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        public async Task<LoginResponseModel> Login2(LoginRequestModel loginRequest)
        {
            (var userViewModel, var password) = await VerifyUser(loginRequest);
            var accessToken = await CreateToken((userViewModel, password));
            // var refreshToken = GenerateRefreshToken();

            userViewModel.JwtToken = accessToken;
            return userViewModel;
        }

        public async Task<LoginResponseModel> LoginGoogle(string tokenId)
        {
            var userViewModel = await this.VerifyFirebaseTokenIdRegister(tokenId);
            if (userViewModel != null)
            {
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, userViewModel.RoleId.ToString()),
                //new Claim(ClaimTypes.Name, userViewModel.Fullname),
                new Claim(ClaimTypes.Email, userViewModel.Email)
            };

                var accessToken = GenerateAccessToken(claims);
                // var refreshToken = GenerateRefreshToken();

                userViewModel.JwtToken = accessToken;
            }
            return userViewModel;
        }
    }
}