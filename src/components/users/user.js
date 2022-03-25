import { useEffect, useState } from "react"
import { getMembers, getSpecificMembers, UpdateMember } from "../requesthandlers/usermanager"
import { AirlineSeatLegroomReducedSharp, Edit, Message } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

export const UserPage = () => {
    const [allmembers, setallmembers] = useState([])
    const [myprofile, setmyprofile] = useState({})
    const [editstate, seteditstate] = useState(false)
    const [base64string, setbase] = useState(null)
    const [viewprofile, setviewprofile] = useState({})

    const [profileModal, setprofileModal] = useState(false)
    const toggleprofileModal = () => setprofileModal(!profileModal)


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
            getMembers().then(res => setallmembers(res))
            seteditstate(false)
        })
    }

    const storetheprofile = (member) => {
        setviewprofile(member)
        toggleprofileModal()
    }

    return (<>
        <div className="usercontainerpage">

            <Dialog
                className="edit-dialog"
                open={profileModal}
                onClose={toggleprofileModal}
            >
                <DialogTitle className="edit-event-title">{viewprofile.user?.username}</DialogTitle>
                <DialogContent className="edit-event-content">
                    <div>
                        {
                            viewprofile? <div>
                            {viewprofile.image ? <div><img src={`http://localhost:8000${viewprofile.image}`}></img></div> : ""}
                            <div>{viewprofile.user?.first_name} {viewprofile.user?.last_name}</div>
                            <div>{viewprofile.details}</div>
                            <div>{viewprofile.parent ? "Parent" : ""}</div>
                            <div><div> {viewprofile.id === myprofile.id ? "" : <Link to={`/messages/new/${viewprofile.id}`}> <Message /></Link>} </div></div>
                            </div>: ""
                        }
                    </div>
                    <div className="edit-event-btns">
                        <div className="edit-event-btn cancel"><button className="edit-event-btn cancel" variant="outlined" onClick={(toggleprofileModal)}>Close</button></div>
                    </div>
                </DialogContent>
            </Dialog>


            <div className="userlistdetail">
                <h3>All Users:</h3>
                {
                    allmembers.map(member => {
                        return <div className="userprofilelistdetail" onClick={() => { storetheprofile(member) }}>
                            {member.image ? <div><img className="tinyprofileimage" src={`http://localhost:8000${member.image}`}></img></div> : ""}
                            <div>{member.user?.first_name} {member.user?.last_name}</div>
                            <div><div> {member.id === myprofile.id ? "" : <Link to={`/messages/new/${member.id}`}> <Message /></Link>} </div></div>

                        </div>
                    })
                }

            </div>
            <div>
                {
                    editstate ? <div className="userlistdetail">
                        <div> <div>{myprofile.user?.username}</div></div>
                        <fieldset>
                            <label htmlFor="profileimage"> Profile Image </label>
                           <button><input type="file" id="userimage" onChange={createGameImageString} /></button>
                        </fieldset>

                        <div>{myprofile.user?.first_name} {myprofile.user?.last_name}</div>
                        <input id="details" placeholder={myprofile.details} onChange={handlechangeinfo} />
                        <button onClick={() => savechanges()}>Save Changes</button>
                    </div> : <div className="userlistdetail">
                        <h3> My Profile</h3>
                        <div> <div>{myprofile.user?.username}</div></div>
                        {myprofile.image ? <div><img src={`http://localhost:8000${myprofile.image}`}></img></div> : ""}
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