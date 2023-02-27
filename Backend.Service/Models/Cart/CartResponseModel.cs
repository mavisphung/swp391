namespace Backend.Service.Models.Cart
{
    public class CartResponseModel : BaseModel<Entities.Cart>
    {
        public decimal TotalPrice { get; set; }

        public IEnumerable<CartItemRM> Items { get; set; }

        public CartResponseModel(Entities.Cart entity) : base(entity)
        {
            Id = entity.Id;
            TotalPrice = entity.TotalPrice;
            Items = entity.CartItems.Count != 0 
                ? entity.CartItems.Select(item => new CartItemRM(item)).ToList() 
                : new List<CartItemRM>();
        }

    }
}
