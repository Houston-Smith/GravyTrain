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
  <section>
    <section className="details-box">
      <h3>{review.locationName}</h3>
      <h4>{review.locationAddress}</h4>
      <section className="details-info">

          <section className="score">
            <p><b>Butteriness:</b></p>    
            {starCount(review.butteryScore)}
          </section>

          <section className="score">
            <p><b>Flakiness:</b></p>
            {starCount(review.flakeyScore)}
          </section>

          <section className="score">
            <p><b>Gravy Consistancy:</b></p>
            {starCount(review.gravyScore)}
          </section>

          <section className="score">
            <p><b>Gravy Flavor:</b></p>
            {starCount(review.flavorScore)} 
          </section>

          <section className="score">
            <p><b>Delivery:</b></p>
            {starCount(review.deliveryScore)}
          </section>

          <section className="score">
            <p><b>Average:</b></p>
            {starCount(review.averageScore)}
          </section>
          
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