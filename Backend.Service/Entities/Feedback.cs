using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Service.Entities.Poco;

namespace Backend.Service.Entities
{
    public class Feedback : BaseEntity
    {

        [Column(TypeName = "jsonb")]
        public ICollection<Media> Medias { get; set; } = new List<Media>();

        [Column(TypeName = "text")]
        public string Content { get; set; } = string.Empty;

        [Range(0, 5)]
        public int Point { get; set; }

        #region Relationships
        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        #endregion
    }
}
