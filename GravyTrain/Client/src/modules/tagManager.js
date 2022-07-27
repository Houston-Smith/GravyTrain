const baseUrl = "/api/Tag";

export const getTags = () => {
  return fetch(`${baseUrl}`)
  .then(res => res.json())
}

export const getTagByUserId = (userId) => {
  return fetch(`${baseUrl}/User/${userId}`)
  .then(res => res.json())
}