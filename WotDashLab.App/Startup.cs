using System;
using System.IO;
using System.Reflection;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using WotDashLab.Abstractions;
using WotDashLab.Services;
using WotDashLab.WebApi.Infrastructure;
using WotDashLab.WebApi.Infrastructure.Authentication;
using WotDashLab.WebApi.Infrastructure.Diagnostics;
using WotDashLab.WebApi.Infrastructure.Options;
using WotDashLab.WebApi.Infrastructure.ServiceCollectionExtensions;
using WotDashLab.Wot.Client.Contracts;

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
            services.AddMvcCore().AddFluentValidation(setup =>
            {
                setup.RegisterValidatorsFromAssemblyContaining(typeof(Startup));
            });

            var wotOptionsSection = Configuration.GetSection("Wot");
            services.Configure<WotOptions>(wotOptionsSection);

            services.AddWotAuthentication();
            services.AddHttpContextAccessor();
            services.AddTransient<IUserContext, UserContext>();

            services.AddCorsPolicy(Configuration, CorsPolicyName);

            services.AddSingleton<IEndpointResolver, RemoteEndpointResolver>();
            services.RegisterWgClient();

            services.RegisterAppServices();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "WOT Dashboards Backend"
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
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

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Wot Dashboards Backend");
            });
            app.UseAuthentication();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
            app.UseCors(CorsPolicyName);
        }
    }
}
