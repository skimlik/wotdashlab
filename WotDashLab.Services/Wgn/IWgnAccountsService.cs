using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Wot.Client.Contracts.Wgn.Accounts;

namespace WotDashLab.Services.Wgn
{
    public interface IWgnAccountsService
    {
        Task<ICollection<WgnAccountSearchResult>> Search(WgnAccountSearchRequest model, CancellationToken token);
    }
}