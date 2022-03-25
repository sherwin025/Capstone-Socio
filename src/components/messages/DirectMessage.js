
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMessages } from "../requesthandlers/directmessagesmanager"
import { getMembers } from "../requesthandlers/usermanager"
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import "./messages.css"

export const DirectMessaages = () => {
    const [users, setusers] = useState([])
    const [messages, setmessages] = useState([])
    const [messageModal, setmessageModal] = useState(false)
    const [threaduser, setthreaduser] = useState({})
    const [allmessagesthread, setallmessagesthread] = useState([])
    const togglemessageModal = () => setmessageModal(!messageModal)

    useEffect(() => {
        getMembers().then(res => setusers(res))
        getMessages().then(res => setmessages(res))
    }, [])


    const handlemessageinput = (userobj) => {
        let copy = [...allmessagesthread]
        for (const message of messages) {
            if (message.sender?.id === userobj.id || message.recipient?.id === userobj.id) {
                copy.push(message)
                setallmessagesthread(copy)
            }
        }
        setthreaduser(userobj)
        togglemessageModal()
    }

    const clearall = () => {
        setallmessagesthread([])
        togglemessageModal()
    }

    const userswithmessages = () => {
        const relationships = users.filter((user) => {
            return messages.some(each => each.recipient?.id === user.id || each.sender?.id === user.id)
        })
        return relationships
    }

    return (<>
        <div>
            <Dialog
                className="edit-dialog"
                open={messageModal}
                onClose={clearall}
            >
                <DialogTitle className="edit-event-title">Conversation with {threaduser.user?.username}</DialogTitle>
                <DialogContent className="edit-event-content">
                    {
                        allmessagesthread.map(messagedetail => <div>
                            <div> {messagedetail.sender?.id === parseInt(localStorage.getItem('member')) ? <div> To: {messagedetail.recipient?.user?.username} </div> : <div> From: {messagedetail.sender?.user?.username} </div>}</div>
                            <div className="edit-event-input" id="content" type="text" >Title: {messagedetail.title} </div>
                            <div className="edit-event-input" id="content" type="text" >Message: {messagedetail.content} </div>
                            <div>{messagedetail.image ? <img src={`http://localhost:8000${messagedetail.image}`}></img> : ""}</div>
                            {
                                <div> {messagedetail.sender?.id === parseInt(localStorage.getItem('member')) ? "" : <Link to={`/messages/new/${messagedetail.sender?.id}`}><button>Reply to this Message</button></Link>}</div>
                            }
                        </div>)
                    }
                </DialogContent>
            </Dialog>


            <Link to="/messages/new"> <button> New Message</button></Link>
        </div>

        <div className="mainmessages">
            <h3>Message Threads</h3>
            {
                userswithmessages().map(each => { return  parseInt(localStorage.getItem('member')) === each.id ? "" : <div onClick={()=> handlemessageinput(each)}><h5>{each.user?.username}</h5></div> })
            }
        </div>

    </>)

}