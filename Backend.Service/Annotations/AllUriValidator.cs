using System.ComponentModel.DataAnnotations;
using Backend.Service.Entities.Poco;

namespace Backend.Service.Annotations
{
    public class AllUriValidator : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            var list = value as IEnumerable<Media>;
            if (list == null) 
                return false;

            return list.All(item =>
            {
                Uri uriResult;
                bool result = Uri.TryCreate(item.Url, UriKind.Absolute, out uriResult)
                    && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
                return result;
            });
        }
    }
}
