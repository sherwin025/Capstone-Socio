export const getCommunity = () => {
    return fetch("http://localhost:8000/community", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleCommunity = (id) => {
    return fetch(`http://localhost:8000/community/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getPublicCommunity = (id) => {
    return fetch(`http://localhost:8000/community?term=all`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const searchPublicCommunity = (search) => {
    return fetch(`http://localhost:8000/community?search=${search}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const CreateCommunity = (community) => {
    return fetch("http://localhost:8000/community", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(community)
     })
}


export const UpdateCommunity = (community) => {
    return fetch(`http://localhost:8000/community/${community.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(community)
     })
}

export const DeleteCommunity = (id) => {
    return fetch(`http://localhost:8000/community/${id}`, {
        method: "Delete",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        }
     })
}


export const getUserCommunity = (memberid) => {
    return fetch(`http://localhost:8000/community?member=${memberid}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}