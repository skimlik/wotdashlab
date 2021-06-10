using FluentValidation;
using WotDashLab.Services.Wgn;

namespace WotDashLab.WebApi.Validation
{
    public class WgnAccountsSearchRequestValidator : AbstractValidator<WgnAccountSearchRequest>
    {
        public WgnAccountsSearchRequestValidator()
        {
            RuleFor(p => p.Search).NotEmpty();
        }
    }
}