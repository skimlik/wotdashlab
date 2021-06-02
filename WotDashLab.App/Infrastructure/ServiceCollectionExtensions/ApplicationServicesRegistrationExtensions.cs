using Microsoft.Extensions.DependencyInjection;
using WotDashLab.Services.Accounts;
using WotDashLab.Services.Tanks;

namespace WotDashLab.WebApi.Infrastructure.ServiceCollectionExtensions
{
    internal static class ApplicationServicesRegistrationExtensions
    {
        public static IServiceCollection RegisterAppServices(this IServiceCollection services)
        {
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<ITanksService, TanksService>();
            return services;
        }
    }
}