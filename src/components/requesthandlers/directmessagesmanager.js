export const getMessages = () => {
    return fetch(`http://localhost:8000/messages`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleMessages = (id) => {
    return fetch(`http://localhost:8000/messages/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}


export const createmessage = (message) => {
    return fetch("http://localhost:8000/messages", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(message)
    })
}

