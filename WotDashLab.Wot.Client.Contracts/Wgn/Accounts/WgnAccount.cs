using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.Wgn.Accounts
{
    public class WgnAccountPrivateInfo
    {
        [JsonPropertyName("premium_expires_at")]
        public int PremiumExpiresAt { get; set; }

        [JsonPropertyName("free_xp")]
        public int FreeXp { get; set; }

        [JsonPropertyName("gold")]
        public int Gold { get; set; }
    }
    
    public class WgnAccount
    {
        [JsonPropertyName("games")]
        public string[] Games { get; set; }

        [JsonPropertyName("created_at")]
        public int? CreatedAt { get; set; }

        [JsonPropertyName("nickname")]
        public string Nickname { get; set; }

        [JsonPropertyName("account_id")]
        public int AccountId { get; set; }

        [JsonPropertyName("private")]
        public WgnAccountPrivateInfo  Private { get; set; }
    }
}