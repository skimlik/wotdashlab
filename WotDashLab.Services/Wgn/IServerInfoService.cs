using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Wot.Client.Contracts.Wgn.Servers;

namespace WotDashLab.Services.Wgn
{
    public interface IServerInfoService
    {
        Task<IDictionary<string, WgnServerInfo[]>> GetServerInfoAsync(WgnServerInfoRequest model, string region, CancellationToken token);
    }
}