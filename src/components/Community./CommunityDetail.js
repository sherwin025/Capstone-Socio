import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { CommunityAnnouncementList } from "../announcements/announcementlist"
import { CommunityEventList } from "../events/eventlist"
import { MessageBoard } from "../messageboard/messageboardlist"
import { getSingleCommunity } from "../requesthandlers/communitymanager"
import { checkcommunitymember, createcommunitymember, Deletecommunitymember, getAllCommunityMembers } from "../requesthandlers/communitymembermanager"



export const CommunityDetails = () => {
    const { communityid } = useParams()
    const [community, setcommunity] = useState({})
    const [members, setmembers] = useState([])
 
    useEffect(() => {
        getpagerender()
    }, [communityid])

    const checkadmin = () => {
        return members.some((each) => each.member?.id === parseInt(localStorage.getItem("member")) && each.admin === true)
    }

    const checkjoin = () => {
        return members.some((member)=>member.member?.id === parseInt(localStorage.getItem("member")))

    }

    const checkmembership = () => {
        return members.some((member)=>member.member?.id === parseInt(localStorage.getItem("member")) && member.approved === true) 
    }

    const sendrequest = (id) => {
        return createcommunitymember({
            "member": localStorage.getItem("member"),
            "community": id,
            "admin": "false",
            "approved": "false"
        })
    }

    const Cancelcommunityjoin = (id) => {
        return checkcommunitymember(localStorage.getItem("member"), id)
            .then(res => {
                for (const item of res) {
                    Deletecommunitymember(item.id)
                }
            })
    }

    const getpagerender = () => {
        getSingleCommunity(communityid).then(res => setcommunity(res))
        getAllCommunityMembers(communityid).then(res => setmembers(res))
    }


    return (<>
        <div className="MainContainercomm">
            <div>
                <h1> {community?.name}</h1>
                <h6>members: {community?.member_count}</h6>

                {
                    checkadmin() ? <Link to={`/communities/${communityid}/admin`}>Community Admin Page</Link> : ""
                }

                {
                     checkmembership() ? "" :
                     checkjoin() ?
                     <button onClick={() => Cancelcommunityjoin(communityid).then(()=>getpagerender())}> Cancel Request </button> :
                     <button onClick={() => sendrequest(communityid).then(()=>getpagerender())}> Request Join Group </button> 
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
                        return <div> {each.approved ? each.member?.user?.username : ""}</div>
                    })
                }
            </div>
        </div>

    </>)
}