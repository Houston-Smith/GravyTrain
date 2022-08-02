import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ReviewList.css"

export const ReviewCard = ({review, callDeleteReview}) => {

  const navigate = useNavigate()

  return (
      <section className="review-card-outer-1">
        <section className="review-card-outer-2">
          <section className="review-card">
                  <h2><b>{review.locationName}</b></h2>  
                  <p>Average Score: <b>{review.averageScore}</b></p>                    
                  <p>{review.tags.map(tag =>
                    <li key={tag.id}>{tag.name}</li>
                    )}
                  </p>  

                  <div className="review-card-buttons">
                    <button onClick={() => callDeleteReview(review.id)}>Delete Review</button>
                    <button onClick={() => {navigate(`/review/${review.id}/details`)}}>Review Details</button>
                    <button onClick={() => {navigate(`/review/${review.id}/edit`)}}>Edit Review</button>
                  </div>
          </section>
        </section>
      </section>
)
}