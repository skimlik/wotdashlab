using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts
{
    public class StatisticSegments
    {
        [JsonPropertyName("trees_cut")]
        public int TreesCut { get; set; }

        [JsonPropertyName("frags")]
        public IDictionary<int, int> Frags { get; set; }

        [JsonPropertyName("all")]
        public AccountStatistics All { get; set; }

        [JsonPropertyName("clan")]
        public AccountStatistics Clan { get; set; }

        [JsonPropertyName("historical")]
        public AccountStatistics Historical { get; set; }

        [JsonPropertyName("team")]
        public AccountStatistics Team { get; set; }

        [JsonPropertyName("company")]
        public AccountStatistics Company { get; set; }

        [JsonPropertyName("stronghold_defense")]
        public AccountStatistics StrongholdDefense { get; set; }

        [JsonPropertyName("stronghold_skirmish")]
        public AccountStatistics StrongholdSkirmish { get; set; }

        [JsonPropertyName("regular_team")]
        public AccountStatistics RegularTeam { get; set; }
    }
}
