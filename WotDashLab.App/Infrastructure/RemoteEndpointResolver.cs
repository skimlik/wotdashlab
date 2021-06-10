using System;
using System.Globalization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using WotDashLab.WebApi.Infrastructure.Options;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.WorldOfTanks;

namespace WotDashLab.WebApi.Infrastructure
{
    public class RemoteEndpointResolver : IEndpointResolver
    {
        private readonly WotOptions _wotOptions;
        private readonly ILogger<RemoteEndpointResolver> _logger;

        public RemoteEndpointResolver(IOptions<WotOptions> wotOptions, ILoggerFactory _loggerFactory)
        {
            _wotOptions = wotOptions.Value;
            _logger = _loggerFactory.CreateLogger<RemoteEndpointResolver>();
        }

        public string Resolve(ApiType apiType, string region)
        {
            var apiName = Enum.GetName(apiType);
            if (_wotOptions.Api.TryGetValue(apiName, out var apiDescription))
            {
                var regionName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(region);
                if (apiDescription.Servers.TryGetValue(regionName, out string baseUrl))
                {
                    _logger.LogDebug($"Resolved base address from region and api type: BaseUrl={baseUrl}");
                    return $"{baseUrl.TrimEnd('/')}/{apiDescription.Path.Trim('/')}";
                }
                throw new ArgumentException($"Cannot find configuration for api [{apiType}] and region [{regionName}]", nameof(apiType));
            }

            throw new ArgumentException($"Cannot find configuration for api [{apiType}]", nameof(apiType));
        }
    }
}