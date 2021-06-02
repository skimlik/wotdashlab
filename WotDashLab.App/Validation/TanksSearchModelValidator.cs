using FluentValidation;
using WotDashLab.WebApi.Controllers.Tanks.Models;

namespace WotDashLab.WebApi.Validation
{
    public class TanksSearchModelValidator : AbstractValidator<TanksSearchModel>
    {
        public TanksSearchModelValidator()
        {
            RuleFor(p => p.TankIds).NotEmpty();
        }
    }
}