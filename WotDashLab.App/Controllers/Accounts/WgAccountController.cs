using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WotDashLab.Services.Wgn;
using WotDashLab.WebApi.Infrastructure;

namespace WotDashLab.WebApi.Controllers.Accounts
{
    [Route("api/{region}/wgn/accounts")]
    [ApiController]
    [WgExceptionFilter]
    public class WgAccountController : ControllerBase
    {
        private readonly IWgnAccountsService _wgnAccounts;

        public WgAccountController(IWgnAccountsService wgnAccounts)
        {
            _wgnAccounts = wgnAccounts ?? throw new ArgumentNullException(nameof(wgnAccounts));
        }
        
        [HttpPost]
        [Route("search")]
        public async Task<IActionResult> Search(
            [FromRoute] string region,
            [FromBody] WgnAccountSearchRequest request,
            CancellationToken token)
        {
            request.Region = string.IsNullOrWhiteSpace(region) ? "ru" : region;
            var result = await _wgnAccounts.Search(request, token);
            if (result is null)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}