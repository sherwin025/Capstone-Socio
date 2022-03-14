export const getcommunitymember = (id) => {
    return fetch(`http://localhost:8000/communitymember?member=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSinglecommunitymember = (id) => {
    return fetch(`http://localhost:8000/communitymember/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createcommunitymember = (communitymember) => {
    return fetch("http://localhost:8000/communitymember", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(communitymember)
     })
}


export const checkcommunitymember = (communitymember, community) => {
    return fetch(`http://localhost:8000/communitymember?member=${communitymember}&community=${community}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
     }).then(res => res.json())
}


export const Updatecommunitymember = (communitymember) => {
    return fetch(`http://localhost:8000/communitymember/${communitymember.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(communitymember)
     })
}

export const Deletecommunitymember = (id) => {
    return fetch(`http://localhost:8000/communitymember/${id}`, {
        method: "Delete",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        }
     })
}
