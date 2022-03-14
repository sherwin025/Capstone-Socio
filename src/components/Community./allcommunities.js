import React, { useState, useEffect, useRef } from "react"
import { searchPublicCommunity, getCommunity } from "../requesthandlers/communitymanager"
import { checkcommunitymember, createcommunitymember, Deletecommunitymember } from "../requesthandlers/communitymembermanager"

export const AllCommunities = () => {
    const [community, setcommunity] = useState([])
    const [search, setsearch] = useState("")
    const [communitymembers, setmembers] = useState([])
    useEffect(() => {
        getCommunity().then(res => setcommunity(res))
    }, [])


    useEffect(() => {
        searchPublicCommunity(search).then(res => setcommunity(res))
    }, [search])

    const searchfunction = (event) => {
        setsearch(event.target.value)
    }

    const checkmembership = (event) => {
        for (const member of event.members) {
            if (member.member === parseInt(localStorage.getItem("member")) && member.approved === true) {
                return 1
            } else {
                return 0
            }
        }

    }

    const checkjoin = (event) => {
        checkcommunitymember(localStorage.getItem("member"), event.id)
        .then(res=> {
            if (res.length >= 1){
                return true
            } else {
                return false
            }
        })
    }

    const Cancelcommunityjoin = (event) => {
        return checkcommunitymember(localStorage.getItem("member"), event.id)
            .then(res => {
                Deletecommunitymember(res.id)

            })
    }

    const sendrequest = (id) => {
        return createcommunitymember({
            "member": localStorage.getItem("member"),
            "community": id.id,
            "admin": "false",
            "approved": "false"
        })
    }

    return (<>
        <div className="eventcontainer">

            <input onChange={searchfunction} type="text" placeholder="Search Term" />

            {
                community.map((event) => {
                    return <div className="indevent">
                        <div className="communitynameevent">{event.name} </div>
                        {
                            checkmembership(event) ? "" :
                                checkjoin(event) ?
                                    <button onClick={() => Cancelcommunityjoin(event)}> Cancel Request </button> :
                                    <button onClick={() => sendrequest(event)}> Request Join Group </button>
                        }
                    </div>
                }
                )
            }

            <button>Create a new Community</button>

        </div>

    </>)
}
