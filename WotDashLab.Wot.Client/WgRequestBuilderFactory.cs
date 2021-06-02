using System;
using WotDashLab.Abstractions;
using WotDashLab.Wot.Client.Contracts;

namespace WotDashLab.Wot.Client
{
    public class WgRequestBuilderFactory : IWgRequestBuilderFactory
    {
        private readonly string _applicationId;

        public WgRequestBuilderFactory(string applicationId)
        {
            _applicationId = applicationId ?? throw new ArgumentNullException(nameof(applicationId));
        }
        
        public IWgRequestBuilder CreateRequestBuilder()
        {
            return new WgRequestBuilder(_applicationId);
        }

        public IWgRequestBuilder CreateRequestBuilder(IUserContext userContext)
        {
            var requestBuilder = new WgRequestBuilder(_applicationId);
            if (userContext?.IsAuthenticated ?? false)
            {
                requestBuilder.AccessToken = userContext.AccessToken;
            }

            return requestBuilder;
        }
    }
}