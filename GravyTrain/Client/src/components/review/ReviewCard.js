import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ReviewList.css"

export const ReviewCard = ({review, callDeleteReview}) => {

  const navigate = useNavigate()

  return (
    <section className="review-card" onClick={() => {navigate(`/review/${review.id}/edit`)}}>
            <h2><b>{review.locationName}</b></h2>  
            <p className="points"><b>{review.averageScore} Points</b></p>                    
            <p>{review.tags.map(tag =>
              <li key={tag.id}>{tag.name}</li>
              )}
            </p>  

            {/* <div className="review-card-buttons">
              <button onClick={() => callDeleteReview(review.id)}>X</button>
            </div> */}
    </section>
)
}