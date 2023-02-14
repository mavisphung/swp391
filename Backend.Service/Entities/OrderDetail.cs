using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Service.Entities
{
    [Table("OrderDetail")]
    public class OrderDetail : BaseEntity
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        
        // foreign key
        public int CustomerId { get; set; }
        public User Customer { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

    }
}
