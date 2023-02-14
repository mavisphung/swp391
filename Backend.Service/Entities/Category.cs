using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Service.Consts;
using NpgsqlTypes;

namespace Backend.Service.Entities
{
    [Table("Categories")]
    public partial class Category : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        //[Required]
        //[MaxLength(25)]
        public CategoryType CategoryType { get; set; } = CategoryType.Other;

        public virtual ICollection<Product> Products { get; set; }

        public NpgsqlTsVector SearchVector { get; set; }
    }
}
