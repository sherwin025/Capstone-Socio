import React, { useEffect, useState } from "react"
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import { Settings, Delete, Label } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { createannouncementcomment, Deleteannouncement, getCommunityAnnouncement, getCommunityAnnouncementComments, Updateannouncement } from "../requesthandlers/announcementmanager";

export const CommunityAnnouncementList = ({ communityid }) => {
    const [Announcements, setAnnouncements] = useState([])

    const [announcementToEdit, setannouncementToEdit] = useState({})
    const [editModal, setEditModal] = useState(false)
    const toggleEditModal = () => setEditModal(!editModal)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [deleteDiag, setDeleteDiag] = useState(false)
    const toggleDeleteDiag = () => setDeleteDiag(!deleteDiag)
    const [showcomments, setshowcomments] = useState(false)
    const togglecomments = () => setshowcomments(!showcomments)
    const [announcementtosee, setannouncementtosee] = useState({})
    const [allcomments, setallcomments] = useState([])
    const [newcomment, setnewcomment] = useState({})

    useEffect(() => {
        getCommunityAnnouncement(communityid).then(res => setAnnouncements(res))
        getCommunityAnnouncementComments().then(res => setallcomments(res))
    }, [])

    useEffect(() => {
        getCommunityAnnouncement(communityid).then(res => setAnnouncements(res))
        getCommunityAnnouncementComments().then(res => setallcomments(res))
    }, [newInfo])

    const handleInput = (e) => {
        const copy = { ...announcementToEdit }
        copy[e.target.id] = e.target.value
        setannouncementToEdit(copy)
    }

    const handlecommentInput = (e) => {
        const copy = { ...newcomment }
        copy["details"] = e.target.value
        setnewcomment(copy)
    }

    const saveAnnouncement = () => {
        const Announcementobj = {
            "id": announcementToEdit.id,
            "title": announcementToEdit.title,
            "details": announcementToEdit.details,
            "approved": announcementToEdit.approved,
            "community": announcementToEdit.community,
            "member": announcementToEdit.member,
            "comments": announcementToEdit.comments,
            "public": announcementToEdit.public,
            "zipcode": announcementToEdit.zipcode
        }

        Updateannouncement(Announcementobj).then(() => {
            alertNewInfo()
            toggleEditModal()
        })
    }

    const DeletetheAnnouncement = () => {
        Deleteannouncement(announcementToEdit.id).then(() => {
            alertNewInfo()
            toggleDeleteDiag()
        })
    }

    const addnewcomment = (id) => {
        const commentobj = {
            "announcement": id,
            "member": localStorage.getItem('member'),
            "details": newcomment.details
        }

        createannouncementcomment(commentobj).then(()=>{
            document.getElementById("thecommentdetails").value=""
        }).then(() => {
            alertNewInfo()
        })
    }
    return (<>
        Announcements:


        <Dialog
            className="edit-dialog"
            open={editModal}
            onClose={toggleEditModal}
        >
            <DialogTitle className="edit-event-title">Edit This Announcement</DialogTitle>
            <DialogContent className="edit-event-content">
                <Label /> Title
                <Input className="edit-event-input" id="title" type="text" value={announcementToEdit.label} onChange={handleInput} placeholder={announcementToEdit.title} ></Input>
                <Label /> Details
                <Input className="edit-event-input" id="details" type="text" value={announcementToEdit.label} onChange={handleInput} placeholder={announcementToEdit.details}></Input>
                <Label /> Zip Code
                <Input className="edit-event-input" id="zipcode" type="text" value={announcementToEdit.label} onChange={handleInput} placeholder={announcementToEdit.zipcode}></Input>

                <div className="edit-event-btns">
                    <div className="edit-event-btn save"><Button className="edit-event-btn save" variant="outlined" onClick={saveAnnouncement}>Update</Button></div>
                    <div className="edit-event-btn cancel"><Button className="edit-event-btn cancel" variant="outlined" onClick={(toggleEditModal)}>Cancel</Button></div>
                </div>
            </DialogContent>
        </Dialog>

        <Dialog
            className="edit-dialog"
            open={deleteDiag}
            onClose={toggleDeleteDiag}
        >
            <DialogTitle className="delete-tag-title">Are You Sure You Want to Delete This Announcement?</DialogTitle>
            <DialogContent className="edit-tag-btns">
                <div className="edit-tag-btn save"><Button className="delete-btn" variant="outlined" color="error" onClick={DeletetheAnnouncement}>Delete</Button></div>
                <div className="edit-tag-btn cancel"><Button variant="outlined" onClick={toggleDeleteDiag}>Cancel</Button></div>
            </DialogContent>

        </Dialog>

        <Dialog
            className="edit-dialog"
            open={showcomments}
            onClose={togglecomments}
        >
            <DialogTitle className="delete-tag-title">{announcementtosee.details}</DialogTitle>
            <DialogContent className="edit-tag-btns">
                {
                    allcomments.map((comment)=> {
                        return comment.announcement?.id ===  announcementtosee.id ? <div> <div> {comment.details}</div> <div> {comment.member?.user?.username}</div></div>: ""
                    } )
                }
                <Label /> Add Comment
                <Input className="edit-event-input" id="thecommentdetails" type="text" onChange={handlecommentInput}> </Input>

                <div className="edit-tag-btn cancel"><Button variant="outlined" onClick={()=>addnewcomment(announcementtosee.id)}>Comment</Button></div>
                <div className="edit-tag-btn cancel"><Button variant="outlined" onClick={togglecomments}>Close</Button></div>
            </DialogContent>

        </Dialog>




        {
            Announcements.length > 0 ?
                Announcements.map(Announcement => {
                    return Announcement.approved === true ?
                        <div>
                            <div>{Announcement.name}</div>
                            <div>{Announcement.details}</div>
                            <div>{Announcement.comments ? <button onClick={() => {
                                setannouncementtosee(Announcement)
                                togglecomments()
                            }}>comments</button> : ""}</div>
                            <div> {Announcement.member?.id === parseInt(localStorage.getItem("member")) ?
                                <div>
                                    <button onClick={() => {
                                        setannouncementToEdit(Announcement)
                                        toggleEditModal()
                                    }}>
                                        <Settings />
                                    </button>
                                    <button onClick={() => {
                                        setannouncementToEdit(Announcement)
                                        toggleDeleteDiag()
                                    }}>
                                        <Delete />
                                    </button>
                                </div> : ""}
                            </div>
                        </div>
                        : ""
                }) :
                "Currently No Community Announcements"
        }
        <div><button><Link to={`/announcements/new/${communityid}`}>Create a new Announcement</Link></button></div>
    </>)
}