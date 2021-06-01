namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks
{
    public interface IEndpointResolver
    {
        string Resolve(ApiType apiType, string region);
    }
}