using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Backend.Service.Consts;

namespace Backend.Service.Entities
{
    public partial class Category : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        //[Required]
        //[MaxLength(25)]
        public CategoryType CategoryType { get; set; } = CategoryType.Other;

        public ICollection<Product> Products { get; set; }
    }
}
