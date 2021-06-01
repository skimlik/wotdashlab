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
        public static async Task<T> ReadAsAsync<T>(this HttpResponseMessage message, CancellationToken token)
        {
            var json = await message.Content.ReadAsStringAsync(token);
            try
            {
                var obj = JsonSerializer.Deserialize<T>(json);
                if (obj is not null)
                {
                    return obj;
                }
                throw new FormatException("Cannot deserialize response");
            }
            catch(JsonException exception)
            {
                var response = JsonSerializer.Deserialize<WotResponseBase<object>>(json);
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