using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WotDashLab.Wot.Client.Contracts.Exceptions;

namespace WotDashLab.WebApi.Infrastructure
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class WgExceptionFilterAttribute : ExceptionFilterAttribute
    {
        override public void OnException(ExceptionContext context)
        {
            if (context.ExceptionHandled)
            {
                base.OnException(context);
                return;
            }

            if (context.Exception is WgErrorException ex)
            {
                context.ExceptionHandled = true;

                switch (ex.Code)
                {
                    case 404:
                        context.Result = new NotFoundResult();
                        break;
                    default:
                        context.Result = new BadRequestResult();
                        break;
                }
            }
        }
    }
}
