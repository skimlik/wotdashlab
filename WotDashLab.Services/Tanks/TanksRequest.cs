using System.Collections.Generic;

namespace WotDashLab.Services.Tanks
{
    public class TanksRequest
    {
        public ICollection<int> TankIds { get; set; }

        public string Region { get; set; }

        public string Language { get; set; } = "ru";

        public string[] Fields { get; set; }
    }
}