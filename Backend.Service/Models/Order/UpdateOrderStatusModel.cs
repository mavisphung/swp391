using System.ComponentModel.DataAnnotations;
using Backend.Service.Consts;

namespace Backend.Service.Models.Order
{
    public class UpdateOrderStatusModel
    {
        [EnumDataType(typeof(OrderStatus))]
        public OrderStatus OrderStatus { get; set; }
    }
}
