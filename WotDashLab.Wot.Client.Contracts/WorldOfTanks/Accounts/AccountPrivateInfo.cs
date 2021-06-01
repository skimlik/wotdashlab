using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts
{
    public class AccountPrivateInfo
    {
        [JsonPropertyName("ban_info")]
        public string BanInfo { get; set; }

        [JsonPropertyName("ban_time")]
        public int? BanTime { get; set; }

        [JsonPropertyName("credits")]
        public int? Credits { get; set; }

        [JsonPropertyName("gold")]
        public int? Gold { get; set; }

        [JsonPropertyName("bonds")]
        public int? Bonds { get; set; }

        [JsonPropertyName("free_xp")]
        public int? FreeXp { get; set; }

        [JsonPropertyName("battle_life_time")]
        public int? BattleLifeTime { get; set; }

        [JsonPropertyName("premium_expires_at")]
        public int? PremiumExpiresAt { get; set; }
    }
}