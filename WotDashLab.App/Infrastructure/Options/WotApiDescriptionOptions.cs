using System.Collections.Generic;

namespace WotDashLab.WebApi.Infrastructure.Options
{
    public class WotApiDescriptionOptions
    {
        public string Path { get; set; }

        public string Name { get; set; }

        public Dictionary<string, string> Servers { get; set; }
    }
}