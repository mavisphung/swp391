using System;
using System.Collections.Generic;

namespace Backend.Service.Entities
{
    public partial class Category
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string CategoryType { get; set; } = null!;
    }
}
