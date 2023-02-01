using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Entities
{
    // Unique constraint
    [Index(nameof(Email), nameof(PhoneNumber), IsUnique = true)]
    public class ShippingAddress : BaseEntity
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public DateTime ShippingDate { get; set; } = DateTime.UtcNow;
        public DateTime ReceivedDate { get; set; } = DateTime.UtcNow;

        // Foreign key
        public int? ReceiverId { get; set; }
        public User Receiver { get; set; }
    }
}
