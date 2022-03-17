export const getMembers = () => {
    return fetch("http://localhost:8000/members", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSpecificMembers = (id) => {
    return fetch(`http://localhost:8000/members/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const UpdateMember = (member) => {
    return fetch(`http://localhost:8000/members/${member.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify(member)
     })
}