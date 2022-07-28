using GravyTrain.Models;
using GravyTrain.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GravyTrain.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        List<Tag> GetTagsByReviewId(int reviewId);
        void AddTagReviews(List<TagReview> tagReviews);
        void DeleteTagReviewsByReviewId(int reviewId);
    }
}
