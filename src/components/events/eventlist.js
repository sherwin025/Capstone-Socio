import React, { useEffect, useState } from "react"
import { createEvent, DeleteEvent, getCommunityEvents, joinEvent, leaveEvent, UpdateEvent } from "../requesthandlers/eventmanager"
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import { Settings, Delete, Label } from "@material-ui/icons";
import { Link } from "react-router-dom";

export const CommunityEventList = ({ communityid }) => {
    const [events, setevents] = useState([])

    const [eventToEdit, seteventToEdit] = useState({})
    const [editModal, setEditModal] = useState(false)
    const toggleEditModal = () => setEditModal(!editModal)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [deleteDiag, setDeleteDiag] = useState(false)
    const toggleDeleteDiag = () => setDeleteDiag(!deleteDiag)

    useEffect(() => {
        getCommunityEvents(communityid).then(res => setevents(res))
    }, [])

    useEffect(() => {
        getCommunityEvents(communityid).then(res => setevents(res))
    }, [newInfo])

    const handleInput = (e) => {
        const copy = { ...eventToEdit }
        copy[e.target.id] = e.target.value
        seteventToEdit(copy)
    }

    const saveEvent = () => {
        const eventobj = {
            "id": eventToEdit.id,
            "name": eventToEdit.name,
            "details": eventToEdit.details,
            "address": eventToEdit.address,
            "date": eventToEdit.date,
            "time": eventToEdit.time,
            "approved": eventToEdit.approved,
            "public": eventToEdit.public,
            "community": eventToEdit.community,
            "member": eventToEdit.member,
            "isactivity": eventToEdit.isactivity,
            "zipcode": eventToEdit.zipcode
        }

        UpdateEvent(eventobj).then(() => {
            alertNewInfo()
            toggleEditModal()
        })
    }

    const DeletetheEvent = () => {
        DeleteEvent(eventToEdit.id).then(() => {
            alertNewInfo()
            toggleDeleteDiag()
        })
    }

    return (<>
        Events:


        <Dialog
            className="edit-dialog"
            open={editModal}
            onClose={toggleEditModal}
        >
            <DialogTitle className="edit-event-title">Edit This Event</DialogTitle>
            <DialogContent className="edit-event-content">
                <Label /> Event Name
                <Input className="edit-event-input" id="name" type="text" value={eventToEdit.label} onChange={handleInput} placeholder={eventToEdit.name} ></Input>
                <Label /> Event Details
                <Input className="edit-event-input" id="details" type="text" value={eventToEdit.label} onChange={handleInput} placeholder={eventToEdit.details}></Input>
                <Label /> Event address
                <Input className="edit-event-input" id="address" type="text" value={eventToEdit.label} onChange={handleInput} placeholder={eventToEdit.address}></Input>
                <Label /> Date
                <Input className="edit-event-input" id="date" type="text" value={eventToEdit.label} onChange={handleInput} placeholder={eventToEdit.date}></Input>
                <Label /> Time
                <Input className="edit-event-input" id="time" type="text" value={eventToEdit.label} onChange={handleInput} placeholder={eventToEdit.time}></Input>

                <div className="edit-event-btns">
                    <div className="edit-event-btn save"><Button className="edit-event-btn save" variant="outlined" onClick={saveEvent}>Update</Button></div>
                    <div className="edit-event-btn cancel"><Button className="edit-event-btn cancel" variant="outlined" onClick={(toggleEditModal)}>Cancel</Button></div>
                </div>
            </DialogContent>
        </Dialog>

        <Dialog
            className="edit-dialog"
            open={deleteDiag}
            onClose={toggleDeleteDiag}
        >
            <DialogTitle className="delete-tag-title">Are You Sure You Want to Delete This Event?</DialogTitle>
            <DialogContent className="edit-tag-btns">
                <div className="edit-tag-btn save"><Button className="delete-btn" variant="outlined" color="error" onClick={DeletetheEvent}>Delete</Button></div>
                <div className="edit-tag-btn cancel"><Button variant="outlined" onClick={toggleDeleteDiag}>Cancel</Button></div>
            </DialogContent>

        </Dialog>




        {
            events.length > 0 ?
                events.map(event => {
                    return event.approved === true ?
                        <div>
                            <div>{event.name}</div>
                            <div>{event.details}</div>
                            <div>{event.date}</div>
                            <div>{event.time}</div>
                            {event.image ? <div><img src={`http://localhost:8000${event.image}`}></img></div>: ""}
                            <div>attending count : {event.attending_count}</div>
                            <div> {event.member?.id === parseInt(localStorage.getItem("member")) ?
                                <div>
                                    <button onClick={() => {
                                        seteventToEdit(event)
                                        toggleEditModal()
                                    }}>
                                        <Settings />
                                    </button>
                                    <button onClick={() => {
                                        seteventToEdit(event)
                                        toggleDeleteDiag()
                                    }}>
                                        <Delete />
                                    </button>
                                </div> : ""}
                            </div>
                            <div> {event.member?.id === parseInt(localStorage.getItem("member")) ?
                                "" :
                                event.attendees.some((each) =>each.user === parseInt(localStorage.getItem("member"))) ?
                                    <button onClick={()=>{
                                        leaveEvent(event.id).then(getCommunityEvents(communityid).then(res => setevents(res)))
                                    }}>Leave Event</button> : <button onClick={()=>{
                                        joinEvent(event.id).then(getCommunityEvents(communityid).then(res => setevents(res)))
                                    }}>Join Event</button>
                            }</div>
                        </div>
                        : ""
                }) :
                "Currently No Community Events"
        }
        <div><button><Link to={`/events/new/${communityid}`}>Create a new Event</Link></button></div>
    </>)
}