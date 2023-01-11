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
using Google.Apis.Auth.OAuth2;
using Backend.Service.Repositories;
using Backend.Service.Entities;
using LOSMST.Models.Helper.Login;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace LOSMST.Business.Service
{
    public class AuthService
    {
        private readonly IUserRepository _accountRepository;
        private readonly IConfiguration _configuration;
        private readonly FirebaseApp _firebaseApp;

        public AuthService(IConfiguration configuration, IUserRepository accountRepository, FirebaseApp firebase)
        {
            _configuration = configuration;
            _accountRepository = accountRepository;
            _firebaseApp = firebase;
        }

        public async Task<LoginResponseModel> VerifyFirebaseTokenIdRegister(string idToken)
        {
            FirebaseToken decodedToken;
            try
            {
                decodedToken = await FirebaseAuth.GetAuth(_firebaseApp)
                       .VerifyIdTokenAsync(idToken);
            }
            catch
            {
                throw new Exception();
            }
            string uid = decodedToken.Uid;
            var firebaseUser = await FirebaseAuth.GetAuth(_firebaseApp).GetUserAsync(uid);
            //Hash default password for new user
            byte[] salt = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
            Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: "123456"!,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));
            var account = _accountRepository.GetFirstOrDefault(x => x.Email == firebaseUser.Email);
            if (account == null)
            {
                User userInfo = new User();
                userInfo.Email = firebaseUser.Email;
                userInfo.Password = hashed;
                userInfo.RoleId = 3;
                userInfo.Status = true;
                userInfo.Phone = String.Empty;
                userInfo.Fullname = String.Empty;

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
                    Phone = account.Phone,
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

        //public async Task<ViewModelLogin?> VerifyUser(LoginEmailPassword loginRequest)
        //{
        //    // Query account table in DB

        //    var checkUser = _accountRepository.GetFirstOrDefault(filter: x => x.Email == loginRequest.Email && x.Password == loginRequest.Password, includeProperties: "Store");
        //    if (checkUser != null)
        //    {
        //        if (checkUser.Store != null)
        //        {
        //            if (checkUser != null)
        //            {
        //                var viewLoginModel = new ViewModelLogin
        //                {
        //                    Id = checkUser.Id,
        //                    Email = checkUser.Email,
        //                    RoleId = checkUser.RoleId,
        //                    StatusId = checkUser.StatusId,
        //                    Fullname = checkUser.Fullname,
        //                    StoreId = checkUser.StoreId,
        //                    StoreName = checkUser.Store.Name,
        //                    Avatar = checkUser.Avatar,
        //                    JwtToken = null
        //                };
        //                return viewLoginModel;
        //            }
        //        }
        //        else
        //        {

        //            var viewLoginModel = new ViewModelLogin
        //            {
        //                Id = checkUser.Id,
        //                Email = checkUser.Email,
        //                RoleId = checkUser.RoleId,
        //                StatusId = checkUser.StatusId,
        //                Fullname = checkUser.Fullname,
        //                Avatar = checkUser.Avatar,
        //                JwtToken = null
        //            };
        //            return viewLoginModel;

        //        }
        //    }

        //    return null;
        //}

        //create token
        //private string CreateToken(ViewModelLogin user)
        //{
        //    List<Claim> claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Role, user.RoleId),
        //        new Claim(ClaimTypes.Name, user.Fullname),
        //        new Claim(ClaimTypes.Email, user.Email)
        //    };

        //    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
        //        _configuration.GetSection("AppSettings:Token").Value));

        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //    var token = new JwtSecurityToken(
        //        claims: claims,
        //        expires: DateTime.Now.AddDays(1),
        //        signingCredentials: creds);

        //    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        //    return jwt;
        //}
        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = new JwtSecurityToken(
                 claims: claims,
                 expires: DateTime.Now.AddDays(1),
                 signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }

        //public async Task<ViewModelLogin> Login(LoginEmailPassword loginRequest)
        //{
        //    var valueBytes = Encoding.UTF8.GetBytes(loginRequest.Password);
        //    loginRequest.Password = Convert.ToBase64String(valueBytes);
        //    var userViewModel = await VerifyUser(loginRequest);
        //    if (userViewModel != null)
        //    {
        //        var accessToken = CreateToken(userViewModel);
        //        // var refreshToken = GenerateRefreshToken();

        //        userViewModel.JwtToken = accessToken;
        //        return userViewModel;
        //    }
        //    return null;
        //}



        public async Task<LoginResponseModel> LoginGoogle(string tokenId)
        {
            var userViewModel = await VerifyFirebaseTokenIdRegister(tokenId);
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