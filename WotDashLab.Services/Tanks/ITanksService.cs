using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace WotDashLab.Services.Tanks
{
    public interface ITanksService
    {
        Task<ICollection<TankInfoModel>> GetInfosAsync(TanksRequest request, CancellationToken token);
    }
}