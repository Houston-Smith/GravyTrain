import { Card, CardBody } from "reactstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { getReviewById } from "../../modules/reviewManager"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const ReviewDetails = () =>{

  const navigate = useNavigate()

  const [review, updateReview] = useState({})

  const{reviewId} = useParams()

  useEffect(()=>{
      getReviewById(reviewId).then(response => updateReview(response))
  },[])

  console.log("review", review)




  return (
      <Card>
      <h3>{review.locationName}</h3>
      <CardBody>
          <p>Butteriness: {review.butteryScore}</p>
          <p>Flakiness: {review.flakeyScore}</p>
          <p>Gravy Consistancy: {review.gravyScore}</p>
          <p>Gravy Flavor: {review.flavorScore}</p>
          <p>Delivery Flavor: {review.deliveryScore}</p>
          <p>Average Score: {review.averageScore}</p>
          <p>Notes: {review.notes}</p>
      </CardBody>
      <button onClick={() => {navigate(`/review`)}}>Back to List</button>
  </Card>
  )
}