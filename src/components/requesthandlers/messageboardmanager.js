export const getCommunityMessages = (id) => {
    return fetch(`http://localhost:8000/messageboard?community=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getCommunityTags = (id) => {
    return fetch(`http://localhost:8000/communitytags?community=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createCommunityTags = (commtag) => {
    return fetch("http://localhost:8000/communitytags", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(commtag)
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
