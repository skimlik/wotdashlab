namespace WotDashLab.Services.Wgn
{
    public class WgnAccountSearchRequest
    {
        public string Search { get; set; }

        public string[] Fields { get; set; }

        public string[] Game { get; set; }

        public string Language { get; set; }

        public string Region { get; set; }
        
        public int Limit { get; set; }

        public string Type { get; set; } = AccountSearchTypes.StartsWith;
    }
}