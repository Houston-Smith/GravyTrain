import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getReviewByUserId, deleteReview} from "../../modules/reviewManager";
import { getLoggedInUser } from "../../modules/userManager";

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
    <div className="user-display">
        <Table>
            <thead>
                <tr>
                    <th>Location Name</th>
                    <th>Average Score</th>
                </tr>
            </thead>
            <tbody>
                {reviews.map(review => 
                <>
                    <tr>
                        <td>{review.locationName}</td>  
                        <td>{review.averageScore}</td>                    
                        <td>
                        <button onClick={() => callDeleteReview(review.id)}>Delete Review</button>
                        <button onClick={() => {navigate(`/review/${review.id}/details`)}}>Review Details</button>
                        <button onClick={() => {navigate(`/review/${review.id}/edit`)}}>Edit Review</button>
                        </td>
                    </tr>                        
                </>
                )}
            </tbody>
        </Table>
        <button onClick={() => {navigate("/review/add")}}>Create Review</button>
    </div>
)
}