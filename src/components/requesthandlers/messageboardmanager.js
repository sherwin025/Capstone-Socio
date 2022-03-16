export const getCommunityMessages = (id) => {
    return fetch(`http://localhost:8000/messageboard?community=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}


export const createcommunitymessage = (message) => {
    return fetch("http://localhost:8000/messageboard", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(message)
    })
}


export const createTags = (commtag) => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(commtag)
    })
        .then(res => res.json())
}
