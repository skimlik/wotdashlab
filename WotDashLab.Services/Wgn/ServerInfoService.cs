using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.Wgn.Servers;

namespace WotDashLab.Services.Wgn
{
    internal class ServerInfoService : IServerInfoService
    {
        private readonly IWgRequestBuilderFactory _wgRequestBuilderFactory;
        private readonly IWgClientBase _wgClient;

        private const ApiType ApiType = Wot.Client.Contracts.ApiType.Wgn;

        public ServerInfoService(IWgRequestBuilderFactory wgRequestBuilderFactory, IWgClientBase wgClient)
        {
            _wgRequestBuilderFactory = wgRequestBuilderFactory;
            _wgClient = wgClient;
        }

        public async Task<IDictionary<string, WgnServerInfo[]>> GetServerInfoAsync(WgnServerInfoRequest model, string region, CancellationToken token)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var requestBuilder = _wgRequestBuilderFactory.CreateRequestBuilder();
            requestBuilder.Fields = string.Join(",", model.Fields ?? Array.Empty<string>());
            requestBuilder.Add("game", string.Join(",", model.Games ?? Array.Empty<string>()));

            if (!string.IsNullOrWhiteSpace(model.Language))
            {
                requestBuilder.Language = model.Language;
            }

            var payload = requestBuilder.Build();

            const string url = "servers/info";
            var result = await _wgClient.FetchData<IDictionary<string, WgnServerInfo[]>>(ApiType, region, url, payload, token);
            if (result.IsOk)
            {
                IDictionary<string, WgnServerInfo[]> data = result.Data;
                IDictionary<string, WgnServerInfo[]> sorted = new Dictionary<string, WgnServerInfo[]>();
                foreach (string key in data.Keys)
                {
                    var servers = data[key].OrderByDescending(k => k.PlayersOnline).ThenBy(k => k.Server);
                    sorted[key] = servers.ToArray();
                }
                return sorted;
            }

            return null;
        }
    }
}