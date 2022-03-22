import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { searchPublicCommunity, getCommunity } from "../requesthandlers/communitymanager"
import { checkcommunitymember, createcommunitymember, Deletecommunitymember } from "../requesthandlers/communitymembermanager"

export const AllCommunities = ({ parent }) => {
    const [community, setcommunity] = useState([])
    const [search, setsearch] = useState("")

    useEffect(() => {
        getpagerender()
    }, [])

    useEffect(() => {
        searchPublicCommunity(search).then(res => setcommunity(res))
    }, [search])

    const searchfunction = (event) => {
        setsearch(event.target.value)
    }

    const checkmembership = (community) => {
        return community.members.some((member) => member.member === parseInt(localStorage.getItem("member")) && member.approved === true)
    }

    const checkjoin = (community) => {
        return community.members.some((member) => member.member === parseInt(localStorage.getItem("member")))
    }


    const Cancelcommunityjoin = (community) => {
        return checkcommunitymember(localStorage.getItem("member"), community.id)
            .then(res => {
                for (const item of res) {
                    Deletecommunitymember(item.id)
                }
            })
    }

    const sendrequest = (event) => {
        return createcommunitymember({
            "member": localStorage.getItem("member"),
            "community": event.id,
            "admin": "false",
            "approved": "false"
        })
    }

    const getpagerender = () => {
        getCommunity().then(res => setcommunity(res))
    }

    return (<>
        <div className="allcommunitiessearch">
            <input className="searchbox" onChange={searchfunction} type="text" placeholder="Search Communities" />

            <div className="commcards">
                {
                    community.map((community) => {
                        return parent ? community.parentportal ? <div className="indcommunity">
                            <div>{community.image ? <img className="communityimage" src={`http://localhost:8000${community.image}`}></img> : ""}</div>
                            <Link to={`/communities/${community.id}`}><div className="communitynamecommunity">{community.name} </div></Link>
                            {
                                checkmembership(community) ? "" :
                                    checkjoin(community) ?
                                        <button className="joinleavecomm" onClick={() => Cancelcommunityjoin(community).then(getpagerender)}> Cancel Request </button> :
                                        <button className="joinleavecomm" onClick={() => sendrequest(community).then(getpagerender)}> Request Join Group </button>
                            }
                        </div> : "" : <div className="indcommunity">
                            <div>{community.image ? <img className="communityimage" src={`http://localhost:8000${community.image}`}></img> : ""}</div>
                            <Link to={`/communities/${community.id}`}><div className="communitynamecommunity">{community.name} </div></Link>
                            {
                                checkmembership(community) ? "" :
                                    checkjoin(community) ?
                                        <button className="joinleavecomm" onClick={() => Cancelcommunityjoin(community).then(getpagerender)}> Cancel Request </button> :
                                        <button className="joinleavecomm" onClick={() => sendrequest(community).then(getpagerender)}> Request Join Group </button>
                            }
                        </div>
                    }
                    )
                }
            </div>
            <Link to="./newcommunity" >Create a new Community</Link>

        </div>

    </>)
}
