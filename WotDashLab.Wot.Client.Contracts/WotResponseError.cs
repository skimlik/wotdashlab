using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts
{
    public class WotResponseError
    {
        [JsonPropertyName("code")]
        public int Code { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("field")]
        public string Field { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }
    }
}