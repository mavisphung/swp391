using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace Backend.Service.Annotations
{
    public class RequiredCollection : ValidationAttribute
    {
        public override bool IsValid(object value) => value is ICollection list && list.Count > 0;
    }
}
