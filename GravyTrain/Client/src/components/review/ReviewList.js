import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getReviewByUserId, deleteReview} from "../../modules/reviewManager";
import { getLoggedInUser } from "../../modules/userManager";
import "./Review.css"

export const ReviewList = () => {
  
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate()

  const getReviews = () => {
    getLoggedInUser().then(user => getReviewByUserId(user.id).
      then(reviews => {
      console.log(user); console.log(reviews); setReviews(reviews);
  }))};

  useEffect(() => {
    getReviews();
  }, []);

  const callDeleteReview = (id) => {
    deleteReview(id)
    .then(() => getReviews())
  };

  return (
    <main>
      <section className="review-box-outer-1">
        <section className="review-box-outer-2">
          <section className="review-box">
            <Table>
                <thead>
                    <tr>
                        <th>Location Name</th>
                        <th>Average Score</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => 
                    <>
                        <tr>
                            <td>{review.locationName}</td>  
                            <td>{review.averageScore}</td>                    
                            <td>{review.tags.map(tag =>
                              <p>{tag.name}</p>
                              )}
                            <td>
                            <button onClick={() => callDeleteReview(review.id)}>Delete Review</button>
                            <button onClick={() => {navigate(`/review/${review.id}/details`)}}>Review Details</button>
                            <button onClick={() => {navigate(`/review/${review.id}/edit`)}}>Edit Review</button>
                            </td>
                            </td>
                        </tr>                        
                    </>
                    )}
                </tbody>
              </Table>
            <button onClick={() => {navigate("/review/add")}}>Create Review</button>
          </section>
        </section>
      </section>
    </main>
)
}