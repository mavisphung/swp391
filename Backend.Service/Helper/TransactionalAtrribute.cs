using Microsoft.AspNetCore.Mvc.Filters;
using System.Transactions;

namespace Backend.Service.Helper
{
    public class TransactionalAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            using (var transactionScope = new TransactionScope())
            {
                ActionExecutedContext actionExecutedContext = await next();
                //if no exception were thrown
                if (actionExecutedContext.Exception == null)
                    transactionScope.Complete();
            }
        }
    }
}
