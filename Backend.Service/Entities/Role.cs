
namespace Backend.Service.Entities
{
    public partial class Role : BaseEntity
    {
        public string Name { get; set; } = null!;

        public ICollection<User> Users { get; set; }
    }
}
