using System.ComponentModel.DataAnnotations;
using Backend.Service.Annotations;
using Backend.Service.Entities.Poco;

namespace Backend.Service.Models.Feedback
{
    public class CreateFeedbackModel
    {
        [Range(0, int.MaxValue)]
        public int OwnerId { get; set; }

        [Range(0, int.MaxValue)]
        public int OrderId { get; set; }

        [Range(0, int.MaxValue)]
        public int ProductId { get; set; }

        [MaxLength(256)]
        public string? Content { get; set; }

        [Range(1, 5)]
        public int Point { get; set; }

        [AllUriValidator(ErrorMessage = "This field is invalid")]
        public ICollection<Media>? Medias { get; set; }
    }
}
