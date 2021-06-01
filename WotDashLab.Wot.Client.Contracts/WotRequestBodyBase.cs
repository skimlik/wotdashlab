using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts
{
    public class WotRequestBodyBase
    {
        [JsonPropertyName("application_id")]
        public string ApplicationId { get; set; }

        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }

        [JsonPropertyName("fields")]
        public string Fields { get; set; }

        [JsonPropertyName("language")]
        public string Language { get; set; } = "ru";
    }
}