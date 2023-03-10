using Backend.Service.Entities;
using Backend.Service.Extensions;
using Backend.Service.Helper;
using LinqKit;

namespace Backend.Service.Services
{
    public class StatisticService
    {
        private readonly ApplicationDbContext _db;

        public StatisticService(ApplicationDbContext db)
        {
            _db = db;
        }

        public PagedList<dynamic> GetOrderStatistic(StatisticFilterParameter filter)
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
    }
}
