using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Backend.Service.Consts;

namespace Backend.Service.Helper
{
    public class OrderFilterParameter : FilterParameter
    {
        public OrderStatus? OrderStatus { get; set; }

        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public bool? Ascending { get; set; }
        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }

    public class OrderHistoryParameter : OrderFilterParameter
    {
        public int? UserId { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
