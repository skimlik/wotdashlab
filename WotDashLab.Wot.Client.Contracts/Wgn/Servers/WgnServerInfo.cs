using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.Wgn.Servers
{
    public class WgnServerInfo
    {
        [JsonPropertyName("players_online")]
        public long PlayersOnline { get; set; }

        [JsonPropertyName("server")]
        public string Server { get; set; }
    }
}