using System.Collections.Generic;

namespace WotDashLab.WebApi.Infrastructure.Options
{
    public class WotOptions
    {
        public string ApplicationId { get; set; }

        public string ApplicationType { get; set; }

        public Dictionary<string, WotApiDescriptionOptions> Api { get; set; }

        public string DefaultApi { get; set; }

        public string DefaultRegion { get; set; }
    }
}
