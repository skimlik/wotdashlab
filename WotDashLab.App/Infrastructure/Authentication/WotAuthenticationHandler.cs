using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace WotDashLab.WebApi.Infrastructure.Authentication
{
    public class WotAuthenticationHandler : AuthenticationHandler<WotAuthenticationOptions>
    {
        public WotAuthenticationHandler(
            IOptionsMonitor<WotAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (Request.Headers.TryGetValue(AuthenticationDefaults.AccessTokenHeaderName, out var accessToken))
            {
                try
                {
                    var token = accessToken.FirstOrDefault();
                    if (string.IsNullOrWhiteSpace(token))
                    {
                        return NoResultAsync();
                    }

                    Logger.LogInformation("Authentication token found, trying to authenticate.");
                    IIdentity identity = new ClaimsIdentity(AuthenticationDefaults.DefaultSchema);
                    var claims = new List<Claim>
                    {
                        new (ClaimTypes.Hash, token),
                        new (ClaimTypes.Role, "Account"),
                    };

                    string name = token;
                    if (Request.Headers.TryGetValue(AuthenticationDefaults.UserNameHeaderName, out var username))
                    {
                        var value = username.FirstOrDefault();
                        if (!string.IsNullOrWhiteSpace(value))
                        {
                            name = value;
                        }
                    }
                    claims.Add(new Claim(ClaimTypes.Name, name));

                    if (Request.Headers.TryGetValue(AuthenticationDefaults.ExpiresOnHeaderName, out var expiresOn))
                    {
                        if (!int.TryParse(expiresOn.FirstOrDefault() ?? "", out var expires))
                        {
                            claims.Add(new Claim(ClaimTypes.Expiration, expires.ToString()));
                        }
                    }

                    var claimsIdentity = new ClaimsIdentity(
                        identity,
                        claims,
                        AuthenticationDefaults.DefaultSchema,
                        ClaimTypes.Name,
                        ClaimTypes.Role
                    );

                    var principal = new ClaimsPrincipal(new[] { claimsIdentity });
                    var ticket = new AuthenticationTicket(principal, AuthenticationDefaults.DefaultSchema);

                    Logger.LogInformation("Authentication successful");
                    return Task.FromResult(AuthenticateResult.Success(ticket));
                }
                catch (Exception e)
                {
                    Logger.LogError("Authentication failed", e);
                    return Task.FromResult(AuthenticateResult.Fail("Failed to authenticate"));
                }
            }

            return NoResultAsync();
        }

        private Task<AuthenticateResult> NoResultAsync()
        {
            Logger.LogInformation("No access token found, processing anonymous request.");
            return Task.FromResult(AuthenticateResult.NoResult());
        }
    }
}