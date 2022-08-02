import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateReview, getReviewById } from "../../modules/reviewManager";
import { getTags, addTagReviews, deleteTagReviews} from "../../modules/tagManager";

export const ReviewEdit = () => {

  const [isLoading, setIsLoading] = useState(false);

  const {reviewId} = useParams();

  const navigate = useNavigate();

  const [review, setReview] = useState({ 
  locationName: "",
  locationAddress: "",
  createDateTime: "",
  butteryScore:0,
  flakeyScore:0,
  gravyScore:0,
  flavorScore:0,
  deliveryScore:0,
  averageScore:0,
  gravyType: "",
  notes: "", });

  const [tags, setTags] = useState([{}])

  useEffect(() => {
    getReviewById(reviewId)
      .then(review => {
        setReview(review);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getTags()
      .then(tags => {
        setTags(tags);
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

    deleteTagReviews(reviewId)
    let checkedTags = []

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
      gravyType: review.gravyType,
      notes: review.notes,
      userProfileId: review.userProfileId
    };

    tags.map(tag => {
      if(document.querySelector(`#tag--` + tag.id).checked === true)
      {
        const newTagReview = {}
        newTagReview.tagId = tag.id
        newTagReview.reviewId = reviewId
        checkedTags.push(newTagReview)
      }
    })

    const reviewLocation = editedReview.locationName

    let ScoreAverage = Math.round(((editedReview.butteryScore * 1) + (editedReview.flakeyScore * 1) + (editedReview.flavorScore * 1) + (editedReview.gravyScore * 1) + (editedReview.deliveryScore * 1)) / 5)
    editedReview.averageScore = ScoreAverage
    
    if (editedReview.notes === "") {
      editedReview.notes = "No Notes"
    }

    if (editedReview.locationAddress === "") {
      editedReview.locationAddress = "N/A"
    }

    if (editedReview.gravyType === "") {
      editedReview.gravyType = "---"
    }

    if (reviewLocation === "") {
      window.alert("Please input a location for your review")
      setIsLoading(false);
    } else {
      console.log(editedReview)
      updateReview(editedReview)
      .then(() => addTagReviews(checkedTags))
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
          <input type="text" id="locationName" onChange={handleFieldChange} value={review.locationName} />
      </fieldset>

      <fieldset>
          <label htmlFor="locationAddress">Location Address:</label>
          <input type="text" id="locationAddress" onChange={handleFieldChange} value={review.locationAddress} />
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
						<label htmlFor="gravyType">Gravy Type:</label>
						<select id="gravyType" onChange={handleFieldChange} value={review.gravyType}>
              <option value={"---"}>---</option>
              <option value={"White"}>White</option>
              <option value={"Brown"}>Brown</option>
              <option value={"Sausage"}>Sausage</option>
            </select>  
				</fieldset>

        <fieldset>
						<label htmlFor="tags">Tags:</label>
						<div id="root">
              {tags.map(tag => (
                <label htmlFor={tag.name}>
                      <p>{tag.name}</p>
                     <input type="checkbox" id={"tag--" + tag.id} name={tag.name} value={tag.id} ></input>
                </label>        
              ))}
            </div>  
				</fieldset>

        <fieldset>
          <label htmlFor="notes">Additional Notes:</label>
          <input type="text" id="notes" onChange={handleFieldChange} value={review.notes} />
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