const baseUrl = "/api/Tag";

export const getTags = () => {
  return fetch(`${baseUrl}`)
  .then(res => res.json())
}

export const getTagByUserId = (userId) => {
  return fetch(`${baseUrl}/User/${userId}`)
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