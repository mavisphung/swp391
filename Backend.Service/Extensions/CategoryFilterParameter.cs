using System.ComponentModel.DataAnnotations;
using Backend.Service.Consts;
using Backend.Service.Helper;

namespace Backend.Service.Extensions
{
    public class CategoryFilterParameter : FilterParameter
    {
        [EnumDataType(typeof(CategoryType))]
        public CategoryType? CategoryType { get; set; }
    }
}
