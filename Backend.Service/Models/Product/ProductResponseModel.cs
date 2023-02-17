using Backend.Service.Consts;
using Backend.Service.Entities.Poco;

namespace Backend.Service.Models.Product
{
    public class ProductResponseModel : BaseModel<Entities.Product>
    {
        public string Name { get; set; } = null!;
        public Guid ProductCode { get; set; }
        public ICollection<Media> Medias { get; set; } = new List<Media>();
        public string? Description { get; set; }

        public double Price { get; set; } = 0.0;
        public int Quantity { get; set; } = 0;
        public int ImportQuantity { get; set; } = 0;

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        // Đã thử bỏ cái này vào, vô dụng
        //[Required]
        //[MaxLength(25)]
        public ProductStatus Status { get; set; } = ProductStatus.OutOfStock;
        public CategoryType CategoryType { get; set; } = CategoryType.Other;

        public ProductResponseModel(Entities.Product entity) : base(entity)
        {
            Name = entity.Name;
            ProductCode = entity.ProductCode;
            Medias = entity.Medias;
            Description = entity.Description;
            Price = entity.Price;
            Quantity = entity.Quantity;
            Status = entity.Status;
            ImportQuantity = entity.ImportQuantity;
            CategoryType = entity.Category.CategoryType;
            CategoryId = entity.Category.Id;
            CategoryName = entity.Category.Name;
        }
    }
}
