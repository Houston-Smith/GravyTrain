import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateReview, getReviewById } from "../../modules/reviewManager";
import { getTags, addTagReviews, deleteTagReviews} from "../../modules/tagManager";
import "./ReviewForm.css";

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
  <main>
    <section className="form-card">
    <h1>Edit a Review</h1>

    <section>
      <b><p className="input-paragraph">Location Name</p></b> 
      <fieldset className="input-fieldset">
          <label htmlFor="locationName"></label>
          <input type="text" id="locationName" className="form-control" onChange={handleFieldChange} value={review.locationName} />
      </fieldset>
    </section>

    <section>
      <b><p className="input-paragraph">Location Address</p></b> 
      <fieldset className="input-fieldset">
          <label htmlFor="locationAddress"></label>
          <input type="text" id="locationAddress" className="form-control" onChange={handleFieldChange} value={review.locationAddress} />
      </fieldset>
    </section>

      <fieldset>
						<label htmlFor="butteryScore">Butteriness: </label>
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

        <b><p className="name">Butteriness</p></b>
          <div className="reviews">
            <div className="rating">
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={10}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={9}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={8}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={7}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={6}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={5}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={4}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={3}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={2}/>
              <input onChange={handleFieldChange} id="butteryScore" type ="radio" name="buttery" value={1}/>
            </div>
        </div>
      
        <fieldset>
						<label htmlFor="flakeyScore">Flakiness: </label>
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
						<label htmlFor="gravyScore">Gravy Consistancy: </label>
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
						<label htmlFor="flavorScore">Gravy Flavor: </label>
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
						<label htmlFor="deliveryScore">Delivery: </label>
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

        <fieldset className="other-fieldset">
						<b><label htmlFor="gravyType">Gravy Type: </label></b>
						<select id="gravyType" onChange={handleFieldChange} value={review.gravyType}>
              <option value={"---"}>---</option>
              <option value={"White"}>White</option>
              <option value={"Brown"}>Brown</option>
              <option value={"Sausage"}>Sausage</option>
            </select>  
				</fieldset>

        <fieldset className="other-fieldset">
          <b><label htmlFor="tags">Tags:</label></b>
					<div id="root">
            {tags.map(tag => (
              <label htmlFor={tag.name}>
                    <p>{tag.name}</p>
                    <input type="checkbox" id={"tag--" + tag.id} name={tag.name} value={tag.id} ></input>
              </label>        
            ))}
          </div>  
				</fieldset>

      <section>
        <b><p className="input-paragraph">Additional Notes</p></b>
        <fieldset className="input-fieldset">
          <label htmlFor="notes"></label>
          <input type="text" id="notes" className="form-control" onChange={handleFieldChange} value={review.notes} />
        </fieldset>
      </section>

    </section> 


    <div className="form-buttons">  

      <button className="create-button" disabled={isLoading}
        onClick={updateExistingReview}>
        Update
      </button>

      <button className="cancel-button" disabled={isLoading}
        onClick={ClickCancel}>
        Cancel
      </button>

    </div>  
  </main>
  )

}