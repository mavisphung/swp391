using Backend.Service.Entities;
using Backend.Service.Helper;
using Backend.Service.Models.Banner;
using Backend.Service.Models.Product;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class BannerService
    {
        private readonly IBannerRepository _bannerRepository;
        private readonly ILogger<BannerService> _logger;
        public BannerService(
            IBannerRepository bannerRepository, ILogger<BannerService> logger)
        {
            _bannerRepository = bannerRepository;
            _logger = logger;
        }

        internal async Task<BannerResponseModel> AddAsync(CreateBannerModel model)
        {
            var banner = new Banner()
            {
                Name = model.Name,
                Image = model.Image,
            };

            await _bannerRepository.AddAsync(banner);
            await _bannerRepository.SaveDbChangeAsync();
            return new BannerResponseModel(banner);
        }

        internal async Task<PagedList<BannerResponseModel>> GetAllAsync(FilterParameter filter)
        {
            _logger.LogInformation("Get all banner...");
            Console.WriteLine(filter.ToString());
            var predicate = PredicateBuilder.New<Banner>().And(banner => !banner.IsDeleted);

            if (!string.IsNullOrEmpty(filter.Search))
            {
                predicate = predicate.And(banner => banner.SearchVector.Matches(filter.Search));
            }

            IEnumerable<Banner> query = await _bannerRepository.GetAllAsync(filter: predicate);

            return PagedList<BannerResponseModel>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id).Select(entity => new BannerResponseModel(entity)),
                filter.PageNumber,
                filter.PageSize);
        }

        internal async Task<BannerResponseModel> GetAsync(int id)
        {
            var found = await _bannerRepository.GetAsync(id);
            return new BannerResponseModel(found);
        }

        internal async Task RemoveAsync(int id)
        {
            _bannerRepository.Remove(id);
            await _bannerRepository.SaveDbChangeAsync();
        }
    }
}
