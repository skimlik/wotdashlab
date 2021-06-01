using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using WotDashLab.Abstractions;
using WotDashLab.WebApi.Controllers.Accounts.Models;
using WotDashLab.WebApi.Infrastructure;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts;

namespace WotDashLab.WebApi.Controllers.Accounts
{
    [Route("api/{region}/accounts/profile")]
    [ApiController]
    [WgExceptionFilter]
    public class ProfileController : ControllerBase
    {
        private readonly ApiType _apiType = ApiType.Wot;
        private readonly IWgRequestBuilder _requestBuilder;
        private readonly IWgClientBase _wgClient;
        private readonly IUserContext _userContext;

        public ProfileController(
            IWgRequestBuilder requestBuilder,
            IWgClientBase wgClient,
            IUserContext userContext)
        {
            _requestBuilder = requestBuilder;
            _wgClient = wgClient;
            _userContext = userContext;
        }

        [HttpPost]
        [Route("{accountId}")]
        public async Task<IActionResult> SearchProfile(
            [FromRoute] string region,
            [FromRoute] int accountId,
            [FromBody] FetchAccountProfileRequest request,
            CancellationToken token)
        {
            _requestBuilder.Language = request.Language ?? "ru";
            _requestBuilder.Fields = string.Join(",", request.Fields ?? Array.Empty<string>());
            _requestBuilder.Add("account_id", accountId.ToString());

            if (request.Extras is not null && request.Extras.Any())
            {
                _requestBuilder.Add("extras", string.Join(",", request.Extras));
            }

            if (_userContext.IsAuthenticated)
            {
                _requestBuilder.AccessToken = _userContext.AccessToken;
            }

            var payload = _requestBuilder.Build();
            const string path = "account/info";

            var result = await _wgClient.PostAsync<IDictionary<int, AccountProfile>>(_apiType, region, path, payload, token);
            if (result.Status == "ok" && result.Data.TryGetValue(accountId, out var response))
            {
                var model = response.Adapt<AccountProfileModel>();
                return Ok(model);
            }

            return BadRequest();
        }
    }
}