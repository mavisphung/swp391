using System.Reflection;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Extensions;
using Backend.Service.Helper;
using Backend.Service.Models.Product;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;

namespace Backend.Service.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ILogger<ProductService> _logger;
        public ProductService(
            IProductRepository productRepository, 
            ILogger<ProductService> logger)
        {
            _productRepository = productRepository;
            _logger = logger;
        }

        public async Task<PagedList<ProductResponseModel>> GetAllAsync(FilterParameter pagingParameter)
        {
            IEnumerable<Product> query = await _productRepository.GetAllAsync(
                filter: p => !p.IsDeleted,
                includeProperties: "Category");

            return PagedList<ProductResponseModel>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id).Select(entity => new ProductResponseModel(entity)),
                pagingParameter.PageNumber,
                pagingParameter.PageSize);
        }

        internal async Task<ProductResponseModel> AddAsync(CreateProductModel model)
        {
            var product = new Product()
            {
                Name = model.Name,
                Description = model.Description ?? string.Empty,
                Price = model.Price,
                Quantity = model.Quantity,
                ImportQuantity = model.Quantity,
                Images = StringExtension.ToImages(model.Images ?? new List<string>()),
                CategoryId = model.CategoryId,
            };

            try
            {
                _logger.LogInformation("ProductRepository: AddAsync invoked");
                await _productRepository.AddAsync(product);
                await _productRepository.SaveDbChangeAsync();
            } catch(Exception _)
            {
                _logger.LogInformation("ProductRepository: AddAsync | Error while saving");
                throw new NotFoundException(BaseError.CATEGORY_NOT_FOUND.ToString());
            }
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
                Console.WriteLine($"{prop.Name}: {prop.GetValue(model)}");
                Console.WriteLine($"{prop.GetValue(model) is double}");
                object? value = prop.GetValue(model);
                bool isMatched = found.GetType().GetProperties().Where(pi => pi.Name == prop.Name).Any();
                if (isMatched)
                {
                    if (prop.Name.Equals("Images"))
                    {
                        found.GetType().GetProperty("Images")?.SetValue(found, StringExtension.ToImages((IEnumerable<string>)value));
                    } else
                    {
                        found.GetType().GetProperty(prop.Name)?.SetValue(found, value);
                    }
                }
            }
            
            _productRepository.Update(found);
            await _productRepository.SaveDbChangeAsync();
            _logger.LogInformation($"Updated product {id} successfully");
            _logger.LogInformation($"New Category: {found.Category.Id}");
            return new ProductResponseModel(found);
        }
    }
}
