using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts
{
    public class WotResponseBase<T>
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("error")]
        public WotResponseError Error { get; set; }

        [JsonPropertyName("data")]
        public T Data { get; set; }

        [JsonPropertyName("meta")]
        public WotResponseMetadata Metadata { get; set; }
    }
}