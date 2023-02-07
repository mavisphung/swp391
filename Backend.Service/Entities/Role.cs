
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Service.Entities
{
    [Table("Roles")]
    public partial class Role : BaseEntity
    {
        public string Name { get; set; } = null!;

        public ICollection<User> Users { get; set; }
    }
}
