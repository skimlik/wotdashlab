using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks.Tanks
{
    public class TankImages
    {
        [JsonPropertyName("small_icon")]
        public string SmallIcon { get; set; }

        [JsonPropertyName("contour_icon")]
        public string ContourIcon { get; set; }

        [JsonPropertyName("big_icon")]
        public string BigIcon { get; set; }
    }
}