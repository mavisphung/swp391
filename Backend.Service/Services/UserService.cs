using Backend.Service.Entities;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        //private readonly ApplicationDbContext _context;
        public UserService(
            IUserRepository userRepository
            //ApplicationDbContext context
        )
        {
            _userRepository = userRepository;
            //_context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _userRepository.GetAll();
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
