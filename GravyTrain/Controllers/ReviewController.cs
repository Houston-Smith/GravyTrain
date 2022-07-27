using GravyTrain.Models;
using GravyTrain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GravyTrain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : Controller
    {
        private readonly IReviewRepository _ReviewRepository;

        public ReviewController(IReviewRepository reviewRepository)
        {
            _ReviewRepository = reviewRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ReviewRepository.GetAllReviews());
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var review = _ReviewRepository.GetReviewById(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }




        [HttpGet("User/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            var review = _ReviewRepository.GetReviewsByUserId(userId);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
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
    }
}
