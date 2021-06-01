using Microsoft.Extensions.DependencyInjection;

namespace WotDashLab.WebApi.Infrastructure.Authentication
{
    public static class AuthenticationServiceProviderExtensions
    {
        public static IServiceCollection AddWotAuthentication(this IServiceCollection services)
        {
            services
                .AddAuthentication(options =>
                {
                    options.DefaultScheme = AuthenticationDefaults.DefaultSchema;
                    options.DefaultAuthenticateScheme = AuthenticationDefaults.DefaultSchema;
                })
                .AddScheme<WotAuthenticationOptions, WotAuthenticationHandler>(
                    AuthenticationDefaults.DefaultSchema,
                    AuthenticationDefaults.DefaultSchema,
                    options =>
                    {
                        options.Schema = AuthenticationDefaults.DefaultSchema;
                    });
            return services;
        }
    }
}