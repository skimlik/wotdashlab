using System;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using WotDashLab.Services.Tanks;
using WotDashLab.WebApi.Controllers.Tanks.Models;
using WotDashLab.WebApi.Infrastructure;

namespace WotDashLab.WebApi.Controllers.Tanks
{
    [Route("api/{region}/[controller]")]
    [ApiController]
    [WgExceptionFilter]
    public class TanksController : ControllerBase
    {
        private readonly ITanksService _tanksService;

        public TanksController(ITanksService tanksService)
        {
            _tanksService = tanksService ?? throw new ArgumentNullException(nameof(tanksService));
        }

        [HttpGet]
        [Route("{tankId}")]
        public async Task<IActionResult> GetAsync(
            [FromRoute] string region,
            [FromRoute] int tankId,
            [FromQuery] string language,
            CancellationToken token)
        {
            var model = new TanksRequest
            {
                TankIds = new [] { tankId },
                Language = language,
                Region = region
            };

            var result = await _tanksService.GetInfosAsync(model, token);
            if (result is null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        [Route("search")]
        public async Task<IActionResult> SearchAsync(
            [FromBody] TanksSearchModel model,
            [FromRoute] string region,
            [FromQuery] string language,
            CancellationToken token)
        {
            var tanksRequest = new TanksRequest
            {
                TankIds = model.TankIds,
                Language = language,
                Region = region
            };

            var result = await _tanksService.GetInfosAsync(tanksRequest, token);
            if (result is null)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}