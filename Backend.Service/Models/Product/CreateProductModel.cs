﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Backend.Service.Consts;
using Backend.Service.Entities;

namespace Backend.Service.Models.Product
{
    public class CreateProductModel
    {

        [Required(ErrorMessage = "This field is required")]
        [MaxLength(256)]
        public string Name { get; set; } = null!;

        public IEnumerable<string>? Images { get; set; } = null!;
        public string? Description { get; set; }

        [Range(0.0, double.MaxValue, ErrorMessage = "The field {0} must be greater than {1}.")]
        public double Price { get; set; } = 0.0;

        [Range(0, int.MaxValue, ErrorMessage = "The field {0} must be greater than {1}.")]
        public int Quantity { get; set; } = 0;

        public int CategoryId { get; set; }


        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}