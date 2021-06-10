namespace WotDashLab.Services.WorldOfTanks.Tanks
{
    public class TankImagesModel
    {
        public string SmallIcon { get; set; }
        
        public string ContourIcon { get; set; }
        
        public string BigIcon { get; set; }
    }
    
    public class TankInfoModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ShortName { get; set; }

        public string Nation { get; set; }

        public short Tier { get; set; }

        public string Type { get; set; }

        public string Description { get; set; }

        public bool IsPremium { get; set; }

        public TankImagesModel Images { get; set; }
    }
}