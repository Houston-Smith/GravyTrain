using System.Collections.Generic;

namespace GravyTrain.Models
{
    public class TagReview
    {
        public Review Review { get; set; }
        public List<Tag> Tags { get; set; }
    }
}
