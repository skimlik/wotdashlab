using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.Wgn.WgTv;

namespace WotDashLab.Services.Wgn.Tv
{
    public interface IVideoService
    {
        Task<WotResponseBase<WgTvVideoInfo[], WotResponsePagedMetadata>> Search(VideoSearchRequest model, string region, CancellationToken token);
    }
}