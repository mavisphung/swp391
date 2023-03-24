using Backend.Service.Models.Feedback;
using Backend.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Controllers
{
    [Route("api/feedback")]
    [ApiController]
    public class FeedbackController : PagedController
    {
        private readonly FeedbackService _feedbackService;
        public FeedbackController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        //public FeedbackController()
        //{
        //    _feedbackService = new FeedbackService();
        //}

        [HttpPost]
        public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedbackModel model)
        {
            await _feedbackService.CreateFeedbackAsync(model);
            return Created("", null);
        }


    }
}
