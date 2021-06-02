using System.Threading;
using System.Threading.Tasks;

namespace WotDashLab.Services.Accounts
{
    public interface IProfileService
    {
        Task<AccountProfileModel> GetAccountProfileAsync(ProfileRequest model, CancellationToken token);
    }
}