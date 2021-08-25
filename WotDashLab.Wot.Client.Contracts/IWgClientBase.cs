using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace WotDashLab.Wot.Client.Contracts
{
    public interface IWgClientBase
    {
        Task<WotResponseBase<T, WotResponseMetadata>> FetchData<T>(
            ApiType apiType,
            string region,
            string path,
            IDictionary<string, string> body,
            CancellationToken token);
        
        Task<WotResponseBase<TData, TMetadata>> FetchData<TData, TMetadata>(
            ApiType apiType,
            string region,
            string path,
            IDictionary<string, string> body,
            CancellationToken token) where TMetadata : class, IWotResponseMetadata;
    }
}