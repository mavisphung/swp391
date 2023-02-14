using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Service.Consts;
using Backend.Service.Entities.Poco;
using Microsoft.EntityFrameworkCore;
using NpgsqlTypes;

namespace Backend.Service.Entities
{
    [Table("Products")]
    [Index(nameof(ProductCode), IsUnique = true)]
    public class Product : BaseEntity
    {
        public string Name { get; set; } = null!;
        public Guid ProductCode { get; set; } = Guid.NewGuid();

        [Column(TypeName = "jsonb")]
        public ICollection<Media> Medias { get; set; } = new List<Media>();

        [Column(TypeName = "text")]
        public string? Description { get; set; } = string.Empty;

        [Column(TypeName = "text")]
        public string? ShortDescription { get; set; } = string.Empty;

        public double Price { get; set; } = 0.0;
        public int Quantity { get; set; } = 0;
        public int ImportQuantity { get; set; } = 0;

        // Đã thử bỏ cái này vào, vô dụng
        //[Required]
        //[MaxLength(25)]
        public ProductStatus Status { get; set; } = ProductStatus.Available;

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        // FTS
        public NpgsqlTsVector SearchVector { get; set; }

        #region One to many relationships

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public virtual ICollection<CartItem> CartItems { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }
        #endregion
    }
}
