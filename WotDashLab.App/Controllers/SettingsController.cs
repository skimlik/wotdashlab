using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WotDashLab.WebApi.Contracts.Settings;
using WotDashLab.WebApi.Infrastructure.Options;

namespace WotDashLab.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IOptions<WotOptions> _wotOptions;

        public SettingsController(IOptions<WotOptions> wotOptions)
        {
            _wotOptions = wotOptions;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var opts = _wotOptions.Value;
            var applicationSettings = new ApplicationSettingsModel
            {
                ApplicationId = opts.ApplicationId,
                DefaultApi = new DefaultWotAppModel
                {
                    Api = opts.DefaultApi,
                    Region = opts.DefaultRegion
                },
                ApiTypes = opts.Api.Keys.Select(apiKey =>
                    {
                        var api = opts.Api[apiKey];
                        return new
                        {
                            Key = apiKey,
                            Region = new WotApplicationRegionsModel
                            {
                                Name = api?.Name,
                                Regions = api.Servers.Keys.ToArray()
                            }
                        };
                    })
                    .GroupBy(k => k.Key, v => v.Region, StringComparer.OrdinalIgnoreCase)
                    .ToDictionary(k => k.Key, v => v.LastOrDefault()),
                Redirects = opts.Api[opts.DefaultApi].Servers
            };

            return Ok(applicationSettings);
        }
    }
}