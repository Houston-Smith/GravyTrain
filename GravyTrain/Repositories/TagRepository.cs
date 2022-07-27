using GravyTrain.Models;
using GravyTrain.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GravyTrain.Repositories
{
    public class TagRepository:  BaseRepository, ITagRepository
    {
        public TagRepository (IConfiguration configuration) : base(configuration) { }
        public List<Tag> GetAllTags()
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                             SELECT Id, Name
                             FROM Tag
                             ";
                        var reader = cmd.ExecuteReader();
                        var tags = new List<Tag>();

                        while (reader.Read())
                        {
                            tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            });
                        }

                        reader.Close();
                        return tags;
                    }
                }
            }

        public List<Tag> GetTagsByReviewId(int reviewId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS TagId, t.Name
                        FROM TagReview tr
                        LEFT JOIN Tag t ON tr.TagId = t.Id
                        where tr.ReviewId = @ReviewId
                    ";

                    DbUtils.AddParameter(cmd, "@ReviewId", reviewId);
                    var reader = cmd.ExecuteReader();
                    var tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "TagId"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();
                    return tags;
                }
            }
        }
    }
    
}
