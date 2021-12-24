using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.Exceptions;

namespace WotDashLab.Wot.Client
{
    public static class HttpResponseMessageExtensions
    {
        public static async Task<WotResponseBase<TData, TMetadata>> ReadAsAsync<TData, TMetadata>(this HttpResponseMessage message, CancellationToken token)
            where TMetadata : class, IWotResponseMetadata
        {
            var json = await message.Content.ReadAsStringAsync(token);
            try
            {
                var obj = JsonSerializer.Deserialize<WotResponseBase<TData, TMetadata>>(json);
                if (obj is not null)
                {
                    return obj;
                }
                throw new FormatException("Cannot deserialize response");
            }
            catch (JsonException exception)
            {
                var response = JsonSerializer.Deserialize<WotResponseBase<object, TMetadata>>(json);
                throw new WgErrorException(
                    response.Error.Code,
                    response.Error.Message,
                    response.Error.Field,
                    response.Error.Value,
                    exception);
            }
        }
    }
}