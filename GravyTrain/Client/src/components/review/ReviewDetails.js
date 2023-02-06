import { Card, CardBody } from "reactstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { getReviewById, deleteReview } from "../../modules/reviewManager"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTagByReviewId } from "../../modules/tagManager"
import "./ReviewDetails.css"

export const ReviewDetails = () =>{

  const navigate = useNavigate()

  const [review, updateReview] = useState({})
  const [tags, setTags] = useState([{}])

  const{reviewId} = useParams()

  useEffect(()=>{
      getReviewById(reviewId).then(response => updateReview(response))
  },[])

  useEffect(() => {
    getTagByReviewId(reviewId)
      .then(tags => {
        setTags(tags);
      });
  }, []);

  const callDeleteReview = (id) => {
    deleteReview(id)
    .then(() => navigate(`/review`))
  };

  return (
    <section>
    <section className="details-box">
      <h3>{review.locationName}</h3>
      <h4>{review.locationAddress}</h4>
      <section className="details-info">
          <p>Butteriness: {review.butteryScore}</p>
          <p>Flakiness: {review.flakeyScore}</p>
          <p>Gravy Consistancy: {review.gravyScore}</p>
          <p>Gravy Flavor: {review.flavorScore}</p>
          <p>Delivery Flavor: {review.deliveryScore}</p>
          <p>Average Score: {review.averageScore}</p>
          <p>Gravy Type: {review.gravyType}</p>
          <p>Notes: {review.notes}</p>
          <h3>Tags:</h3>
          <div>
            {tags.map(tag => (
              <p>{tag.name}</p>       
              ))}
          </div>
      </section>
  </section>
      <button className="details-large-button" onClick={() => {callDeleteReview(reviewId)} }>Delete Review</button>
      <button className="details-large-button" onClick={() => {navigate(`/review`)}}>Back to List</button>
      <button className="details-large-button" onClick={() => {navigate(`/review/${reviewId}/edit`)}}>Edit Review</button>
  </section>
  )
}