import { useEffect, useState } from "react"
import { createcommunitymessage, getCommunityMessages } from "../requesthandlers/messageboardmanager"
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import { Settings, Delete, Label } from "@material-ui/icons";

export const MessageBoard = ({communityid}) => {
    const [messages, setmessages] = useState([])
    const [addmessage, setaddmessage] = useState({})
    const [messageModal, setmessageModal] = useState(false)
    const togglemessageModal = () => setmessageModal(!messageModal)

    useEffect(()=>{
        getallmessages()
    },[communityid])

    const handleInput = (e) => {
        const copy = { ...addmessage }
        copy[e.target.id] = e.target.value
        setaddmessage(copy)
    }

    const getallmessages = () => {
        getCommunityMessages(communityid).then(res=> setmessages(res))
    }

    const sendmessage = () => {
        const messageobj = {
            "content": addmessage.content,
            "community": communityid
        }
        createcommunitymessage(messageobj).then
        (getallmessages).then(togglemessageModal)
    }

    return (<>
        messageboard:

        <Dialog
            className="edit-dialog"
            open={messageModal}
            onClose={togglemessageModal}
        >
            <DialogTitle className="edit-event-title">Add Message</DialogTitle>
            <DialogContent className="edit-event-content">
                <Input className="edit-event-input" id="content" type="text" onChange={handleInput}></Input>

                <div className="edit-event-btns">
                    <div className="edit-event-btn save"><Button className="edit-event-btn save" variant="outlined" onClick={sendmessage}>Send</Button></div>
                    <div className="edit-event-btn cancel"><Button className="edit-event-btn cancel" variant="outlined" onClick={(togglemessageModal)}>Cancel</Button></div>
                </div>
            </DialogContent>
        </Dialog>


        {
            messages.length > 0 ?
                messages.map(message => {
                    return <div>
                        <div>{message.content}</div>
                        <div>by: {message.member?.user?.username}</div>
                    </div>
                }) :
                "Currently No Community messages"
        }
        <button onClick={togglemessageModal}> Add Message</button>
    </>)
}