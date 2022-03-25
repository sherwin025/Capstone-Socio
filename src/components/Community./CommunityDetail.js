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
            <div className="commdetailheading">
                <div>
                    {community.image ? <div><img className="communityimagedet1" src={`http://localhost:8000${community.image}`}></img></div> : ""}
                </div>
                <div>
                    <h1> {community?.name}</h1>
                    <h6 className="selfcentered ">members: {community?.member_count}</h6>

                    {
                        checkadmin() ? <Link className="selfcentered" to={`/communities/${communityid}/admin`}>Community Admin Page</Link> : ""
                    }

                    {
                        checkmembership() ? "" :
                            checkjoin() ?
                                <button onClick={() => Cancelcommunityjoin(communityid)}> Cancel Request </button> :
                                <button onClick={() => sendrequest(communityid)}> Request Join Group </button>
                    }
                </div>
                <div>
                    {community.image ? <div><img className="communityimagedet2" src={`http://localhost:8000${community.image}`}></img></div> : ""}
                </div>
            </div>
            <div className="spacebetween">
                <div className="detailscomponents">
                    {
                        checkmembership() ? <div className="detailscomponents">
                            <div className="commdetailcompoent">
                                <CommunityEventList communityid={communityid} />
                            </div>
                            <div className="commdetailcompoent">
                                <CommunityAnnouncementList communityid={communityid} />
                            </div>
                            <div >
                                <div className="commdetailcompoentmessages">
                                    <MessageBoard communityid={communityid} />
                                </div>
                                <div className="commdetailcompoentmessages ">
                                    <h4>Joined Users:</h4>
                                    {
                                        members.map(each => {
                                            return each.member?.id === parseInt(localStorage.getItem("member")) ? <div> {each.member?.user?.username} </div> : <div> {each.approved ? <div> {each.member?.user?.username} <Link to={`/messages/new/${each.id}`}> <Message /></Link> </div> : ""}</div>
                                        })
                                    }
                                </div>
                            </div>
                        </div> : "Must be a member to view page "

                    }

                </div>

            </div>
        </div>

    </>)
}