
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMessages } from "../requesthandlers/directmessagesmanager"
import { getMembers } from "../requesthandlers/usermanager"
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";

export const DirectMessaages = () => {
    const [users, setusers] = useState([])
    const [messages, setmessages] = useState([])
    const [messagedetail, setmessagedetail] = useState({})
    const [messageModal, setmessageModal] = useState(false)
    const [thesender, setthesender] = useState(false)
    const togglemessageModal = () => setmessageModal(!messageModal)

    useEffect(() => {
        getMembers().then(res => setusers(res))
        getMessages().then(res => setmessages(res))
    }, [])

    const handlemessageinput = (message) => {
        if (message.sender?.id === parseInt(localStorage.getItem("member"))) {
            setthesender(true)
        }
        setmessagedetail(message)
        togglemessageModal()

    }

    return (<>
        <div>
            <Dialog
                className="edit-dialog"
                open={messageModal}
                onClose={togglemessageModal}
            >
                <DialogTitle className="edit-event-title">Conversation with { thesender? messagedetail.recipient?.user?.username : messagedetail.sender?.user?.username}</DialogTitle>
                <DialogContent className="edit-event-content">
                    <div className="edit-event-input" id="content" type="text" >Title: {messagedetail.title} </div>
                    <div className="edit-event-input" id="content" type="text" >Message: {messagedetail.content} </div>
                    <div>{ messagedetail.image ? <img src={`http://localhost:8000${messagedetail.image}`}></img>:""}</div>
                    <Link to={`/messages/new/${messagedetail.recipient?.id}`}><button>Reply to this Message</button></Link>
                </DialogContent>
            </Dialog>


            <Link to="/messages/new"> <button> New Message</button></Link>
        </div>
        <div>
            Inbox:
            {
                messages.map(
                    (message) => {
                        return message.recipient?.id === parseInt(localStorage.getItem("member")) ? <div onClick={() => handlemessageinput(message)}> <div>{message.title}</div> <div>From: {message.sender?.user?.username}</div></div> : ""
                    }
                )
            }

        </div>
        <div>
            Outbox:
            {
                messages.map(
                    (message) => {
                        return message.sender?.id === parseInt(localStorage.getItem("member")) ? <div onClick={() => handlemessageinput(message)}> <div>{message.title}</div> <div>To: {message.recipient?.user?.username}</div></div> : ""
                    }
                )
            }
        </div>


    </>)

}