using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Abstractions;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.Wgn.Accounts;

namespace WotDashLab.Services.Wgn
{
    internal class WgnAccountsService : IWgnAccountsService
    {
        private readonly IWgRequestBuilderFactory _requestBuilderFactory;
        private readonly IWgClientBase _wgClient;
        private readonly IUserContext _userContext;
        private const ApiType ApiType = Wot.Client.Contracts.ApiType.Wgn;

        public WgnAccountsService(IWgRequestBuilderFactory requestBuilderFactory, IWgClientBase wgClient, IUserContext userContext)
        {
            _requestBuilderFactory = requestBuilderFactory ?? throw new ArgumentNullException(nameof(requestBuilderFactory));
            _wgClient = wgClient ?? throw new ArgumentNullException(nameof(wgClient));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<ICollection<WgnAccountSearchResult>> Search(WgnAccountSearchRequest model, CancellationToken token)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var request = _requestBuilderFactory.CreateRequestBuilder();
            request.Language = string.IsNullOrWhiteSpace(model.Language) ? "ru" : model.Language;
            request.Add("search", model.Search);
            
            if (model.Fields is not null && model.Fields.Length > 0)
            {
                request.Fields = string.Join(",", model.Fields);
            }
            
            if (model.Limit != default && model.Limit > 0)
            {
                request.Add(WellKnownFieldNames.Limit, model.Limit.ToString());
            }

            if (model.Game is not null && model.Game.Length > 0)
            {
                request.Add("game", string.Join(",", model.Game));
            }

            var payload = request.Build();
            const string url = "account/list";
            var result = await _wgClient.PostAsync<ICollection<WgnAccountSearchResult>>(ApiType, model.Region, url, payload, token);

            if (result.Status == "ok")
            {
                return result.Data;
            }

            return null;
        }
    }
}