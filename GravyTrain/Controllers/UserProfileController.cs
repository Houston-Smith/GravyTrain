using GravyTrain.Models;
using GravyTrain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GravyTrain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }



        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }



        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }



        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userProfileRepository.GetAllUsers());
        }



        [HttpGet("details/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var userProfile = _userProfileRepository.GetByUserId(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }



        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }



        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.UpdateUserProfile(user);
            return NoContent();
        }
    }
}
