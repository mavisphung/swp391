using Backend.Service.Entities;
using Backend.Service.Repositories.IRepositories;

namespace Backend.Service.Repositories
{
    public class FeedbackRepository : GeneralRepository<Feedback>, IFeedbackRepository
    {
        private readonly ApplicationDbContext _db;
        public FeedbackRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
