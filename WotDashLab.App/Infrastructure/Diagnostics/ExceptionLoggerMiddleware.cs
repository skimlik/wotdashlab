using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace WotDashLab.WebApi.Infrastructure.Diagnostics
{
    public class ExceptionLoggerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionLoggerMiddleware> _logger;

        public ExceptionLoggerMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _logger = loggerFactory?.CreateLogger<ExceptionLoggerMiddleware>() ?? throw new ArgumentNullException(nameof(loggerFactory));
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogWarning("Request processing was cancelled", ex);
                if (!context.Response.HasStarted)
                {
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("An error has occurred.", CancellationToken.None);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("An error has occured in middleware pipeline.", ex);
                if (!context.Response.HasStarted)
                {
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("An error has occurred.", CancellationToken.None);
                }
            }
        }
    }
}