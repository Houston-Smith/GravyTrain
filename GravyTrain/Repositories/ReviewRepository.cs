using Microsoft.Extensions.Configuration;
using GravyTrain.Models;
using GravyTrain.Utils;
using System.Collections.Generic;

namespace GravyTrain.Repositories
{
    public class ReviewRepository : BaseRepository, IReviewRepository
    {
        public ReviewRepository(IConfiguration configuration) : base(configuration) { }

        public List<Review> GetAllReviews()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, LocationName, ButteryScore, FlakeyScore, GravyScore, FlavorScore, DeliveryScore, AverageScore, Notes, UserProfileId
                         FROM Review
                         ";
                    var reader = cmd.ExecuteReader();
                    var reviews = new List<Review>();

                    while (reader.Read())
                    {
                        reviews.Add(new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            LocationName = DbUtils.GetString(reader, "LocationName"),
                            ButteryScore = DbUtils.GetInt(reader, "ButteryScore"),
                            FlakeyScore = DbUtils.GetInt(reader, "FlakeyScore"),
                            GravyScore = DbUtils.GetInt(reader, "GravyScore"),
                            FlavorScore = DbUtils.GetInt(reader, "FlavorScore"),
                            DeliveryScore = DbUtils.GetInt(reader, "DeliveryScore"),
                            AverageScore = DbUtils.GetInt(reader, "AverageScore"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                        });
                    }

                    reader.Close();
                    return reviews;
                }
            }
        }

        public Review GetReviewById(int reviewId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, LocationName, ButteryScore, FlakeyScore, GravyScore, FlavorScore, DeliveryScore, AverageScore, Notes, UserProfileId
                        FROM Review
                        WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", reviewId);
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Review review = new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            LocationName = DbUtils.GetString(reader, "LocationName"),
                            ButteryScore = DbUtils.GetInt(reader, "ButteryScore"),
                            FlakeyScore = DbUtils.GetInt(reader, "FlakeyScore"),
                            GravyScore = DbUtils.GetInt(reader, "GravyScore"),
                            FlavorScore = DbUtils.GetInt(reader, "FlavorScore"),
                            DeliveryScore = DbUtils.GetInt(reader, "DeliveryScore"),
                            AverageScore = DbUtils.GetInt(reader, "AverageScore"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                        };
                        reader.Close();
                        return review;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }

        public void Add(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (LocationName, ButteryScore, FlakeyScore, GravyScore, FlavorScore, 
                                        DeliveryScore, AverageScore, Notes, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@LocationName, @ButteryScore, @FlakeyScore, @GravyScore, 
                                                @FlavorScore, @DeliveryScore, @AverageScore, @Notes, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@LocationName", review.LocationName);
                    DbUtils.AddParameter(cmd, "@ButteryScore", review.ButteryScore);
                    DbUtils.AddParameter(cmd, "@FlakeyScore", review.FlakeyScore);
                    DbUtils.AddParameter(cmd, "@GravyScore", review.GravyScore);
                    DbUtils.AddParameter(cmd, "@FlavorScore", review.FlavorScore);
                    DbUtils.AddParameter(cmd, "@DeliveryScore", review.FlavorScore);
                    DbUtils.AddParameter(cmd, "@AverageScore", review.AverageScore);
                    DbUtils.AddParameter(cmd, "@Notes", review.Notes);
                    DbUtils.AddParameter(cmd, "@UserProfileId", review.UserProfileId);

                    review.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Review
                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", review.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Review WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }

    }
}
