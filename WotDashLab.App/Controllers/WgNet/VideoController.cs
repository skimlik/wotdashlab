using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WotDashLab.Services.Wgn.Tv;
using WotDashLab.WebApi.Infrastructure;

namespace WotDashLab.WebApi.Controllers.WgNet
{
    [Route("api/{region}/wgn/videos")]
    [ApiController]
    [WgExceptionFilter]
    public class VideoController : ControllerBase
    {
        private readonly IVideoService _videoService;

        public VideoController(IVideoService videoService)
        {
            _videoService = videoService ?? throw new ArgumentNullException(nameof(videoService));
        }

        [HttpPost]
        [Route("search")]
        public async Task<IActionResult> Search(
            [FromRoute] string region,
            [FromBody] VideoSearchRequest request,
            CancellationToken token)
        {
            var result = await _videoService.Search(request, region, token);
            if (result is null)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}