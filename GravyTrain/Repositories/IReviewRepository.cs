using GravyTrain.Models;
using System.Collections.Generic;

namespace GravyTrain.Repositories
{
    public interface IReviewRepository
    {
        void Add(Review review);
        void Delete(int id);
        List<Review> GetAllReviews();
        Review GetReviewById(int reviewId);
        List<Review> GetReviewsByUserId(int userId);
        void Update(Review review);
    }
}