using System.Threading;
using System.Threading.Tasks;

namespace WotDashLab.Services.WorldOfTanks.Accounts
{
    public interface IProfileService
    {
        Task<AccountProfileModel> GetAccountProfileAsync(ProfileRequest model, CancellationToken token);
    }
}