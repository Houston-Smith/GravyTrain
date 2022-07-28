import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateReview, getReviewById } from "../../modules/reviewManager";

export const ReviewEdit = () => {

  const [isLoading, setIsLoading] = useState(false);

  const {reviewId} = useParams();

  const navigate = useNavigate();

  const [review, setReview] = useState({ locationName: "" });

  useEffect(() => {
    getReviewById(reviewId)
      .then(review => {
        setReview(review);
        setIsLoading(false);
      });
  }, []);

  const handleFieldChange = evt => {
    const stateToChange = { ...review };
    stateToChange[evt.target.id] = evt.target.value;
    setReview(stateToChange);
  };

  const updateExistingReview = evt => {
    evt.preventDefault()
    setIsLoading(true);


    const editedReview = {
      id: reviewId,
      locationName: review.locationName,
      locationAddress: review.locationAddress,
      dateReviewed: review.dateReviewed,
      butteryScore: review.butteryScore,
      flakeyScore: review.flakeyScore,
      gravyScore: review.gravyScore,
      flavorScore: review.flavorScore,
      deliveryScore: review.deliveryScore,
      gravyScore: review.gravyType,
      notes: review.notes,
      userProfileId: review.userProfileId
    };

    const reviewLocation = editedReview.locationName

    const ScoreAverage = Math.round(((editedReview.butteryScore * 1) + (editedReview.flakeyScore * 1) + (editedReview.flavorScore * 1) + (editedReview.gravyScore * 1) + (editedReview.deliveryScore * 1)) / 5)

    editedReview.averageScore = ScoreAverage
    
    if (editedReview.notes === "") {
      editedReview.notes = "No Notes"
    }

    if (editedReview.gravyType === "") {
      editedReview.gravyType = "---"
    }

    if (editedReview.locationAddress === "") {
      editedReview.locationAddress = "n/a"
    }

    if (reviewLocation === "") {
      window.alert("Please input a location for your review")

    } else {
      console.log(editedReview)
      updateReview(editedReview)
        .then(() => navigate("/review"))
    }
  }

  const ClickCancel = (event) => {
    navigate("/review")
  }

  return (
    <>
    <h1>Edit a Review</h1>
      
      <fieldset>
          <label htmlFor="locationName">Location Name:</label>
          <input type="text" id="locationName" onChange={handleFieldChange} required autoFocus value={review.locationName} />
      </fieldset>

      <fieldset>
						<label htmlFor="butteryScore">Butteriness:</label>
						<select id="butteryScore" onChange={handleFieldChange} value={review.butteryScore}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>  
				</fieldset>
      
        <fieldset>
						<label htmlFor="flakeyScore">Flakiness:</label>
						<select id="flakeyScore" onChange={handleFieldChange} value={review.flakeyScore}>
            <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
				</fieldset>

        <fieldset>
						<label htmlFor="gravyScore">Gravy Consistancy:</label>
						<select id="gravyScore" onChange={handleFieldChange} value={review.gravyScore}>
            <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
				</fieldset>

        <fieldset>
						<label htmlFor="flavorScore">Gravy Flavor:</label>
						<select id="flavorScore" onChange={handleFieldChange} value={review.flavorScore}>
            <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
				</fieldset>

        <fieldset>
						<label htmlFor="deliveryScore">Delivery:</label>
						<select id="deliveryScore" onChange={handleFieldChange} value={review.deliveryScore}>
            <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
				</fieldset>

        <fieldset>
          <label htmlFor="notes">Additional Notes:</label>
          <input type="text" id="notes" onChange={handleFieldChange} required autoFocus value={review.notes} />
      </fieldset>

      <button disabled={isLoading}
        onClick={updateExistingReview}>
        Update
      </button>

      <button disabled={isLoading}
        onClick={ClickCancel}>
        Cancel
      </button>   
    </>
  )

}