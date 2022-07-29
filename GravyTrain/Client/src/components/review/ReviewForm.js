import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { addReview } from "../../modules/reviewManager";
import { getLoggedInUser } from "../../modules/userManager";


export const ReviewForm = () => {

  const [currentUser, setCurrentUser] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUser()
      .then(User => {
        setCurrentUser(User);
        console.log(User);
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

    const reviewLocation = review.locationName
    const reviewNotes = review.notes

    let newReview = { ...review }

    const ScoreAverage = Math.round(((newReview.butteryScore * 1) + (newReview.flakeyScore * 1) + (newReview.flavorScore * 1) + (newReview.gravyScore * 1) + (newReview.deliveryScore * 1)) / 5)
    console.log(ScoreAverage)
    newReview.averageScore = ScoreAverage
    newReview.userProfileId = currentUser.id  

    if (reviewNotes === "") {
      newReview.notes = "No Notes"
    }

    if (newReview.locationAddress === "") {
      newReview.locationAddress = "N/A"
    }

    if (newReview.gravyType === "") {
      newReview.gravyType = "---"
    }

    if (reviewLocation === "") {
      window.alert("Please input a location for your review")

    } else {
      console.log(newReview)
      addReview(newReview)
        .then(() => navigate("/review"))
    }
  }

	const ClickCancel = (event) => {
		navigate("/review")
	}

  return (
    <main>
      <h1>New Review</h1>
        
        <fieldset>
						<label htmlFor="locationName">Location Name:</label>
						<input type="text" id="locationName" onChange={handleControlledInputChange} required autoFocus className="form-control" value={review.locationName} />
				</fieldset>

        <fieldset>
						<label htmlFor="locationAddress">Location Address:</label>
						<input type="text" id="locationAddress" onChange={handleControlledInputChange} required autoFocus className="form-control" value={review.locationAddress} />
				</fieldset>

        <fieldset>
						<label htmlFor="butteryScore">Butteriness:</label>
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
						<label htmlFor="flakeyScore">Flakiness:</label>
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
						<label htmlFor="gravyScore">Gravy Consistancy:</label>
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
						<label htmlFor="flavorScore">Gravy Flavor:</label>
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
						<label htmlFor="deliveryScore">Delivery:</label>
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
						<label htmlFor="gravyType">Gravy Type:</label>
						<select id="gravyType" onChange={handleControlledInputChange} value={review.gravyType}>
              <option value={""}>---</option>
              <option value={"White"}>White</option>
              <option value={"Brown"}>Brown</option>
              <option value={"Sausage"}>Sausage</option>
            </select>
				</fieldset>

        <fieldset>
						<label htmlFor="notes">Additional Notes:</label>
						<input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" value={review.notes} />
				</fieldset>

      <div className="buttons">
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