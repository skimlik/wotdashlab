using System;
using System.Collections.Generic;
using WotDashLab.Wot.Client.Contracts;

namespace WotDashLab.Wot.Client
{
    public class WgRequestBuilder : IWgRequestBuilder
    {
        private readonly IDictionary<string, string> _request = new Dictionary<string, string>();

        public string ApplicationId { get; set; }

        public string AccessToken { get; set; }

        public string Fields { get; set; }

        public string Language { get; set; }

        public WgRequestBuilder(string applicationId)
        {
            ApplicationId = applicationId ?? throw new ArgumentNullException(nameof(applicationId));
        }

        public void Add(string name, string value)
        {
            if (name == null)
            {
                throw new ArgumentNullException(nameof(name));
            }

            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }

            AddStringField(name, () => value);
        }

        public IDictionary<string, string> Build()
        {
            _request["application_id"] = ApplicationId;
            AddStringField("access_token", () => AccessToken);
            AddStringField("fields", () => Fields);
            AddStringField("language", () => Language);

            return _request;
        }

        private void AddStringField(string name, Func<string> fieldValueGetter)
        {
            var value = fieldValueGetter();
            if (string.IsNullOrEmpty(value))
            {
                return;
            }

            _request[name] = value;
        }
    }
}