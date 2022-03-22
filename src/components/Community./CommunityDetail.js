import { Message } from "@material-ui/icons"
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
        return members.some((member) => member.member?.id === parseInt(localStorage.getItem("member")))

    }

    const checkmembership = () => {
        return members.some((member) => member.member?.id === parseInt(localStorage.getItem("member")) && member.approved === true)
    }

    const sendrequest = (id) => {
        return createcommunitymember({
            "member": localStorage.getItem("member"),
            "community": id,
            "admin": "false",
            "approved": "false"
        }).then(getpagerender)
    }

    const Cancelcommunityjoin = (id) => {
        return checkcommunitymember(localStorage.getItem("member"), id)
            .then(res => {
                for (const item of res) {
                    Deletecommunitymember(item.id).then(getpagerender)
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
                            <button onClick={() => Cancelcommunityjoin(communityid)}> Cancel Request </button> :
                            <button onClick={() => sendrequest(communityid)}> Request Join Group </button>
                }
            </div>
            {
                checkmembership() ? <div>
                    <div>
                        <CommunityAnnouncementList communityid={communityid} />
                    </div>
                    <div>
                        <CommunityEventList communityid={communityid} />
                    </div>
                    <div>
                        <MessageBoard communityid={communityid} />
                    </div>

                </div> : "Must be a member to view page "

            }
            <div>
                Joined Users:
                {
                    members.map(each => {
                        return  each.member?.id === parseInt(localStorage.getItem("member"))  ? <div> {each.member?.user?.username} </div> : <div> {each.approved ? <div> {each.member?.user?.username} <Link to={`/messages/new/${each.id}`}> <Message /></Link> </div> : ""}</div>
                    })
                }
            </div>
        </div>

    </>)
}