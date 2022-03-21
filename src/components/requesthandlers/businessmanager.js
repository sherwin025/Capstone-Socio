export const getbusinesses = () => {
    return fetch("http://localhost:8000/business", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getbusinessevents = () => {
    return fetch("http://localhost:8000/businessevents", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getbusinessAnnouncements = () => {
    return fetch("http://localhost:8000/businessannouncements", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSinglebusiness = (id) => {
    return fetch(`http://localhost:8000/business/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createbusiness = (business) => {
    return fetch("http://localhost:8000/business", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(business)
     })
}


export const Updatebusiness = (business) => {
    return fetch(`http://localhost:8000/business/${business.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(business)
     })
}

export const Deletebusiness = (id) => {
    return fetch(`http://localhost:8000/business/${id}`, {
        method: "Delete",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        }
     })
}

export const getCommunitybusinessComments = () => {
    return fetch(`http://localhost:8000/comments`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createbusinesscomment = (business) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(business)
     })
}