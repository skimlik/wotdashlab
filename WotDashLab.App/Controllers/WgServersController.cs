using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WotDashLab.Services.Wgn;
using WotDashLab.WebApi.Infrastructure;

namespace WotDashLab.WebApi.Controllers
{
    [Route("api/{region}/wgn/servers")]
    [ApiController]
    [WgExceptionFilter]
    public class WgServersController : ControllerBase
    {
        private readonly IServerInfoService _servers;

        public WgServersController(IServerInfoService servers)
        {
            _servers = servers ?? throw new ArgumentNullException(nameof(servers));
        }

        [HttpGet]
        public async Task<IActionResult> GetServerInfosAsync([FromRoute] string region, [FromQuery] string language, CancellationToken token)
        {
            var result = await _servers.GetServerInfoAsync(new WgnServerInfoRequest
            {
                Language = language
            }, region, token);

            if (result is null)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}