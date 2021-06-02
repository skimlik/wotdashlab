namespace WotDashLab.Services.Accounts
{
    public class ProfileRequest
    {
        public int AccountId { get; set; }

        public string Language { get; set; } = "ru";

        public string Region { get; set; }

        public string[] Extras { get; set; }

        public string[] Fields { get; set; }
    }
}