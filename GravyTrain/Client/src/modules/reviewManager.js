const baseUrl = "/api/Review";

export const getReviewById = (reviewId) => {
  return fetch(`${baseUrl}/${reviewId}`)
  .then(res => res.json())
}

export const getReviewByUserId = (userId) => {
  return fetch(`${baseUrl}/User/${userId}`)
  .then(res => res.json())
}

export const addReview = (newReview) => {
  return fetch (`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newReview)
  }).then(res => res.json())
}

export const deleteReview = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE"
  })  
}

export const updateReview = (reviewObj) => {
  return fetch(`${baseUrl}/${reviewObj.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewObj)
  })
}