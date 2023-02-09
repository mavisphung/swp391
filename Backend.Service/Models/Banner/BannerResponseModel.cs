namespace Backend.Service.Models.Banner
{
    public class BannerResponseModel : BaseModel<Entities.Banner>
    {
        public string Name { get; set; } = null!;

        public string Image { get; set; } = null!;

        public BannerResponseModel(Entities.Banner entity): base(entity) 
        {
            Name = entity.Name;
            Image = entity.Image;
        }
    }
}
