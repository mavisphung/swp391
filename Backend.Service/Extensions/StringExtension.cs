namespace Backend.Service.Extensions
{
    public static class StringExtension
    {
        public static string ToCamelCase(string str)
        {
            if (!string.IsNullOrEmpty(str) && str.Length > 1)
            {
                return char.ToLowerInvariant(str[0]) + str.Substring(1);
            }
            return str.ToLowerInvariant();
        }

        public static IEnumerable<string> ToArray(string str)
        {
            return str.Split(new char[] { ',' });
        }

        public static string ToImages(IEnumerable<string> values)
        {
            return string.Join(",", values);
        }
    }
}
