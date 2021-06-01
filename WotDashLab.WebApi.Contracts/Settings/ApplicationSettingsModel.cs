using System.Collections.Generic;

namespace WotDashLab.WebApi.Contracts.Settings
{
    public class ApplicationSettingsModel
    {
        public string ApplicationId { get; set; }

        public DefaultWotAppModel DefaultApi { get; set; }

        public IDictionary<string, WotApplicationRegionsModel> ApiTypes { get; set; }

        public IDictionary<string, string> Redirects { get; set; }
    }

    public class DefaultWotAppModel
    {
        public string Api { get; set; }

        public string Region { get; set; }
    }

    public class WotApplicationRegionsModel
    {
        public string Name { get; set; }

        public string[] Regions { get; set; }
    }
}