using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WotDashLab.Services;
using WotDashLab.WebApi.Controllers.Accounts.Models;
using WotDashLab.WebApi.Infrastructure;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts;

namespace WotDashLab.WebApi.Controllers.Accounts
{
    [Route("api/{region}/accounts")]
    [Route("api/{region}/wot/accounts")]
    [ApiController]
    [WgExceptionFilter]
    public class WotAccountsController : ControllerBase
    {
        private const ApiType ApiType = Wot.Client.Contracts.ApiType.Wot;
        private readonly IWgRequestBuilder _requestBuilder;
        private readonly IWgClientBase _wgClient;

        public WotAccountsController(
            IWgRequestBuilder requestBuilder,
            IWgClientBase wgClient)
        {
            _requestBuilder = requestBuilder;
            _wgClient = wgClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromRoute] string region,
            [FromQuery] string search,
            [FromQuery] string searchType,
            [FromQuery] int limit,
            CancellationToken token)
        {
            if (string.IsNullOrEmpty(search))
            {
                return BadRequest();
            }

            searchType ??= AccountSearchTypes.StartsWith;
            _requestBuilder.Add("search", search);
            _requestBuilder.Add("type", searchType);
            if (limit != default)
            {
                _requestBuilder.Add("limit", limit.ToString());
            }

            var payload = _requestBuilder.Build();

            var resourcePath = "account/list";
            var results = await _wgClient
                .FetchData<PlayerAccount[]>(ApiType, region, resourcePath, payload, token);

            return Ok(results.Data);
        }

        [HttpGet]
        [Route("{nickname}")]
        public async Task<IActionResult> Get([FromRoute] string nickname, [FromRoute] string region, CancellationToken token)
        {
            _requestBuilder.Add("search", nickname);
            _requestBuilder.Add("type", AccountSearchTypes.Exact);
            var payload = _requestBuilder.Build();

            var resourcePath = "account/list";
            var search = await _wgClient
                .FetchData<PlayerAccount[]>(ApiType, region, resourcePath, payload, token);

            if (search.Data.Length <= 0)
            {
                return NotFound();
            }

            return Ok(search.Data.First());
        }
    }
}