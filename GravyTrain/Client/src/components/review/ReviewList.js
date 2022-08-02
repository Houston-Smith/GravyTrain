import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getReviewByUserId, deleteReview} from "../../modules/reviewManager";
import { getLoggedInUser } from "../../modules/userManager";
import { ReviewCard } from "./ReviewCard";
import "./ReviewList.css"

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
      <section className="image-box"></section>
      <section className="review-list">
        {reviews.map(review => 
            <ReviewCard key={review.id} review={review} callDeleteReview={callDeleteReview}/>                     
        )}
      </section>
      <button className="large-button" onClick={() => {navigate("/review/add")}}>New Review</button>
    </main>
)
}