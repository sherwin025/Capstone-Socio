import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCommunityAnnouncement } from "../requesthandlers/announcementmanager"
import { getSingleCommunity } from "../requesthandlers/communitymanager"
import { getAllCommunityMembers } from "../requesthandlers/communitymembermanager"
import { getCommunityEvents } from "../requesthandlers/eventmanager"
import { getCommunityMessages } from "../requesthandlers/messageboardmanager"


export const CommunityDetails = () => {
    const { communityid } = useParams()
    const [community, setcommunity] = useState({})
    const [events, setevents] = useState([])
    const [announcements, setannouncements] = useState([])
    const [messages, setmessages] = useState([])
    const [members, setmembers] = useState([])

    useEffect(() => {
        getSingleCommunity(communityid).then(res => setcommunity(res))
        getCommunityEvents(communityid).then(res => setevents(res))
        getCommunityAnnouncement(communityid).then(res => setannouncements(res))
        getCommunityMessages(communityid).then(res=> setmessages(res))
        getAllCommunityMembers(communityid).then(res=> setmembers(res))
    }, [communityid])

    return (<>
        <div className="MainContainercomm">
            <div>
                <h1> {community?.name}</h1>
                <h6>members: {community?.member_count}</h6>
            </div>
            <div>
                Announcements
                {
                    announcements.length > 0 ?
                        announcements.map(event => { return <div>
                            <div>{event.title}</div>
                            <div>{event.details}</div>
                        </div> }) :
                        "Currently No Commnuity Announcements"
                }
            </div>
            <div>
                Events:
                {
                    events.length > 0 ?
                        events.map(event => {
                            return <div>
                                <div>{event.name}</div>
                                <div>{event.details}</div>
                                <div>attending count : {event.attending_count}</div>
                            </div>
                        }) :
                        "Currently No Community Events"
                }
            </div>
            <div>
                messageboard:
                {
                    messages.length > 0 ?
                        messages.map(message => {
                            return <div>
                                <div>{message.content}</div>
                                <div>by: {message.member?.user?.username }</div>
                                
                            </div>
                        }) :
                        "Currently No Community messages"
                }

            </div>
            <div>
                Joined Users:
                {
                    members.map(each=> {
                        return <div>{each.member?.user?.username}</div>
                    })
                }
            </div>
        </div>

    </>)
}