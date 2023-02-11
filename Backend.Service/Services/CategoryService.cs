using System.Linq.Expressions;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Helper;
using Backend.Service.Models.Category;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using Diacritics.Extensions;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class CategoryService
    {
        private readonly ICategoryRepository _cateRepository;
        public CategoryService(ICategoryRepository cateRepository)
        {
            _cateRepository = cateRepository;
        }

        public PagedList<CategoryResponseModel> GetAll(FilterParameter filter)
        {
            //var removeDiacritics = filter.Search.RemoveDiacritics();
            //Console.WriteLine($"Sau khi bỏ dấu: {removeDiacritics}");
            var predicate = PredicateBuilder.New<Category>().And(cat => !cat.IsDeleted);

            if (!string.IsNullOrEmpty(filter.Search))
            {
                predicate = predicate.And(cat => cat.SearchVector.Matches(filter.Search));
            }

            IEnumerable<Category> categories = _cateRepository.GetAll(predicate);
            var pagedList = PagedList<CategoryResponseModel>.ToPagedList(
                categories.AsQueryable().OrderBy(u => u.Id).Select(cate => new CategoryResponseModel(cate)),
                filter.PageNumber,
                filter.PageSize);
            return pagedList;
        }

        public async Task<CategoryResponseModel> CreateAsync(CreateCategoryModel model)
        {
            var category = new Category
            {
                Name = model.Name,
                Description = model.Description,
                CategoryType = model.CategoryType,
            };
            await _cateRepository.AddAsync(category);
            await _cateRepository.SaveDbChangeAsync();
            return new CategoryResponseModel(category);

        }

        public async Task<CategoryResponseModel> GetCategoryByIdAsync(int id)
        {
            var category = await _cateRepository.GetAsync(id);
            if (category == null)
                throw new NotFoundException();
            return new CategoryResponseModel(category);
        }

        public void Remove(int id)
        {
            _cateRepository.Remove(id);
            _cateRepository.SaveDbChange();
        }

        public async Task<CategoryResponseModel> UpdateCategory(int id, CreateCategoryModel model)
        {
            var found = await _cateRepository.GetAsync(id);
            if (found == null)
                throw new NotFoundException();

            found.Name = found.Name.Equals(model.Name) ? found.Name : model.Name;
            found.Description = model.Description ?? found.Description;
            found.CategoryType = found.CategoryType == model.CategoryType ? found.CategoryType : model.CategoryType;
            _cateRepository.Update(found);
            _cateRepository.SaveDbChange();
            return new CategoryResponseModel(found);
        }
    }
}
