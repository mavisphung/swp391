using Backend.Service.Entities;
using Backend.Service.Helper;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;

namespace Backend.Service.Services
{
    public class CategoryService
    {
        private readonly ICategoryRepository _cateRepository;
        public CategoryService(ICategoryRepository cateRepository)
        {
            _cateRepository = cateRepository;
        }

        public PagedList<Category> GetAll(PagingParameter pagingParameter)
        {
            IEnumerable<Category> query = _cateRepository.GetAll();
            return PagedList<Category>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id),
                pagingParameter.PageNumber,
                pagingParameter.PageSize);
        }
    }
}
