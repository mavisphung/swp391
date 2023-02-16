using Backend.Service.Models.Product;

namespace Backend.Service.Models.Cart
{
    public class CartItemRM : BaseModel<Entities.CartItem>
    {
        public int Quantity { get; set; }
        public double ItemPrice { get; set; }
        public bool IsPicked { get; set; }
        public ProductResponseModel Product { get; set; }
        public int CartId { get; set; }


        public CartItemRM(Entities.CartItem entity) : base(entity) 
        {
            Quantity = entity.Quantity;
            ItemPrice = entity.ItemPrice;
            IsPicked = entity.IsPicked;
            CartId = entity.CartId;
            Product = new ProductResponseModel(entity.Product);
        }
    }
}
