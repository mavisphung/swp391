using System.Collections;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.Json;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Extensions;
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

        public PagedList<CategoryResponseModel> GetAll(CategoryFilterParameter filter)
        {
            //var removeDiacritics = filter.Search.RemoveDiacritics();
            //Console.WriteLine($"Sau khi bỏ dấu: {removeDiacritics}");
            var predicate = PredicateBuilder.New<Category>().And(cat => !cat.IsDeleted);

            if (!string.IsNullOrEmpty(filter.Search))
            {
                predicate = predicate.And(cat => cat.SearchVector.Matches(filter.Search));
            }

            if (filter.CategoryType != null) 
            {
                predicate = predicate.And(cat => cat.CategoryType == filter.CategoryType);
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
                Image = model.Image,
                RelativeCategories = model.RelativeCategories,
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

        public async Task<CategoryResponseModel> UpdateCategory(int id, UpdateCategoryModel model)
        {
            var found = await _cateRepository.GetAsync(id);
            if (found == null)
                throw new NotFoundException();

            Type updateModel = model.GetType();
            IEnumerable<PropertyInfo> props = new List<PropertyInfo>(updateModel.GetProperties());

            foreach (PropertyInfo prop in props)
            {
                object? value = prop.GetValue(model);
                bool isMatched = found.GetType().GetProperties().Where(pi => pi.Name == prop.Name).Any();

                if (!isMatched || value == null) continue;

                found.GetType().GetProperty(prop.Name)?.SetValue(found, value);
            }

            _cateRepository.Update(found);
            _cateRepository.SaveDbChange();
            return new CategoryResponseModel(found);
        }

        internal async IAsyncEnumerable<CategoryResponseModel> GetAllAsync(FilterParameter filter)
        {
            var predicate = PredicateBuilder.New<Category>().And(cat => !cat.IsDeleted);

            if (!string.IsNullOrEmpty(filter.Search))
            {
                predicate = predicate.And(cat => cat.SearchVector.Matches(filter.Search));
            }

            var data = await _cateRepository.GetAllAsync(predicate);
            foreach (var item in data)
            {
                yield return new CategoryResponseModel(item);
            }
        }

        internal async Task<PagedList<CategoryResponseModel>> GetRelativeCategories(int categoryId, FilterParameter filter)
        {
            Category found = await _cateRepository.GetAsync(categoryId);
            var relativesSet = found.RelativeCategories?.ToHashSet() ?? new HashSet<int>();
            IEnumerable<Category> relatives = await _cateRepository.GetAllAsync(cate => relativesSet.Contains(cate.Id));
            return PagedList<CategoryResponseModel>.ToPagedList(
                relatives.Select(cate => new CategoryResponseModel(cate)).ToList(),
                filter.PageNumber, 
                filter.PageSize);
        }
    }
}
