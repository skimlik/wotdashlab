using System.Collections.Generic;

namespace WotDashLab.Services.Accounts
{
    public class StatisticSegmentsModel
    {
        public int TreesCut { get; set; }

        public IDictionary<int, int> Frags { get; set; }

        public AccountStatisticModel All { get; set; }

        public AccountStatisticModel Clan { get; set; }

        public AccountStatisticModel Historical { get; set; }

        public AccountStatisticModel Team { get; set; }

        public AccountStatisticModel Company { get; set; }

        public AccountStatisticModel StrongholdDefense { get; set; }

        public AccountStatisticModel StrongholdSkirmish { get; set; }

        public AccountStatisticModel RegularTeam { get; set; }
    }
}
