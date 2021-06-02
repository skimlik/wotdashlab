using System.Net.Http.Headers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using WotDashLab.WebApi.Infrastructure.Options;
using WotDashLab.Wot.Client;
using WotDashLab.Wot.Client.Contracts;

namespace WotDashLab.WebApi.Infrastructure.ServiceCollectionExtensions
{
    internal static class WgClientRegistrationExtensions
    {
        public static IServiceCollection RegisterWgClient(this IServiceCollection services)
        {
            services.AddHttpClient("wot", cfg =>
            {
                cfg.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            });
            
            services.AddTransient<IWgRequestBuilder>(serviceProvider =>
            {
                var options = serviceProvider.GetRequiredService<IOptions<WotOptions>>();
                var applicationId = options.Value.ApplicationId;
                return new WgRequestBuilder(applicationId);
            });

            services.AddScoped<IWgRequestBuilderFactory>(serviceProvider =>
            {
                var options = serviceProvider.GetRequiredService<IOptions<WotOptions>>();
                var applicationId = options.Value.ApplicationId;
                return new WgRequestBuilderFactory(applicationId);
            });
            
            services.AddScoped<IWgClientBase, WgClientBase>();
            
            return services;
        }
    }
}