using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.Exceptions;

namespace WotDashLab.Wot.Client
{
    internal class WgClientBase : IWgClientBase
    {
        private readonly IEndpointResolver _endpointResolver;
        private readonly HttpClient _client;
        private readonly ILogger<WgClientBase> _logger;

        public WgClientBase(
            ILoggerFactory loggerFactory,
            IHttpClientFactory httpClientFactory,
            IEndpointResolver endpointResolver)
        {
            if (loggerFactory == null)
            {
                throw new ArgumentNullException(nameof(loggerFactory));
            }

            if (httpClientFactory == null)
            {
                throw new ArgumentNullException(nameof(httpClientFactory));
            }

            _logger = loggerFactory.CreateLogger<WgClientBase>();
            _endpointResolver = endpointResolver ?? throw new ArgumentNullException(nameof(endpointResolver));
            _client = httpClientFactory.CreateClient();
        }

        public Task<WotResponseBase<TData, WotResponseMetadata>> FetchData<TData>(
            ApiType apiType,
            string region,
            string path,
            IDictionary<string, string> body,
            CancellationToken token)
        {
            return FetchData<TData, WotResponseMetadata>(apiType, region, path, body, token);
        }

        public async Task<WotResponseBase<TData, TMetadata>> FetchData<TData, TMetadata>(
            ApiType apiType,
            string region,
            string path,
            IDictionary<string, string> body,
            CancellationToken token) where TMetadata : class, IWotResponseMetadata
        {
            string endpoint = _endpointResolver.Resolve(apiType, region);
            string url = CombineUrl(endpoint, path);
            var content = new FormUrlEncodedContent(body);

            HttpResponseMessage postAsync = await _client.PostAsync(url, content, token);
            postAsync.EnsureSuccessStatusCode();

            try
            {
                var result = await postAsync.ReadAsAsync<TData, TMetadata>(token);

                if (result is not null && result.Status.Equals("error"))
                {
                    throw new WgErrorException(result.Error.Code, result.Error.Message, result.Error.Field, result.Error.Value);
                }
                return result;
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Error sending request to WarGaming api");
                throw;
            }
        }

        private string CombineUrl(string baseUrl, string path)
        {
            return $"{baseUrl}/{path}/";
        }
    }
}