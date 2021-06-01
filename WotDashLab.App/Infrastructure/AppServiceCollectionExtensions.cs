using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WotDashLab.WebApi.Infrastructure.Options;

namespace WotDashLab.WebApi.Infrastructure
{
    public static class AppServiceCollectionExtensions
    {
        public static IServiceCollection AddCorsPolicy(this IServiceCollection services, IConfiguration configuration, string policyName)
        {
            var corsSection = configuration.GetSection("Cors");
            var corsOptions = corsSection.Get<CorsConfigurationOptions>();

            services.AddCors(opt =>
            {
                opt.AddPolicy(policyName, cfg =>
                {
                    cfg.AllowAnyMethod();
                    cfg.AllowAnyHeader();
                    cfg.WithOrigins(corsOptions.Origins);
                });
            });
            return services;
        }
    }
}
