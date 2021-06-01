using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts
{
    public class PlayerAccount
    {
        [JsonPropertyName("nickname")]
        public string NickName { get; set; }

        [JsonPropertyName("account_id")]
        public int AccountId { get; set; }
    }
}