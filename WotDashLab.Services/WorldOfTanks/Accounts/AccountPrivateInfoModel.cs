namespace WotDashLab.Services.WorldOfTanks.Accounts
{
    public class AccountPrivateInfoModel
    {
        public string BanInfo { get; set; }

        public int? BanTime { get; set; }

        public int? Credits { get; set; }

        public int? Gold { get; set; }

        public int? Bonds { get; set; }

        public int? FreeXp { get; set; }

        public int? BattleLifeTime { get; set; }

        public int? PremiumExpiresAt { get; set; }
    }
}