export const getAnnouncement = () => {
    return fetch("http://localhost:8000/announcements", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getCommunityAnnouncement = (id) => {
    return fetch(`http://localhost:8000/announcements?community=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleannouncement = (id) => {
    return fetch(`http://localhost:8000/announcements/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createannouncement = (announcement) => {
    return fetch("http://localhost:8000/announcements", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(announcement)
     })
}


export const Updateannouncement = (announcement) => {
    return fetch(`http://localhost:8000/announcements/${announcement.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(announcement)
     })
}

export const Deleteannouncement = (id) => {
    return fetch(`http://localhost:8000/announcements/${id}`, {
        method: "Delete",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        }
     })
}
