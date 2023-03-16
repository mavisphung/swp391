using Backend.Service.Entities;
using Backend.Service.Extensions;
using Backend.Service.Helper;
using Backend.Service.Consts;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class StatisticService
    {
        private readonly ApplicationDbContext _db;

        public StatisticService(ApplicationDbContext db)
        {
            _db = db;
        }

        public PagedList<dynamic> GetProductCountByDate(StatisticFilterParameter filter)
        {
            var predicate = PredicateBuilder.New<Order>();
            if (filter.From.HasValue)
            {
                predicate = predicate.And(ord => ord.CreatedDate >= filter.From.Value.SetKindUtc());
            }
            if (filter.To.HasValue)
            {
                predicate = predicate.And(ord => ord.CreatedDate <= filter.To.Value.SetKindUtc());
            }


            var query = _db.Orders.GroupBy(ord => ord.CreatedDate.Date)
                .Select(g => new { CreatedDate = g.Key, Orders = g.Count() })
                .OrderBy(g => g.CreatedDate);
            var pagedList = PagedList<dynamic>.ToPagedList(query, filter.PageNumber, filter.PageSize);
            return pagedList;
        }



        public async Task<Dictionary<string, double>> GetCountAsync(StatisticFilterParameter filter)
        {
            var orderCountTask = GetOrderCountByStatusAsync(null);
            var productCountTask = GetProductsCountAsync();
            var customerCountTask = GetCustomerCountAsync();
            var profitTask = GetProfitAsync();

            var orderFinishedCountTask = GetOrderCountByStatusAsync(OrderStatus.Finished);
            var orderCancelledCountTask = GetOrderCountByStatusAsync(OrderStatus.Cancelled);
            var orderPendingCountTask = GetOrderCountByStatusAsync(OrderStatus.Pending);

            // nều cần thì thêm cái from to

            await Task.WhenAll(
                orderCountTask, 
                productCountTask, 
                customerCountTask, 
                profitTask, 
                orderFinishedCountTask,
                orderCancelledCountTask,
                orderPendingCountTask);

            var dict = new Dictionary<string, double>()
            {
                { "orders", orderCountTask.Result },
                { "ordersFinished", orderFinishedCountTask.Result },
                { "ordersCancelled", orderCancelledCountTask.Result },
                { "ordersPending", orderPendingCountTask.Result },
                { "products", productCountTask.Result },
                { "customers", customerCountTask.Result },
                { "profit", profitTask.Result }
            };

            return dict;
        }

        private async Task<int> GetOrderCountByStatusAsync(OrderStatus? status)
        {
            using (var context = new ApplicationDbContext())
            {
                if (status.HasValue)
                {
                    return await context.Orders.Where(ord => ord.Status == status).CountAsync();
                }
                return await context.Orders.CountAsync();
            }
        }

        private async Task<int> GetProductsCountAsync()
        {
            using (var context = new ApplicationDbContext())
            {
                return await context.Products.Where(p => p.Status == ProductStatus.Available).CountAsync();
            }
        }

        private async Task<int> GetCustomerCountAsync()
        {
            using (var context = new ApplicationDbContext())
            {
                return await context.ShippingAddresses.CountAsync();
            }
        }

        private async Task<double> GetProfitAsync()
        {
            using (var context = new ApplicationDbContext())
            {
                return await context.Orders.Where(ord => ord.Status == OrderStatus.Finished).Select(ord => ord.TotalPrice).SumAsync();
            }
        }

        // Số đơn hàng đã được thanh toán trong 1 thành phố
        public async Task<dynamic> GetProductCountByCities()
        {
            var data = await _db.Orders.GroupBy(ord => ord.ShippingAddress.Province)
                .Select(group => new { province = group.Key, count = group.Count() })
                .ToListAsync();
            return data;
        }

        public async Task<dynamic> GetProfitsByDate(StatisticFilterParameter filter)
        {
            var predicate = PredicateBuilder.New<Order>();
            if (filter.From.HasValue)
            {
                predicate = predicate.And(ord => ord.CreatedDate >= filter.From.Value.SetKindUtc());
            } else
            {
                predicate = predicate.And(ord => ord.CreatedDate >= DateTime.UtcNow);
            }

            if (filter.To.HasValue)
            {
                predicate = predicate.And(ord => ord.CreatedDate <= filter.To.Value.SetKindUtc());
            } else
            {
                predicate = predicate.And(ord => ord.CreatedDate <= DateTime.UtcNow.AddDays(30));
            }

            var query = _db.Orders.GroupBy(ord => ord.CreatedDate.Date)
                .Select(g => new { CreatedDate = g.Key, total = g.Where(el => el.Status == OrderStatus.Finished).Sum(sel => sel.TotalPrice) })
                .OrderBy(g => g.CreatedDate);
            var pagedList = PagedList<dynamic>.ToPagedList(query, filter.PageNumber, filter.PageSize);
            return pagedList;
        }
    }
}
