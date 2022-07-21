const baseUrl = "/api/UserProfile";

export const getAllUsers = () => {
    return fetch(`${baseUrl}`).then((res) => res.json());
}; 

export const getUserById = (q) => {
    return fetch(`${baseUrl}/details/${q}`)
        .then((res) => res.json());
};

export const getUserByFirebaseId = (firebase) =>{
    return fetch(`${baseUrl}/${firebase}`)
        .then(res => res.json())
}
// TODO Make an edit usertype method

export const changeUserType = (user) => {
    return fetch(`${baseUrl}/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};