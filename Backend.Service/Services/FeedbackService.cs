using System.Net;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Entities.Poco;
using Backend.Service.Exceptions;
using Backend.Service.Models.Feedback;
using Backend.Service.Repositories.IRepositories;

namespace Backend.Service.Services
{
    public class FeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly ILogger<FeedbackService> _logger;

        public FeedbackService(
            IFeedbackRepository feedbackRepository, 
            ILogger<FeedbackService> logger)
        {
            _feedbackRepository = feedbackRepository;
            _logger = logger;
        }

        public async Task CreateFeedbackAsync(CreateFeedbackModel model)
        {
            Feedback entity = new()
            {
                OwnerId = model.OwnerId,
                ProductId = model.ProductId,
                OrderId = model.OrderId,
                Medias = model.Medias ?? new HashSet<Media>(),
                Point = model.Point,
                Content = model.Content ?? string.Empty
            };
            try
            {
                await _feedbackRepository.AddAsync(entity);
                await _feedbackRepository.SaveDbChangeAsync();
            } catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new BaseException(
                    BaseError.CONFLICT_DATA.ToString(),
                    StatusCodes.Status409Conflict,
                    HttpStatusCode.Conflict);
            }
        }
    }
}
