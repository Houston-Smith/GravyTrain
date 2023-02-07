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

  const ClickLog = (event) => {
		let newReview = { ...review }

    console.log(newReview)
	}

  return (
    <main>
      <section className="form-card">
        <h1>New Review</h1>

        <section>
          <b><p className="input-paragraph">Location Name</p></b> 
          <fieldset className="input-fieldset">
              <label htmlFor="locationName"></label>
              <input  type="text" id="locationName" onChange={handleControlledInputChange} required autoFocus className="form-control" value={review.locationName} />
          </fieldset>
        </section>

        <section>
          <b><p className="input-paragraph">Location Address</p></b>
          <fieldset className="input-fieldset">
              <label htmlFor="locationAddress"></label>
              <input type="text" id="locationAddress" onChange={handleControlledInputChange} required className="form-control" value={review.locationAddress} />
          </fieldset>
        </section>

        <b><p className="name">Butteriness</p></b>
          <div className="reviews">
            <div className="rating">
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={10}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={9}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={8}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={7}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={6}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={5}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={4}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={3}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={2}/>
              <input onChange={handleControlledInputChange} id="butteryScore" type ="radio" name="buttery" value={1}/>
            </div>
        </div>

        <b><p className="name">Flakiness</p></b>
          <div className="reviews">
            <div className="rating">
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={10}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={9}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={8}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={7}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={6}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={5}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={4}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={3}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={2}/>
              <input onChange={handleControlledInputChange} id="flakeyScore" type ="radio" name="flakey" value={1}/>
            </div>
        </div>

        <b><p className="name">Gravy Consistancy</p></b>
          <div className="reviews">
            <div className="rating">
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={10}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={9}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={8}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={7}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={6}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={5}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={4}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={3}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={2}/>
              <input onChange={handleControlledInputChange} id="gravyScore" type ="radio" name="gravy" value={1}/>
            </div>
        </div>

        <b><p className="name">Gravy Flavor</p></b>
          <div className="reviews">
            <div className="rating">
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={10}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={9}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={8}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={7}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={6}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={5}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={4}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={3}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={2}/>
              <input onChange={handleControlledInputChange} id="flavorScore" type ="radio" name="flavor" value={1}/>
            </div>
        </div>

        <b><p className="name">Delivery</p></b>
          <div className="reviews">
            <div className="rating">
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={10}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={9}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={8}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={7}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={6}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={5}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={4}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={3}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={2}/>
              <input onChange={handleControlledInputChange} id="deliveryScore" type ="radio" name="delivery" value={1}/>
            </div>
        </div>

        <fieldset className="other-fieldset">
            <b><label htmlFor="gravyType">Gravy Type: </label></b>
            <select id="gravyType" onChange={handleControlledInputChange} value={review.gravyType}>
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
              <input type="text" id="notes" onChange={handleControlledInputChange} required className="form-control" value={review.notes} />
          </fieldset>
        </section>

      </section>

      <div className="form-buttons">
          <button className="create-button"
            onClick={ClickAddReview}>
            Create Review
          </button>

          <button className="cancel-button"
            onClick={ClickCancel}>
            Cancel
          </button>

          {/* <button
            onClick={ClickLog}>
            Log
          </button> */}
          
        </div>
    </main>

  )

}