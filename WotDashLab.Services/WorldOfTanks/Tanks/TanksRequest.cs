using System.Collections.Generic;

namespace WotDashLab.Services.WorldOfTanks.Tanks
{
    public class TanksRequest
    {
        public ICollection<int> TankIds { get; set; }

        public string Region { get; set; }

        public string Language { get; set; } = "ru";
        
        public int? limit { get; set; }

        public string[] Fields { get; set; }
    }
}