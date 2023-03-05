using System.Linq.Expressions;
using System.Reflection;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Entities.Poco;
using Backend.Service.Exceptions;
using Backend.Service.Extensions;
using Backend.Service.Helper;
using Backend.Service.Models.Product;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ILogger<ProductService> _logger;
        public ProductService(
            IProductRepository productRepository,
            ILogger<ProductService> logger,
            ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _logger = logger;
            _categoryRepository = categoryRepository;
        }

        private Expression<Func<Product, bool>> _buildExpression(ProductFilterParameter filter)
        {
            var predicate = PredicateBuilder.New<Product>().And(product => !product.IsDeleted);

            if (filter.CategoryId.GetValueOrDefault() != 0)
            {
                predicate = predicate.And(product => product.CategoryId == filter.CategoryId);
            }

            if (!string.IsNullOrEmpty(filter.Search))
            {
                predicate = predicate.And(product => product.SearchVector.Matches(filter.Search));
            }

            if (filter.CategoryType.HasValue)
            {
                Console.WriteLine("CategoryType has value");
                predicate = predicate.And(product => product.Category.CategoryType == filter.CategoryType.Value);
            }

            if (filter.Status.HasValue)
            {
                predicate = predicate.And(product => product.Status == filter.Status.Value);
            }

            if (filter.FromPrice.HasValue)
            {
                predicate = predicate.And(product => product.Price >= filter.FromPrice.Value);
            }

            if (filter.ToPrice.HasValue)
            {
                predicate = predicate.And(product => product.Price <= filter.ToPrice.Value);
            }

            if (filter.FromDate != null)
            {
                predicate = predicate.And(product => product.CreatedDate >= filter.FromDate.SetKindUtc());
            }

            if (filter.ToDate != null)
            {
                predicate = predicate.And(product => product.CreatedDate <= filter.ToDate.SetKindUtc());
            }

            return predicate;
        }

        public async Task<PagedList<ProductResponseModel>> GetAllAsync(ProductFilterParameter filter)
        {
            var predicate = _buildExpression(filter);
            IEnumerable<Product> query = await _productRepository.GetAllAsync(
                filter: predicate,
                includeProperties: "Category");

            return PagedList<ProductResponseModel>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id).Select(entity => new ProductResponseModel(entity)),
                filter.PageNumber,
                filter.PageSize);
        }

        internal async Task<ProductResponseModel> AddAsync(CreateProductModel model)
        {
            Category category = await _categoryRepository.GetAsync(model.CategoryId);

            var product = new Product()
            {
                Name = model.Name,
                Description = model.Description ?? string.Empty,
                ShortDescription = model.ShortDescription ?? string.Empty,
                Price = model.Price,
                Quantity = model.Quantity,
                ImportQuantity = model.Quantity,
                Medias = model.Medias ?? new List<Media>(),
                CategoryId = category.Id,
                Category = category,
                Gender = model.Gender ?? true,
                Age = model.Age
            };

            try
            {
                _logger.LogInformation("ProductRepository: AddAsync invoked");
                await _productRepository.AddAsync(product);
                await _productRepository.SaveDbChangeAsync();
            }
            catch (Exception _)
            {
                _logger.LogInformation("ProductRepository: AddAsync | Error while saving");
                throw new NotFoundException(BaseError.CATEGORY_NOT_FOUND.ToString());
            }
            _logger.LogInformation($"---------------------------------------------------------------");
            _logger.LogInformation($"Product.Category: {product.Category}");
            return new ProductResponseModel(product);
        }

        internal async Task<ProductResponseModel> GetProductByIdAsync(int id)
        {
            var found = await _productRepository.GetAsync(id);
            return new ProductResponseModel(found);
        }

        internal async Task RemoveAsync(int id)
        {
            _productRepository.Remove(id);
            await _productRepository.SaveDbChangeAsync();
        }

        internal async Task<ProductResponseModel> UpdateProduct(int id, UpdateProductModel model)
        {
            var found = await _productRepository.GetAsync(id);
            Type updateModel = model.GetType();
            IEnumerable<PropertyInfo> props = new List<PropertyInfo>(updateModel.GetProperties());

            foreach (PropertyInfo prop in props)
            {
                object? value = prop.GetValue(model);
                bool isMatched = found.GetType().GetProperties().Where(pi => pi.Name == prop.Name).Any();

                if (!isMatched || value == null) continue;

                found.GetType().GetProperty(prop.Name)?.SetValue(found, value);
            }

            //_productRepository.Update(found);
            //await _productRepository.SaveDbChangeAsync();
            _logger.LogInformation($"Updated product {id} successfully");
            return new ProductResponseModel(found);
        }

        internal async Task<PagedList<ProductResponseModel>> GetRelativeProductsAsync(
            int productId, 
            FilterParameter filter)
        {
            var product = await _productRepository.GetAsync(productId);
            var relatedCategories = product.Category.RelativeCategories?.ToList();
            var relatedProducts = await _productRepository.GetAllAsync(
                prod => relatedCategories!.Contains(prod.CategoryId));
            
            return PagedList<ProductResponseModel>.ToPagedList(
                relatedProducts.Select(p => new ProductResponseModel(p)),
                filter.PageNumber,
                filter.PageSize);
        }
    }
}
