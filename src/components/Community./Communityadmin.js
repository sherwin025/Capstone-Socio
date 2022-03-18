import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Deleteannouncement, getCommunityAnnouncement, Updateannouncement } from "../requesthandlers/announcementmanager"
import { Deletecommunitymember, getAllCommunityMembers, Updatecommunitymember } from "../requesthandlers/communitymembermanager"
import { DeleteEvent, getCommunityEvents, UpdateEvent } from "../requesthandlers/eventmanager"



export const CommunityAdmin = () => {
    const { communityid } = useParams()
    const [Announcements, setAnnouncements] = useState([])
    const [members, setmembers] = useState([])
    const [events, setevents] = useState([])
    const [newinfo, setnewinfo] = useState(false)

    useEffect(() => {
        getCommunityAnnouncement(communityid).then(res => setAnnouncements(res))
        getAllCommunityMembers(communityid).then(res => setmembers(res))
        getCommunityEvents(communityid).then(res => setevents(res))
    }, [communityid])

    useEffect(() => {
        getCommunityAnnouncement(communityid).then(res => setAnnouncements(res))
        getAllCommunityMembers(communityid).then(res => setmembers(res))
        getCommunityEvents(communityid).then(res => setevents(res))
    }, [newinfo])


    const approveannouncement = (each) => {
        const annobj = {
            "approved": true,
            "comments": each.comments,
            "community": each.community?.id,
            "details": each.details,
            "id": each.id,
            "member": each.member?.id,
            "title": each.title,
            "zipcode": each.zipcode,
            "public": each.public
        }

        return Updateannouncement(annobj).then(() =>
            setnewinfo(!newinfo)
        )
    }

    const approvemember = (member) => {
        const copy = { ...member }
        copy.approved = true
        return Updatecommunitymember(copy).then(() =>
            setnewinfo(!newinfo)
        )
    }

    const approveevent = (event) => {
        const copy = { ...event }
        copy.approved = true
        delete copy.image
        return UpdateEvent(copy).then(() =>
            setnewinfo(!newinfo)
        )
    }


    return (<>
        <div className="MainContainercomm">
            Pending Approvals:
            <div>
                Members:
                {
                    members.map(each => {
                        return <div> {each.approved ? "" : <div>
                            <div>{each.member?.user?.username} </div>
                            <div><button onClick={() => approvemember(each)}> Approve </button></div>
                            <div><button onClick={() => Deletecommunitymember(each.id).then(() => setnewinfo(!newinfo))} > Deny</button></div>
                        </div>
                        }</div>
                    })
                }
            </div>
            <div>
                Announcements:
                {
                    Announcements.map(each => {
                        return <div> {each.approved ? "" : <div>
                            <div> {each.title}</div>
                            <div> {each.details}</div>
                            {each.image ? <div><img src={`http://localhost:8000${each.image}`}></img></div>: ""}
                            <div> by: {each.member?.user?.username}</div>
                            <div><button onClick={() => approveannouncement(each)} > Approve</button></div>
                            <div><button onClick={() => Deleteannouncement(each.id).then(() => setnewinfo(!newinfo))}> Deny</button></div>
                        </div>}</div>
                    })
                }
            </div>
            <div>
                Events:
                {
                    events.map(each => {
                        return <div> {each.approved ? "" : <div>
                            <div> {each.name}</div>
                            <div> {each.details}</div>
                            <div> {each.date}</div>
                            <div> {each.time}</div>
                            {each.image ? <div><img src={`http://localhost:8000${each.image}`}></img></div>: ""}
                            <div> by: {each.member?.user?.username}</div>
                            <div><button onClick={() => approveevent(each)}> Approve</button></div>
                            <div><button onClick={() => DeleteEvent(each.id).then(() => setnewinfo(!newinfo))}> Deny</button></div>
                        </div>}</div>
                    })
                }
            </div>
            <Link to="./"><button>Back to main</button> </Link>
        </div>

    </>)
}