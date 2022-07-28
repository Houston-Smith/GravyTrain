using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GravyTrain.Models
{
    public class TagReview
    {
        public int Id { get; set; }

        [Required]
        public int ReviewId { get; set; }

        [Required]
        public int TagId { get; set; }
    }
}
