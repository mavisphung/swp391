using System.ComponentModel.DataAnnotations;
using Backend.Service.Consts;

namespace Backend.Service.Helper
{
    public class ProductFilterParameter : FilterParameter
    {
        public int? CategoryId { get; set; }

        [EnumDataType(typeof(CategoryType))]
        public CategoryType? CategoryType { get; set; }
    }
}
