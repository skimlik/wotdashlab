using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.Exceptions;
using WotDashLab.Wot.Client.Contracts.WorldOfTanks;

namespace WotDashLab.Wot.Client
{
    internal class WgClientBase : IWgClientBase
    {
        private readonly IEndpointResolver _endpointResolver;
        private readonly HttpClient _client;

        public WgClientBase(
            IHttpClientFactory httpClientFactory,
            IEndpointResolver endpointResolver)
        {
            _endpointResolver = endpointResolver;
            _client = httpClientFactory.CreateClient();
        }

        public async Task<WotResponseBase<T>> PostAsync<T>(
            ApiType apiType,
            string region,
            string path,
            IDictionary<string, string> body,
            CancellationToken token)
        {
            string endpoint = _endpointResolver.Resolve(apiType, region);
            string url = CombineUrl(endpoint, path);
            var content = new FormUrlEncodedContent(body);

            HttpResponseMessage postAsync = await _client.PostAsync(url, content, token);
            postAsync.EnsureSuccessStatusCode();

            var result = await postAsync.ReadAsAsync<WotResponseBase<T>>(token);
            if (result is not null && result.Status.Equals("error"))
            {
                throw new WgErrorException(result.Error.Code, result.Error.Message, result.Error.Field, result.Error.Value);
            }
            return result;
        }

        private string CombineUrl(string baseUrl, string path)
        {
            return $"{baseUrl}/{path}/";
        }
    }
}