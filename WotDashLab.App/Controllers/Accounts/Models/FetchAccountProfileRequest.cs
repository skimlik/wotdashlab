using System.Text.Json.Serialization;

namespace WotDashLab.WebApi.Controllers.Accounts.Models
{
    public class FetchAccountProfileRequest
    {
        [JsonPropertyName("extras")]
        public string[] Extras { get; set; }

        [JsonPropertyName("fields")]
        public string[] Fields { get; set; }

        [JsonPropertyName("language")]
        public string Language { get; set; }
    }
}