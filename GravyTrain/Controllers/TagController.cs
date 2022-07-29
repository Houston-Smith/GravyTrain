using GravyTrain.Models;
using GravyTrain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace GravyTrain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : Controller
    {
        private readonly ITagRepository _TagRepository;

        public TagController(ITagRepository tagRepository)
        {
            ;
            _TagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Tag> tags = _TagRepository.GetAllTags();

            if (tags == null)
            {
                return NotFound();
            }

            return Ok(tags);
        }

        [HttpGet("User/{reviewId}")]
        public IActionResult GetByReviewId(int reviewId)
        {

            List<Tag> tags = _TagRepository.GetTagsByReviewId(reviewId);

            if (tags == null)
            {
                return NotFound();
            }

            return Ok(tags);
        }

        [HttpPost("TagReviews")]
        public IActionResult Post(List<TagReview> tagReviews)
        {            
            _TagRepository.AddTagReviews(tagReviews);
            return NoContent();
        }

        [HttpDelete("TagReview/{reviewId}")]
        public IActionResult Delete(int reviewId)
        {
            _TagRepository.DeleteTagReviewsByReviewId(reviewId);
            return NoContent();
        }
    }
}