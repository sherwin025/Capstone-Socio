import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCommunity, getUserCommunity } from "../requesthandlers/communitymanager"

export const Communityhomepage = () => {
    const [community, setcommunity] = useState([])

    useEffect(()=>{
        getUserCommunity(localStorage.getItem("member")).then(res=>setcommunity(res))
    }, [])

    return (<> 
    <div className="eventcontainer">
    <h3>Your Communities</h3>
    {
        community.length >= 1? 
        community.map((event)=> {
            return <div className="indevent">
                <div className="communitynameevent"><Link to={`/communities/${event.id}`}> {event.name} </Link></div>
            </div>
        }
        )
        : 
        "Not currently apart of any communities"
    }

    </div>

    </>)


}