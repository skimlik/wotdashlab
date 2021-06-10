using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.Wgn.Accounts
{
    public class WgnAccountSearchResult
    {
        [JsonPropertyName("games")]
        public string[] Games { get; set; }
        
        [JsonPropertyName("created_at")]
        protected int CreatedAt { get; set; }

        [JsonPropertyName("nickname")]
        public string Nickname { get; set; }

        [JsonPropertyName("account_id")]
        public int AccountId { get; set; }
    }
}