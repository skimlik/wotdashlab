using System;
using System.Collections.Generic;

namespace WotDashLab.Services
{
    public static class CollectionExtensions
    {
        public static string ToCommaSeparatedList<T>(this IEnumerable<T> source)
        {
            return string.Join(",", source ?? ArraySegment<T>.Empty);
        }
    }
}