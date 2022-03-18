import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAnnouncement } from "../requesthandlers/announcementmanager"

export const Announcementshomepage = () => {
    const [announ, setannoun] = useState([])

    useEffect(()=>{
        getAnnouncement().then(res=>setannoun(res))
    }, [])

    return (<> 
    <div className="eventcontainer">
    Local Community Announcements
    {
        announ.length >= 1? 
        announ.map((event)=> {
            return event.approved? <div className="indevent">
                <div className="communitynameevent"><Link to={`./communities/${event.community?.id}`}>{event.community?.name} </Link></div>
                <div className="homevent"> {event.title}</div>
                <div className="homevent"> {event.details}</div>
            </div> : ""
        }
        )
        : 
        "No current Community announcements"
    }

    </div>

    </>)


}