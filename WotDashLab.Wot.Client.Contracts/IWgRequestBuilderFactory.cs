using WotDashLab.Abstractions;

namespace WotDashLab.Wot.Client.Contracts
{
    public interface IWgRequestBuilderFactory
    {
        IWgRequestBuilder CreateRequestBuilder();
        
        IWgRequestBuilder CreateRequestBuilder(IUserContext userContext);
    }
}