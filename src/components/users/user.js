import { useEffect, useState } from "react"
import { getMembers, getSpecificMembers, UpdateMember } from "../requesthandlers/usermanager"
import { Edit, Message } from "@material-ui/icons";
import { Link } from "react-router-dom";

export const UserPage = () => {
    const [allmembers, setallmembers] = useState([])
    const [myprofile, setmyprofile] = useState({})
    const [editstate, seteditstate] = useState(false)
    const [base64string, setbase] = useState(null)

    useEffect(() => {
        getMembers().then(res => setallmembers(res))
        getSpecificMembers(parseInt(localStorage.getItem('member'))).then(res => setmyprofile(res))
    }, [])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            setbase(base64ImageString)
        });
    }

    const handlechangeinfo = (e) => {
        const copy = { ...myprofile }
        copy[e.target.id] = e.target.value
        delete copy.image
        setmyprofile(copy)
    }

    const savechanges = () => {
        UpdateMember({
            "id": myprofile.id,
            "details": myprofile.details,
            "parent": myprofile.parent,
            "zipcode": myprofile.zipcode,
            "image": base64string
        }).then(() => {
            getSpecificMembers(parseInt(localStorage.getItem('member'))).then(res => setmyprofile(res))
            seteditstate(false)
        })
    }

    return (<>
        <div className="usercontainer">
            <div>
                All Users:
                {
                    allmembers.map(member => {
                        return <div>
                            <div><div>{member.user?.username}</div> <div> {member.id === myprofile.id ? "" : <Link to={`/messages/new/${member.id}`}> <Message /></Link>} </div></div>
                           { member.image? <div><img src={`http://localhost:8000${member.image}`}></img></div> : ""}
                            <div>{member.user?.first_name} {member.user?.last_name}</div>
                            <div>{member.details}</div>
                            <div>{member.parent ? "Parent" : ""}</div>

                        </div>
                    })
                }

            </div>
            <div>
                {
                    editstate ? <div>
                        <div> <div>{myprofile.user?.username}</div></div>
                        <fieldset>
                            <label htmlFor="profileimage"> Profile Image </label>
                            <input type="file" id="userimage" onChange={createGameImageString} />
                        </fieldset>

                        <div>{myprofile.user?.first_name} {myprofile.user?.last_name}</div>
                        <input id="details" placeholder={myprofile.details} onChange={handlechangeinfo} />
                        <button onClick={() => savechanges()}>Save Changes</button>
                    </div> : <div>
                        "My Profile"
                        <div> <div>{myprofile.user?.username}</div></div>
                        {myprofile.image ? <div><img src={`http://localhost:8000${myprofile.image}`}></img></div>: ""}
                        <div>{myprofile.user?.first_name} {myprofile.user?.last_name}</div>
                        <div>{myprofile.details}</div>
                        <div>{myprofile.parent ? "Parent" : ""}</div>
                        <button onClick={() => seteditstate(true)}><Edit /></button>
                    </div>
                }
            </div>
        </div>
    </>)
}