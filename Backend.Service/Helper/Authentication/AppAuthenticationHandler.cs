using System.Security.Claims;
using System.Text.Encodings.Web;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

namespace Backend.Service.Helper.Authentication
{
    // This is a middleware
    public class AppAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly FirebaseApp _firebaseApp;

        public AppAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options, 
            ILoggerFactory logger, 
            UrlEncoder encoder, 
            ISystemClock clock,
            FirebaseApp firebaseApp) 
            : base(options, logger, encoder, clock)
        {
            _firebaseApp = firebaseApp;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            Logger.LogInformation("Authenticating incoming request...");
            if (!Context.Request.Headers.ContainsKey("Authorization"))
                return AuthenticateResult.NoResult();

            string bearerToken = Context.Request.Headers["Authorization"];
            //Logger.LogInformation($"Bearer Token: {bearerToken}");

            if (bearerToken == null || !bearerToken.StartsWith("Bearer "))
            {
                return AuthenticateResult.Fail("Invalid Scheme");
            }

            string token = bearerToken.Substring("Bearer ".Length);

            try
            {
                FirebaseToken firebaseToken = await FirebaseAuth.GetAuth(_firebaseApp).VerifyIdTokenAsync(token);

                return AuthenticateResult.Success(
                    new AuthenticationTicket(new ClaimsPrincipal(new List<ClaimsIdentity>()
                    {
                        new ClaimsIdentity(ToClaims(firebaseToken.Claims), nameof(AppAuthenticationHandler)),
                    }), JwtBearerDefaults.AuthenticationScheme));
            } catch (Exception ex)
            {
                return AuthenticateResult.Fail(ex.Message);
            }
        }

        private IEnumerable<Claim> ToClaims(IReadOnlyDictionary<string, object> claims)
        {
            // Trong claims sẽ chứa những key sau:
            /*
             * user_id (string): Id của user
             * name (string): tên người dùng
             * email (string):
             * email_verified (boolean)
             * auth_time (long)
             * firebase: một cái dict chứa nhiều thông tin khác, debug để biết thêm chi tiết
             */
            return new List<Claim>
            {
                new Claim("id", claims["user_id"].ToString()),
                new Claim("name", claims["name"].ToString()),
                new Claim("email", claims["email"].ToString()),

            };
        }
    }
}
