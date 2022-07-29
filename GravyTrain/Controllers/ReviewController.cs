using GravyTrain.Models;
using GravyTrain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace GravyTrain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : Controller
    {
        private readonly IReviewRepository _ReviewRepository;
        private readonly ITagRepository _TagRepository;
        private readonly IUserProfileRepository _UserProfileRepository;

        public ReviewController(IReviewRepository reviewRepository, ITagRepository tagRepository, IUserProfileRepository userProfileRepository)
        {
            _ReviewRepository = reviewRepository;
            _TagRepository = tagRepository;
            _UserProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Review> reviews = _ReviewRepository.GetAllReviews();

            if (reviews == null)
            {
                return NotFound();
            }

            return Ok(reviews);
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Review review = _ReviewRepository.GetReviewById(id);
           
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }




        [HttpGet("User/{userId}")]
        public IActionResult GetByUserId()
        {

            UserProfile user = GetCurrentUserProfile();

            List<Review> reviews = _ReviewRepository.GetReviewsByUserId(user.Id);

            foreach (Review review in reviews)
            {
                List<Tag> tags = _TagRepository.GetTagsByReviewId(review.Id);
                review.Tags = tags;
            }

            if (reviews == null)
            {
                return NotFound();
            }

            return Ok(reviews);
        }


        [HttpPost]
        public IActionResult Post(Review review)
        {
            review.DateReviewed = DateTime.Now;
            _ReviewRepository.Add(review);
            return CreatedAtAction("Get", new { id = review.Id }, review);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            _ReviewRepository.Update(review);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ReviewRepository.Delete(id);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _UserProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
