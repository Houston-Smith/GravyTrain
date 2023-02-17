import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ReviewList.css"



export const ReviewCard = ({review, callDeleteReview}) => {

  const navigate = useNavigate()

  const starCount = (value) => {
    switch (value) {
      case 1:
      return (<p className="score-value"><b className="fa-solid fa-star-half"></b></p>)

      case 2:
      return (<p className="score-value"><b className="fa-solid fa-star"></b></p>)

      case 3:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star-half"></b></p>)

      case 4:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b></p>)

      case 5:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star-half"></b></p>)

      case 6:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b></p>)

      case 7:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star-half"></b></p>)

      case 8:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b></p>)

      case 9:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star-half"></b></p>)

      case 10:
      return (<p className="score-value"><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b><b className="fa-solid fa-star"></b></p>)
    }
  }

  return (
    <section className="review-card" onClick={() => {navigate(`/review/${review.id}/details`)}}>
            <h2><b>{review.locationName}</b></h2>
            <h6>{review.locationAddress}</h6>
            <h5>{review.gravyType} Gravy</h5>  
            {starCount(review.averageScore)}                    
            <p className="tag-list">{review.tags.map(tag =>
              <li key={tag.id}>{tag.name}</li>
              )}
            </p>  

            {/* <div className="review-card-buttons">
              <button onClick={() => callDeleteReview(review.id)}>X</button>
            </div> */}
    </section>
)
}