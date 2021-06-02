using System.Collections.Generic;

namespace WotDashLab.Wot.Client.Contracts
{
    public interface IWgRequestBuilder
    {
        void Add(string name, string value);
        
        IDictionary<string, string> Build();
        
        string ApplicationId { get; set; }
        
        string AccessToken { get; set; }
        
        string Fields { get; set; }
        
        string Language { get; set; }
    }
}