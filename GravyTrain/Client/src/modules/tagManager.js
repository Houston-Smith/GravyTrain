const baseUrl = "/api/Tag";

export const getTags = () => {
  return fetch(`${baseUrl}`)
  .then(res => res.json())
}

export const getTagByReviewId = (reviewId) => {
  return fetch(`${baseUrl}/User/${reviewId}`)
  .then(res => res.json())
}

export const addTagReviews = (tagReviews) => {
  return fetch (`${baseUrl}/TagReviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tagReviews)
  })
}

export const deleteTagReviews = (reviewId) => {
  return fetch(`${baseUrl}/TagReview/${reviewId}`, {
    method: "DELETE"
  })
}