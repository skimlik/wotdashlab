using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WotDashLab.Services.Accounts;
using WotDashLab.WebApi.Controllers.Accounts.Models;
using WotDashLab.WebApi.Infrastructure;

namespace WotDashLab.WebApi.Controllers.Accounts
{
    [Route("api/{region}/accounts/profile")]
    [ApiController]
    [WgExceptionFilter]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
        }

        [HttpPost]
        [Route("{accountId:int}")]
        public async Task<IActionResult> SearchProfile(
            [FromRoute] string region,
            [FromRoute] int accountId,
            [FromBody] FetchAccountProfileModel request,
            CancellationToken token)
        {
            var model = new ProfileRequest
            {
                Extras = request.Extras,
                Fields = request.Fields,
                Language = request.Language,
                Region = region,
                AccountId = accountId,
            };
            var result = await _profileService.GetAccountProfileAsync(model, token);
            if (result is null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}