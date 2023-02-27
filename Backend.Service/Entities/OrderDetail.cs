using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Backend.Service.Entities
{
    [Table("OrderDetail")]
    public class OrderDetail : BaseEntity
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        
        // foreign key
        public int? CustomerId { get; set; }
        public virtual User Customer { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }

        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
