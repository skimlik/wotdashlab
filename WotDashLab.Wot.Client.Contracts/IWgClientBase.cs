using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace WotDashLab.Wot.Client.Contracts
{
    public interface IWgClientBase
    {
        Task<WotResponseBase<T>> PostAsync<T>(
            ApiType apiType,
            string region,
            string path,
            IDictionary<string, string> body,
            CancellationToken token);
    }
}