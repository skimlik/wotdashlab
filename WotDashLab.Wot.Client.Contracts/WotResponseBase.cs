using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts
{
    public class WotResponseBase<TData, TMetadata> where TMetadata : class, IWotResponseMetadata
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("error")]
        public WotResponseError Error { get; set; }

        [JsonPropertyName("data")]
        public TData Data { get; set; }

        [JsonPropertyName("meta")]
        public TMetadata Metadata { get; set; }

        public bool IsOk => Status == "ok";
    }
}