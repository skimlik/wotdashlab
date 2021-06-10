using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace WotDashLab.Services.WorldOfTanks.Tanks
{
    public interface ITanksService
    {
        Task<ICollection<TankInfoModel>> GetInfosAsync(TanksRequest request, CancellationToken token);
    }
}