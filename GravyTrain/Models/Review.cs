using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

    namespace GravyTrain.Models
    {
        public class Review
        {
            public int Id { get; set; }

            [Required]
            [MaxLength(50)]
            public string LocationName { get; set; }

            [Required]
            public string LocationAddress { get; set; }

        [Required]
            public DateTime DateReviewed { get; set; }

            [Required]
            public int ButteryScore { get; set; }

            [Required]
            public int FlakeyScore { get; set; }
            
            [Required]
            public int GravyScore { get; set; }

            [Required]
            public int FlavorScore { get; set; }

            [Required]
            public int DeliveryScore { get; set; }

            [Required]
            public int AverageScore { get; set; }

            [Required]
            public string Notes { get; set; }

            [Required]
            public string GravyType { get; set; }

            [Required]
            public int UserProfileId { get; set; }

            public List<Tag> Tags { get; set; }
        }
    }
