using System.Collections.Generic;
using WotDashLab.Services.WorldOfTanks.Tanks;

namespace WotDashLab.Services.WorldOfTanks.Accounts
{
    public class AccountProfileModel
    {
        public int AccountId { get; set; }

        public int? ClanId { get; set; }

        public string ClientLanguage { get; set; }

        public int? CreatedAt { get; set; }

        public int? GlobalRating { get; set; }

        public int? LastBattleTime { get; set; }

        public int? LogoutAt { get; set; }

        public int? UpdatedAt { get; set; }

        public string Nickname { get; set; }

        public AccountPrivateInfoModel Private { get; set; }

        public StatisticSegmentsModel Statistics { get; set; }
        
        public IDictionary<int, TankInfoModel> TankInfos { get; set; }
    }
}