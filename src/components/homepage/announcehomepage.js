import React, { useState, useEffect } from "react"
import { getAnnouncement } from "../requesthandlers/announcementmanager"

export const Announcementshomepage = () => {
    const [announ, setannoun] = useState([])

    useEffect(()=>{
        getAnnouncement().then(res=>setannoun(res))
    }, [])

    return (<> 
    <div className="eventcontainer">
    Your Community Announcements
    {
        announ.length >= 1? 
        announ.map((event)=> {
            return <div className="indevent">
                <div className="communitynameevent">{event.community?.name} </div>
                <div className="homevent"> {event.title}</div>
                <div className="homevent"> {event.details}</div>
            </div>
        }
        )
        : 
        "No current Community announcements"
    }

    </div>

    </>)


}