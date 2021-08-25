using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts
{
    public class WotResponseMetadata : IWotResponseMetadata
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }
    }
}