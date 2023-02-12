using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
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

namespace Backend.Service.Services
{
    public class AuthService
    {
        private readonly IUserRepository _accountRepository;
        private readonly IConfiguration _configuration;
        private readonly FirebaseApp _firebaseApp;
        private const int keySize = 64;
        private const int iterations = 350000;
        private HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        private BirdStoreConst _birdStoreConst;

        public AuthService(IConfiguration configuration, IUserRepository accountRepository, FirebaseApp firebase, BirdStoreConst birdStoreConst)
        {
            _configuration = configuration;
            _accountRepository = accountRepository;
            _firebaseApp = firebase;
            _birdStoreConst = birdStoreConst;
        }

        private async Task<LoginResponseModel> VerifyFirebaseTokenIdRegister(string idToken)
        {
            FirebaseToken decodedToken;
            try
            {
                decodedToken = await FirebaseAuth.GetAuth(_firebaseApp)
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
            var firebaseUser = await FirebaseAuth.GetAuth(_firebaseApp).GetUserAsync(uid);
            var password = this.HashPasword("123456");
            var account = _accountRepository.GetFirstOrDefault(x => x.Email == firebaseUser.Email);
            if (account == null)
            {
                User userInfo = new User();
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

        public async Task<LoginResponseModel> VerifyUser(LoginRequestModel loginRequest)
        {
            // Query account table in DB

            var checkUser = _accountRepository.GetFirstOrDefault(filter: x => x.Email == loginRequest.Email);
            if (checkUser == null)
            {
                throw new BaseException
                {
                    StatusCode = (int)BaseError.USER_NOT_FOUND,
                    ErrorMessage = EnumStringMessage.ToDescriptionString(BaseError.USER_NOT_FOUND),
                    HttpStatus = HttpStatusCode.InternalServerError
                };
            }
            bool verify = this.VerifyPassword(loginRequest.Password, checkUser.Password);
            if (!verify)
            {
                throw new BaseException
                {
                    StatusCode = (int)BaseError.INVALID_PASSWORD,
                    ErrorMessage = EnumStringMessage.ToDescriptionString(BaseError.INVALID_PASSWORD),
                    HttpStatus = HttpStatusCode.InternalServerError
                };
            }
            if (verify)
            {
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
                return viewLoginModel;
            }
            return null;
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

        //create token
        private string CreateToken(LoginResponseModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
                new Claim(ClaimTypes.Name, user.Fullname),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _birdStoreConst.GetTokenKey()));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_birdStoreConst.GetTokenKey()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = new JwtSecurityToken(
                 claims: claims,
                 expires: DateTime.Now.AddDays(1),
                 signingCredentials: creds);
            token.Header.Add("kid", "cf334832f096d3ed8b7b4a654447c2816ffe3273");
            token.Payload.Remove("iss");
            token.Payload.Add("iss", "your issuer");
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }

        public async Task<LoginResponseModel> Login(LoginRequestModel loginRequest)
        {
            var userViewModel = await VerifyUser(loginRequest);
            if (userViewModel != null)
            {
                var accessToken = CreateToken(userViewModel);
                // var refreshToken = GenerateRefreshToken();

                userViewModel.JwtToken = accessToken;
                return userViewModel;
            }
            return null;
        }



        public async Task<LoginResponseModel> LoginGoogle(string tokenId)
        {
            var userViewModel = await this.VerifyFirebaseTokenIdRegister(tokenId);
            if (userViewModel != null)
            {
                var claims = new List<Claim>
            {
                new Claim("Role", userViewModel.RoleId.ToString()),
                //new Claim(ClaimTypes.Name, userViewModel.Fullname),
                new Claim("Email", userViewModel.Email)
            };

                var accessToken = GenerateAccessToken(claims);
                // var refreshToken = GenerateRefreshToken();

                userViewModel.JwtToken = accessToken;
            }
            return userViewModel;
        }
    }
}