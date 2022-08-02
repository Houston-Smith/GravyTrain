import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { addReview } from "../../modules/reviewManager";
import { getLoggedInUser } from "../../modules/userManager";
import { getTags, addTagReviews } from "../../modules/tagManager";
import "./ReviewForm.css"


export const ReviewForm = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);  
  const [currentUser, setCurrentUser] = useState({})
  const [tags, setTags] = useState([{}])

  useEffect(() => {
    getTags()
      .then(tags => {
        setTags(tags);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getLoggedInUser()
      .then(User => {
        setCurrentUser(User);
      });
  }, []);

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
    notes: "",
    gravyType: "",
  })

  const handleControlledInputChange = (event) => {
		//Create a copy of the hideout array
		const newReview = { ...review }
		//target the value of the input field
		let selectedVal = event.target.value
		//Change the property of the input field to a new value
		newReview[event.target.id] = selectedVal
		// update state
		setReview(newReview)
	}

  const ClickAddReview = (event) => {
    event.preventDefault()

    let checkedTags = []

    let newReview = { ...review }

    const ScoreAverage = Math.round(((newReview.butteryScore * 1) + (newReview.flakeyScore * 1) + (newReview.flavorScore * 1) + (newReview.gravyScore * 1) + (newReview.deliveryScore * 1)) / 5)
    newReview.averageScore = ScoreAverage
    newReview.userProfileId = currentUser.id  

    tags.map(tag => {
      if(document.querySelector(`#tag--` + tag.id).checked === true)
      {
        const newTagReview = {}
        newTagReview.tagId = tag.id
        checkedTags.push(newTagReview)
      }
    })

    if (newReview.notes === "") {
      newReview.notes = "No Notes"
    }

    if (newReview.gravyType === "") {
      newReview.gravyType = "---"
    }

    if (newReview.locationAddress === "") {
      newReview.locationAddress = "n/a"
    }

    if (newReview.locationName === "") {
      window.alert("Please input a location for your review")

    } else {

      addReview(newReview)
        .then((response) => 
        checkedTags.map(tag => {tag.reviewId = response.id}),
        console.log(checkedTags),)
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
        <h1>New Review</h1>
          
        <fieldset>
            <label htmlFor="locationName">Location Name: </label>
            <input type="text" id="locationName" onChange={handleControlledInputChange} required autoFocus className="form-control" value={review.locationName} />
        </fieldset>

        <fieldset>
            <label htmlFor="locationAddress">Location Address: </label>
            <input type="text" id="locationAddress" onChange={handleControlledInputChange} required autoFocus className="form-control" value={review.locationAddress} />
        </fieldset>

        <fieldset>
            <label htmlFor="butteryScore">Butteriness: </label>
            <select id="butteryScore" onChange={handleControlledInputChange} value={review.butteryScore}>
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
            <label htmlFor="flakeyScore">Flakiness: </label>
            <select id="flakeyScore" onChange={handleControlledInputChange} value={review.flakeyScore}>
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
            <select id="gravyScore" onChange={handleControlledInputChange} value={review.gravyScore}>
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
            <select id="flavorScore" onChange={handleControlledInputChange} value={review.flavorScore}>
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
            <select id="deliveryScore" onChange={handleControlledInputChange} value={review.deliveryScore}>
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
            <label htmlFor="gravyType">Gravy Type: </label>
            <select id="gravyType" onChange={handleControlledInputChange} value={review.gravyType}>
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
                      <p><b>{tag.name}</b></p>
                    <input type="checkbox" id={"tag--" + tag.id} name={tag.name} value={tag.id} ></input>
                </label>        
              ))}
            </div>  
        </fieldset>

        <fieldset>
            <label htmlFor="notes">Additional Notes:</label>
            <input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" value={review.notes} />
        </fieldset>

      </section>

      <div className="form-buttons">
          <button
            onClick={ClickAddReview}>
            Create Review
          </button>

          <button
            onClick={ClickCancel}>
            Cancel
          </button>
          
        </div>
    </main>

  )

}