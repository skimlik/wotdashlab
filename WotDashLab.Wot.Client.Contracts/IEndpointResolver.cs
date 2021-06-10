namespace WotDashLab.Wot.Client.Contracts
{
    public interface IEndpointResolver
    {
        string Resolve(ApiType apiType, string region);
    }
}