using System.ComponentModel.DataAnnotations;

namespace Backend.Service.Annotations
{
    public class AllUriValidator : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            var list = value as IEnumerable<string>;
            if (list == null) 
                return false;

            return list.All(item =>
            {
                Uri uriResult;
                bool result = Uri.TryCreate(item, UriKind.Absolute, out uriResult)
                    && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
                return result;
            });
        }
    }
}
