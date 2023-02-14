using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Service.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
        public string UpdatedBy { get; set; } = "System";
        public string AddedBy { get; set; } = "System";
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;
    }
}
