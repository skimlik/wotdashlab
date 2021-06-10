using Microsoft.Extensions.DependencyInjection;
using WotDashLab.Services.Wgn;
using WotDashLab.Services.Wgn.Tv;
using WotDashLab.Services.WorldOfTanks.Accounts;
using WotDashLab.Services.WorldOfTanks.Tanks;

namespace WotDashLab.WebApi.Infrastructure.ServiceCollectionExtensions
{
    internal static class ApplicationServicesRegistrationExtensions
    {
        public static IServiceCollection RegisterAppServices(this IServiceCollection services)
        {
            // wot
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<ITanksService, TanksService>();
            
            // wgn
            services.AddScoped<IWgnAccountsService, WgnAccountsService>();
            services.AddScoped<IVideoService, VideoService>();
            return services;
        }
    }
}