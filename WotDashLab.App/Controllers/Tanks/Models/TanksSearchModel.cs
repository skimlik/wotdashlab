using System.Text.Json.Serialization;

namespace WotDashLab.WebApi.Controllers.Tanks.Models
{
    public class TanksSearchModel
    {
        [JsonPropertyName("tankIds")]
        public int[] TankIds { get; set; }
    }
}