using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks.Tanks
{
    public class ShortTankInfo
    {
        [JsonPropertyName("tank_id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("short_name")]
        public string ShortName { get; set; }

        [JsonPropertyName("nation")]
        public string Nation { get; set; }

        [JsonPropertyName("prices_xp")]
        public IDictionary<int, int> PricesXp { get; set; }

        [JsonPropertyName("price_credit")]
        public int? PriceCredit { get; set; }

        [JsonPropertyName("price_gold")]
        public int? PriceGold { get; set; }
        
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("is_premium")]
        public bool IsPremium { get; set; }

        [JsonPropertyName("is_premium_igr")]
        public bool IsPremiumIgr { get; set; }
        
        [JsonPropertyName("is_wheeled")]
        public bool IsWheeled { get; set; }

        [JsonPropertyName("is_gift")]
        public bool IsGift { get; set; }

        [JsonPropertyName("tier")]
        public short Tier { get; set; }

        [JsonPropertyName("tag")]
        public string Tag { get; set; }

        [JsonPropertyName("images")]
        public TankImages Images { get; set; }
    }
}