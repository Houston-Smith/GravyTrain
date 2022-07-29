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
      setReviews(reviews);
  }))};

  useEffect(() => {
    getReviews();
  }, []);

  const callDeleteReview = (id) => {
    deleteReview(id)
    .then(() => getReviews())
  };

  console.log(reviews)

  return (
    <main>
      <section className="review-box-outer-1">
        <section className="review-box-outer-2">
          <section className="review-box">
                <div>
                    {reviews.map(review => 
                        <div key={review.id}>
                            <p><b>{review.locationName}</b></p>  
                            <p>{review.averageScore}</p>                    
                            <p>{review.tags.map(tag =>
                              <li key={tag.id}>{tag.name}</li>
                              )}
                            </p>  

                            <div>
                              <button onClick={() => callDeleteReview(review.id)}>Delete Review</button>
                              <button onClick={() => {navigate(`/review/${review.id}/details`)}}>Review Details</button>
                              <button onClick={() => {navigate(`/review/${review.id}/edit`)}}>Edit Review</button>
                            </div>

                        </div>                        
                    )}
                </div>
            <button onClick={() => {navigate("/review/add")}}>Create Review</button>
          </section>
        </section>
      </section>
    </main>
)
}