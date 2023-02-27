using System.ComponentModel.DataAnnotations;
using Backend.Service.Annotations;
using Backend.Service.Consts;

namespace Backend.Service.Helper
{
    public class ProductFilterParameter : FilterParameter
    {
        public int? CategoryId { get; set; }

        [EnumDataType(typeof(CategoryType))]
        public CategoryType? CategoryType { get; set; }

        [EnumDataType(typeof(ProductStatus))]
        public ProductStatus? Status { get; set; }

        [Range(0, double.MaxValue)]
        [NumericLessThan(nameof(ToPrice))]
        public double? FromPrice { get; set; }
        
        [Range(0, double.MaxValue)]
        public double? ToPrice { get; set; }
    }
}
