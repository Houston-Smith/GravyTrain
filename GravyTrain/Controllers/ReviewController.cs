using GravyTrain.Models;
using GravyTrain.Repositories;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult Get(int id)
        {
            var review = _ReviewRepository.GetReviewById(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }


        [HttpPost]
        public IActionResult Post(Review review)
        {
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
