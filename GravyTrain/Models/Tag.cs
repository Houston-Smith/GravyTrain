using System;
using System.ComponentModel.DataAnnotations;

    namespace GravyTrain.Models
    {
        public class Tag
        {
            public int Id { get; set; }

            [Required]
            [MaxLength(50)]
            public string Name { get; set; }

        }
    }
