using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using WotDashLab.Abstractions;

namespace WotDashLab.Services
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public bool IsAuthenticated =>
             _httpContextAccessor.HttpContext.User?.FindFirst(ClaimTypes.Hash)?.Value is not null;

        public string AccessToken =>
            _httpContextAccessor.HttpContext.User?.FindFirst(ClaimTypes.Hash)?.Value;

        public string UserName =>
            _httpContextAccessor.HttpContext.User?.FindFirst(ClaimTypes.Name)?.Value;

    }
}