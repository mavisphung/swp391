namespace Backend.Service.Entities
{
    public class Cart : BaseEntity
    {
        public decimal TotalPrice { get; set; }

        // Foreign key
        public int OwnerId { get; set; }
        public virtual User? Owner { get; set; }
    }
}
