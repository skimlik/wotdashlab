using System.Net.Http.Headers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using WotDashLab.Abstractions;
using WotDashLab.Services;
using WotDashLab.WebApi.Infrastructure;
using WotDashLab.WebApi.Infrastructure.Authentication;
using WotDashLab.WebApi.Infrastructure.Diagnostics;
using WotDashLab.WebApi.Infrastructure.Options;
using WotDashLab.Wot.Client;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.WorldOfTanks;

namespace WotDashLab.WebApi
{
    public class Startup
    {
        private const string CorsPolicyName = "FromCorsConfiguration";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddHealthChecks();

            var wotOptionsSection = Configuration.GetSection("Wot");
            services.Configure<WotOptions>(wotOptionsSection);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddWotAuthentication();
            services.AddHttpContextAccessor();
            services.AddTransient<IUserContext, UserContext>();

            services.AddCorsPolicy(Configuration, CorsPolicyName);

            services.AddSingleton<IEndpointResolver, RemoteEndpointResolver>();
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
            services.AddTransient<IWgClientBase, WgClientBase>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseMiddleware<ExceptionLoggerMiddleware>();
            app.UseHealthChecks(new PathString("/hc"));
            app.UseRouting();

            app.UseAuthentication();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseCors(CorsPolicyName);

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                // if (env.IsDevelopment())
                // {
                //     spa.UseAngularCliServer(npmScript: "start");
                // }
            });
        }
    }
}
