using Microsoft.AspNetCore.Authentication;

namespace WotDashLab.WebApi.Infrastructure.Authentication
{
    public class WotAuthenticationOptions : AuthenticationSchemeOptions
    {
        public string Schema { get; set; } = AuthenticationDefaults.DefaultSchema;
    }
}