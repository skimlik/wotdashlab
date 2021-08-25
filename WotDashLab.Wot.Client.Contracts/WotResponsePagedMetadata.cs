using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts
{
    public class WotResponsePagedMetadata : WotResponseMetadata
    {
        [JsonPropertyName("page_total")]
        public int PageTotal { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }

        [JsonPropertyName("limit")]
        public int Limit { get; set; }

        [JsonPropertyName("page")]
        public int Page { get; set; }
    }
}