using System.ComponentModel.DataAnnotations;
using Backend.Service.Consts;

namespace Backend.Service.Models.Order
{
    public class UpdateOrderStatusModel
    {
        [EnumDataType(typeof(OrderStatus))]
        public OrderStatus OrderStatus { get; set; }

        public DateTime? EstimatedReceiveDate { get; set; }

        public int StaffACcountId { get; set; }

        public string? Reason { get; set; }
    }
}
