using System.Collections.Generic;
using WotDashLab.Wot.Client.Contracts;

namespace WotDashLab.Wot.Client
{
    public static class SupportedLanguages
    {
        private static readonly IDictionary<Language, string> _languageNamesMap = new Dictionary<Language, string>
        {
            [Language.Ru] = nameof(Language.Ru).ToLower(),
            [Language.En] = nameof(Language.En).ToLower(),
        };

        public static string GetName(Language language, string defaultName)
        {
            if (_languageNamesMap.TryGetValue(language, out string name))
            {
                return name;
            }
            return defaultName;
        }
    }
}