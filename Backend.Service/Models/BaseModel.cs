using Backend.Service.Entities;

namespace Backend.Service.Models
{
    public class BaseModel<T> where T : BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string AddedBy { get; set; }
        public bool IsDeleted { get; set; }

        public BaseModel()
        {
        }

        public BaseModel(T entity)
        {
            Id = entity.Id;
            CreatedDate = entity.CreatedDate;
            UpdatedDate = entity.UpdatedDate;
            UpdatedBy = entity.UpdatedBy;
            AddedBy = entity.AddedBy;
            IsDeleted = entity.IsDeleted;
        }

        public BaseModel(int id, DateTime createdDate, DateTime updatedDate, string updatedBy, string addedBy, bool isDeleted)
        {
            Id = id;
            CreatedDate = createdDate;
            UpdatedDate = updatedDate;
            UpdatedBy = updatedBy;
            AddedBy = addedBy;
            IsDeleted = isDeleted;
        }
    }
}
