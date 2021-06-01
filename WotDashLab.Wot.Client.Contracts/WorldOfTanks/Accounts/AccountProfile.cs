using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts
{
    public class AccountProfile
    {
        [JsonPropertyName("account_id")]
        public int AccountId { get; set; }

        [JsonPropertyName("clan_id")]
        public int? ClanId { get; set; }

        [JsonPropertyName("client_language")]
        public string ClientLanguage { get; set; }

        [JsonPropertyName("created_at")]
        public int? CreatedAt { get; set; }

        [JsonPropertyName("global_rating")]
        public int? GlobalRating { get; set; }

        [JsonPropertyName("last_battle_time")]
        public int? LastBattleTime { get; set; }

        [JsonPropertyName("logout_at")]
        public int? LogoutAt { get; set; }

        [JsonPropertyName("updated_at")]
        public int? UpdatedAt { get; set; }

        [JsonPropertyName("nickname")]
        public string Nickname { get; set; }

        [JsonPropertyName("private")]
        public AccountPrivateInfo Private { get; set; }

        [JsonPropertyName("statistics")]
        public StatisticSegments Statistics { get; set; }
    }
}