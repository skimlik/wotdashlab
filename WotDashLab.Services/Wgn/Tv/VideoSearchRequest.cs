namespace WotDashLab.Services.Wgn.Tv
{
    public class VideoSearchRequest
    {
        public int[] CategoryId { get; set; }

        public int? DateFrom { get; set; }

        public string[] Fields { get; set; }

        public bool? Important { get; set; }

        public int[] ProgramIds { get; set; }

        public int[] ProjectIds { get; set; }

        public string Language { get; set; }

        public int? Limit { get; set; }

        public int? PageNo { get; set; }

        public string Query { get; set; }

        public int[] VehicleIds { get; set; }

        public string[] VideoIds { get; set; }
    }
}