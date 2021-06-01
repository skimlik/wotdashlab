namespace WotDashLab.Abstractions
{
    public interface IUserContext
    {
        bool IsAuthenticated { get; }

        string AccessToken { get;  }

        string UserName { get; }
    }
}