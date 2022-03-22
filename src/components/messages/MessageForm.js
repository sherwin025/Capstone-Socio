import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createmessage } from "../requesthandlers/directmessagesmanager"
import { getMembers } from "../requesthandlers/usermanager"


export const MessageForm = () => {
    const [users, setusers] = useState([])
    const [newmessage, setnewmessage] = useState({})
    const history = useHistory()
    const [base64string, setbase] = useState(null)

    useEffect(() => {
        getMembers().then(res => setusers(res))
    }, [])

    const handleinput = (event) => {
        let copy = { ...newmessage }
        copy[event.target.id] = event.target.value
        console.log(copy)
        setnewmessage(copy)
    }

    const sendmessage = (e) => {
        let messageobj = { ...newmessage }
        messageobj["read"] = true
        messageobj["sender"] = localStorage.getItem('member')
        messageobj["image"] = base64string
        createmessage(messageobj).then(() => history.push("/messages"))
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


    return (<>
        <form className="form--login">

            <fieldset>
                <label htmlFor="recipient"> To: </label>
                <select id="recipient" value={newmessage.recipient} onChange={(e) => { handleinput(e) }} >
                    <option>Select a user</option>
                    {
                        users.map(each => {
                            return <option value={each.id}>
                                {each?.user?.username}
                            </option>
                        })
                    }
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
                <input type="file" id="userimage" onChange={createGameImageString} />
            </fieldset>
            <fieldset>
                <button type="button" onClick={() => sendmessage()} > Send Message </button>
            </fieldset>
        </form>
    </>)
}