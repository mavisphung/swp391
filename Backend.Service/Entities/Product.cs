using System.ComponentModel.DataAnnotations;
using Backend.Service.Consts;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Entities
{
    [Index(nameof(ProductCode), IsUnique = true)]
    public class Product : BaseEntity
    {
        public string Name { get; set; } = null!;
        public Guid ProductCode { get; set; } = Guid.NewGuid();
        public string Images { get; set; } = null!;
        public string? Description { get; set; }

        public double Price { get; set; } = 0.0;
        public int Quantity { get; set; } = 0;
        public int ImportQuantity { get; set; } = 0;

        // Đã thử bỏ cái này vào, vô dụng
        //[Required]
        //[MaxLength(25)]
        public ProductStatus Status { get; set; } = ProductStatus.OutOfStock;

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        
    }
}
