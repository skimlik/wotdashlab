namespace WotDashLab.WebApi.Infrastructure.Authentication
{
    public class AuthenticationDefaults
    {
        public static string DefaultSchema = "WotAccessToken";

        public static string AccessTokenHeaderName = "X-AccessToken";

        public static string ExpiresOnHeaderName = "X-ExpiresOn";

        public static string UserNameHeaderName = "X-UserName";
    }
}