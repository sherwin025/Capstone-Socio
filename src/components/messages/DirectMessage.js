
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMessages } from "../requesthandlers/directmessagesmanager"
import { getMembers } from "../requesthandlers/usermanager"

export const DirectMessaages = () => {
    const [users, setusers] = useState([])
    const [messages, setmessages] = useState([])

    useEffect(()=> {
        getMembers().then(res=>setusers(res))
        getMessages().then(res=>setmessages(res))
    }, [])
    
    return (<> 
        <div>
        <Link to="/messages/new"> <button> New Message</button></Link>
        </div>
        <div>
            Inbox: 
            {
                messages.map(
                    (message) => {
                        return  message.recipient?.id === parseInt(localStorage.getItem("member")) ? <div> <div>{message.content}</div> <div>From: {message.sender?.user?.username}</div></div>: ""
                    }
                )
            }

        </div>
        <div>
            Outbox:
            {
                messages.map(
                    (message) => {
                        return  message.sender?.id === parseInt(localStorage.getItem("member")) ? <div> <div>{message.content}</div> <div>From: {message.sender?.user?.username}</div></div>: ""
                    }
                )
            }
        </div>

    
    </>)

}