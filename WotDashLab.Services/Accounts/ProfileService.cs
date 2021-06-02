using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using WotDashLab.Abstractions;
using WotDashLab.Services.Tanks;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts;

namespace WotDashLab.Services.Accounts
{
    internal class ProfileService : IProfileService
    {
        private const string Url = "account/info";
        private const ApiType ApiType = Wot.Client.Contracts.ApiType.Wot;
        private readonly ITanksService _tanksService;
        private readonly IWgRequestBuilderFactory _requestBuilderFactory;
        private readonly IWgClientBase _wgClient;
        private readonly IUserContext _userContext;

        public ProfileService(
            ITanksService tanksService,
            IWgRequestBuilderFactory requestBuilderFactory,
            IWgClientBase wgClient,
            IUserContext userContext)
        {
            _tanksService = tanksService ?? throw new ArgumentNullException(nameof(tanksService));
            _requestBuilderFactory = requestBuilderFactory ?? throw new ArgumentNullException(nameof(requestBuilderFactory));
            _wgClient = wgClient ?? throw new ArgumentNullException(nameof(wgClient));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<AccountProfileModel> GetAccountProfileAsync(ProfileRequest model, CancellationToken token)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var profileRequest = CreateProfileRequest(model);

            var result = await _wgClient.PostAsync<IDictionary<int, AccountProfile>>(ApiType, model.Region, Url, profileRequest, token);
            if (result.Status == "ok" && result.Data.TryGetValue(model.AccountId, out var response))
            {
                var profile = response.Adapt<AccountProfileModel>();
                
                var tankIds = ResolveTankIds(response);
                var tankInfos = await _tanksService.GetInfosAsync(new TanksRequest
                {
                    TankIds = tankIds,
                    Language = model.Language,
                    Region = model.Region
                }, token);

                profile.TankInfos = tankInfos.ToDictionary(key => key.Id);
                return profile;
            }

            return null;
        }

        private static ICollection<int> ResolveTankIds(AccountProfile response)
        {
            var tankIds = new List<int>();
            var stats = response?.Statistics;
            if (stats is null)
            {
                return tankIds;
            }
            
            AppendTankIdsFromStatistics(stats.All, tankIds);
            AppendTankIdsFromStatistics(stats.Clan, tankIds);
            AppendTankIdsFromStatistics(stats.Company, tankIds);
            AppendTankIdsFromStatistics(stats.Historical, tankIds);
            AppendTankIdsFromStatistics(stats.Team, tankIds);
            AppendTankIdsFromStatistics(stats.RegularTeam, tankIds);
            AppendTankIdsFromStatistics(stats.StrongholdDefense, tankIds);
            AppendTankIdsFromStatistics(stats.StrongholdSkirmish, tankIds);

            return new HashSet<int>(tankIds);
        }

        private static void AppendTankIdsFromStatistics(AccountStatistics stats, ICollection<int> tankIds)
        {
            if (stats is null)
            {
                return;
            }
            
            if (stats?.MaxXpTankId.HasValue ?? false)
            {
                tankIds.Add(stats.MaxXpTankId.Value);
            }

            if (stats?.MaxFragsTankId.HasValue ?? false)
            {
                tankIds.Add(stats.MaxFragsTankId.Value);
            }

            if (stats?.MaxDamageTankId.HasValue ?? false)
            {
                tankIds.Add(stats.MaxDamageTankId.Value);
            }
        }

        private IDictionary<string, string> CreateProfileRequest(ProfileRequest model)
        {
            var profileRequest = _requestBuilderFactory.CreateRequestBuilder(_userContext);

            profileRequest.Language = string.IsNullOrWhiteSpace(model.Language) ? "ru" : model.Language;
            profileRequest.Fields = string.Join(",", model.Fields ?? Array.Empty<string>());
            profileRequest.Add(WellKnownFieldNames.AccountId, model.AccountId.ToString());

            var extras = string.Join(",", model.Extras ?? Array.Empty<string>());
            profileRequest.Add(WellKnownFieldNames.Extras, extras);

            return profileRequest.Build();
        }
    }
}