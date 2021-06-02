using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using WotDashLab.Abstractions;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.WorldOfTanks.Tanks;

namespace WotDashLab.Services.Tanks
{
    internal class TanksService : ITanksService
    {
        private const string Url = "encyclopedia/vehicles";
        private const ApiType ApiType = Wot.Client.Contracts.ApiType.Wot;
        
        private readonly string[] _defaultFields = new []
        {
            "tank_id",
            "name",
            "short_name",
            "tag",
            "is_premium",
            "is_gift",
            "is_wheeled",
            "images",
            "nation",
            "tier",
            "type",
            "description",
            "price_gold",
            "price_credit",
            "prices_xp"
        };
        
        private readonly IWgRequestBuilderFactory _requestBuilderFactory;
        private readonly IUserContext _userContext;
        private readonly IWgClientBase _wgClient;

        public TanksService(IWgRequestBuilderFactory requestBuilderFactory, IUserContext userContext, IWgClientBase wgClient)
        {
            _requestBuilderFactory = requestBuilderFactory ?? throw new ArgumentNullException(nameof(requestBuilderFactory));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _wgClient = wgClient ?? throw new ArgumentNullException(nameof(wgClient));
        }

        public async Task<ICollection<TankInfoModel>> GetInfosAsync(TanksRequest request, CancellationToken token)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var requestBuilder = _requestBuilderFactory.CreateRequestBuilder(_userContext);
            requestBuilder.Language = string.IsNullOrWhiteSpace(request.Language) ? "ru" : request.Language;
            requestBuilder.Fields = string.Join(",", (request.Fields?.Any() ?? false) ? request.Fields : _defaultFields);
            requestBuilder.Add("tank_id", string.Join(",", request.TankIds));

            var payload = requestBuilder.Build();
            var result = await _wgClient.PostAsync<IDictionary<int, ShortTankInfo>>(ApiType, request.Region, Url, payload, token);
            if (result.Status == "ok")
            {
                var response = result.Data.Keys
                    .Select(key => result.Data[key])
                    .Where(tank => tank is not null);
                return response.Adapt<ICollection<TankInfoModel>>();
            }

            return null;
        }
    }
}