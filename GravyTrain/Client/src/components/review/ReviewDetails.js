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
          <p><b>Butteriness:</b> {review.butteryScore}</p>
          <p><b>Flakiness:</b> {review.flakeyScore}</p>
          <p><b>Gravy Consistancy:</b> {review.gravyScore}</p>
          <p><b>Gravy Flavor:</b> {review.flavorScore}</p>
          <p><b>Delivery Flavor:</b> {review.deliveryScore}</p>
          <p><b>Average Score:</b> {review.averageScore}</p>
          <p><b>Gravy Type:</b> {review.gravyType}</p>
          <p><b>Notes:</b> {review.notes}</p>
          <h4>Tags:</h4>
          <div>
            {tags.map(tag => (
              <p>{tag.name}</p>       
              ))}
          </div>
      </section>
    </section>
    <section className="details-buttons">
      <button className="blue-button" onClick={() => {navigate(`/review`)}}>Back</button>
      <button className="red-button" onClick={() => {callDeleteReview(reviewId)} }>Delete</button>
      <button className="blue-button" onClick={() => {navigate(`/review/${reviewId}/edit`)}}>Edit</button>
    </section>
  </section>
  )
}