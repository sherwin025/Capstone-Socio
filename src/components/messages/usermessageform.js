import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { createmessage } from "../requesthandlers/directmessagesmanager"
import { getMembers, getSpecificMembers } from "../requesthandlers/usermanager"


export const UserMessageForm = () => {
    const { userid } = useParams()
    const [users, setusers] = useState({})
    const [newmessage, setnewmessage] = useState({})
    const history = useHistory()
    const [base64string, setbase] = useState(null)

    useEffect(() => {
        getSpecificMembers(userid).then(res => setusers(res))
    }, [userid])

    const handleinput = (event) => {
        let copy = { ...newmessage }
        copy[event.target.id] = event.target.value
        console.log(copy)
        setnewmessage(copy)
    }

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

    const sendmessage = (e) => {
        let messageobj = { ...newmessage }
        messageobj["recipient"] = userid
        messageobj["read"] = true
        messageobj["sender"] = localStorage.getItem('member')
        messageobj["image"] = base64string
        createmessage(messageobj).then(() => history.push("/messages"))
    }

    return (<>
        <form className="form--login">

            <fieldset>
                <label htmlFor="recipient"> To: </label>
                <select id="recipient" value={newmessage.recipient} onChange={(e) => { handleinput(e) }} >
                    <option>
                        {users?.user?.username}
                    </option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="lastname"> Title: </label>
                <input type="text" id="title" className="form-control" onChange={(e) => { handleinput(e) }} required />
            </fieldset>
            <fieldset>
                <label htmlFor="lastname"> Content: </label>
                <input type="text" id="content" className="form-control" onChange={(e) => { handleinput(e) }} required />
            </fieldset>
            <fieldset>
                <input type="file" id="image" onChange={createGameImageString} />
            </fieldset>
            <fieldset>
                <button type="button" onClick={() => sendmessage()} > Send Message </button>
            </fieldset>
        </form>
    </>)
}