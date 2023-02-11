namespace Backend.Service.Entities
{
    public class CartItem : BaseEntity
    {
        public int Quantity { get; set; } = 1;

        // ItemPrice = CartItem.Quantity * Product.Price
        public double ItemPrice { get; set; }

        public bool IsPicked { get; set; } = true;

        // foreign key
        public int CartId { get; set; }
        public virtual Cart Cart { get; set; }


        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
