using Backend.Service.Entities;
using Backend.Service.Helper;
using Backend.Service.Models.Order;
using Backend.Service.Repositories.IRepositories;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrderRepository _orderRepository;

        //private readonly ApplicationDbContext _context;
        public UserService(
            IUserRepository userRepository,
            IOrderRepository orderRepository
            //ApplicationDbContext context

        )
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            //_context = context;
        }

        public IEnumerable<User> GetAll(FilterParameter pagingParameter)
        {
            IEnumerable<User> query = _userRepository.GetAll();
            return PagedList<User>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id),
                pagingParameter.PageNumber,
                pagingParameter.PageSize);
        }

        public async Task<PagedList<User>> GetAllAsync(FilterParameter pagingParameter)
        {
            IEnumerable<User> query = await _userRepository.GetAllAsync();

            return PagedList<User>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id), 
                pagingParameter.PageNumber, 
                pagingParameter.PageSize);
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public User? GetUserById(int id)
        {
            return _userRepository.GetUserById(id);
        }

        //public PagedList<User> GetAllUsers(UserParameter userParam, PagingParameter paging)
        //{
        //    var values = _userRepository.GetAll(includeProperties: userParam.includeProperties);

        //    if (userParam.notIncludeRoleId != null)
        //    {
        //        foreach (var notInclude in userParam.notIncludeRoleId.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        //        {
        //            values = values.Where(x => x.RoleId != notInclude);
        //        }
        //    }

        //    if (userParam.Id != null)
        //    {
        //        values = values.Where(x => x.Id == userParam.Id);
        //    }
        //    if (!string.IsNullOrWhiteSpace(userParam.Fullname))
        //    {
        //        values = values.Where(x => x.Fullname != null && x.Fullname.Contains(userParam.Fullname, StringComparison.InvariantCultureIgnoreCase));
        //    }
        //    if (userParam.StoreId != null)
        //    {
        //        values = values.Where(x => x.StoreId == userParam.StoreId);
        //    }
        //    if (!string.IsNullOrWhiteSpace(userParam.RoleId))
        //    {
        //        values = values.Where(x => x.RoleId == userParam.RoleId);
        //    }
        //    if (!string.IsNullOrWhiteSpace(userParam.Phone))
        //    {
        //        values = values.Where(x => x.Phone.Contains(userParam.Phone, StringComparison.InvariantCultureIgnoreCase));
        //    }
        //    if (!string.IsNullOrWhiteSpace(userParam.StatusId))
        //    {
        //        values = values.Where(x => x.StatusId == userParam.StatusId);
        //    }
        //    if (!string.IsNullOrWhiteSpace(userParam.Email))
        //    {
        //        values = values.Where(x => x.Email.Contains(userParam.Email, StringComparison.InvariantCultureIgnoreCase));
        //    }

        //    if (!string.IsNullOrWhiteSpace(userParam.sort))
        //    {
        //        switch (userParam.sort)
        //        {
        //            case "id":
        //                if (userParam.dir == "asc")
        //                    values = values.OrderBy(d => d.Id);
        //                else if (userParam.dir == "desc")
        //                    values = values.OrderByDescending(d => d.Id);
        //                break;
        //            case "fullname":
        //                if (userParam.dir == "asc")
        //                    values = values.OrderBy(d => d.Fullname);
        //                else if (userParam.dir == "desc")
        //                    values = values.OrderByDescending(d => d.Fullname);
        //                break;
        //        }
        //    }

        //    return PagedList<User>.ToPagedList(values.AsQueryable(),
        //    paging.PageNumber,
        //    paging.PageSize);
        //}

        public bool CheckEmaiExisted(string emailStr)
        {
            var values = _userRepository.CheckEmailExsited(emailStr);

            return values;
        }

        internal async Task<PagedList<OrderResponseModel>> GetOrderHistoryAsync(OrderHistoryParameter filter)
        {
            var predicate = PredicateBuilder.New<Order>(ord => !ord.IsDeleted);

            if (filter.UserId.HasValue)
            {
                predicate = predicate.And(ord => ord.UserId == filter.UserId.Value);
            }

            if (!string.IsNullOrEmpty(filter.Email)) 
            {
                predicate = predicate.And(ord => ord.ShippingAddress.Email == filter.Email);
            }

            if (!string.IsNullOrEmpty(filter.Phone)) 
            {
                predicate = predicate.And(ord => ord.ShippingAddress.PhoneNumber == filter.Phone);
            }

            if (filter.OrderStatus.GetValueOrDefault() != 0)
            {
                predicate = predicate.And(ord => ord.Status == filter.OrderStatus.GetValueOrDefault());
            }

            IEnumerable<Order> query = await _orderRepository.GetAllAsync(
                filter: predicate,
                orderBy: que => filter.Ascending == false
                                    ? que.OrderByDescending(order => order.OrderDate)
                                    : que.OrderBy(order => order.OrderDate),
                includeProperties: "ShippingAddress,OrderDetails,OrderDetails.Product,OrderDetails.Product.Category");

            return PagedList<OrderResponseModel>.ToPagedList(
                query.Select(entity => new OrderResponseModel(entity)),
                filter.PageNumber,
                filter.PageSize);
        }

        //public User GetStoreManager(string storeCode)
        //{
        //    var values = _userRepository.GetStoreManager(storeCode);
        //    return values;
        //}

        //public User GetUserBasicInfor(int id)
        //{
        //    var values = _userRepository.CheckUserBasicInfor(id);
        //    return values;
        //}

        //public bool Add(User user)
        //{
        //    try
        //    {
        //        var abc = user;
        //        _userRepository.CreateLocalUser(user);

        //        _userRepository.SaveDbChange();
        //        return true;
        //    }
        //    catch { return false; }
        //}

        //public bool Update(User user)
        //{
        //    try
        //    {
        //        _userRepository.UpdateUser(user);
        //        _userRepository.SaveDbChange();
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}

        //public int UpdatePassword(int userId, string currentPassword, string newPassword)
        //{
        //    try
        //    {
        //        var values = _userRepository.UpdatePassword(userId, currentPassword, newPassword);
        //        _userRepository.SaveDbChange();
        //        return values;
        //    }
        //    catch
        //    {
        //        return -2;
        //    }
        //}
    }
}
