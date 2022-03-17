import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { CommunityAnnouncementList } from "../announcements/announcementlist"
import { CommunityEventList } from "../events/eventlist"
import { MessageBoard } from "../messageboard/messageboardlist"
import { getCommunityAnnouncement } from "../requesthandlers/announcementmanager"
import { getSingleCommunity } from "../requesthandlers/communitymanager"
import { getAllCommunityMembers } from "../requesthandlers/communitymembermanager"
import { getCommunityEvents } from "../requesthandlers/eventmanager"
import { getCommunityMessages } from "../requesthandlers/messageboardmanager"


export const CommunityDetails = () => {
    const { communityid } = useParams()
    const [community, setcommunity] = useState({})
    const [members, setmembers] = useState([])

    useEffect(() => {
        getSingleCommunity(communityid).then(res => setcommunity(res))
        getAllCommunityMembers(communityid).then(res => setmembers(res))
    }, [communityid])

    const checkadmin = () => {
        return members.some((each)=> each.member?.id === parseInt(localStorage.getItem("member")) && each.admin === true)
    }

    return (<>
        <div className="MainContainercomm">
            <div>
                <h1> {community?.name}</h1>
                <h6>members: {community?.member_count}</h6>
                
                {
                   checkadmin() ? <Link to={`/communities/${communityid}/admin`}>Community Admin Page</Link> : ""
                }

            </div>
            <div>
                <CommunityAnnouncementList communityid={communityid} />
            </div>
            <div>
                <CommunityEventList communityid={communityid} />
            </div>
            <div>
                <MessageBoard communityid={communityid} />
            </div>
            <div>
                Joined Users:
                {
                    members.map(each => {
                        return <div> {each.approved ? each.member?.user?.username: ""}</div>
                    })
                }
            </div>
        </div>

    </>)
}