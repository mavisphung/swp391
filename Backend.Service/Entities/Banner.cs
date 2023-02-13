using System.ComponentModel.DataAnnotations.Schema;
using NpgsqlTypes;

namespace Backend.Service.Entities
{
    public class Banner : BaseEntity
    {
        public string Name { get; set; } = null!;

        // text
        [Column(TypeName = "text")]
        public string Image { get; set; } = null!;


        // FTS
        public NpgsqlTsVector SearchVector { get; set; } = null!;
    }
}
