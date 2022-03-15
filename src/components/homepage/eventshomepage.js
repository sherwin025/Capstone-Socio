import React, { useState, useEffect } from "react"
import { getEvents } from "../requesthandlers/eventmanager"

export const HomePageEvents = () => {
    const [events, setevents] = useState([])

    useEffect(()=>{
        getEvents().then(res => setevents(res))
    }, [])

    return (<> 
    <div className="eventcontainer">
    Local Community Events
    {
        events.length >= 1? 
        events.map((event)=> {
            return <div className="indevent">
                <div className="communitynameevent">{event.community?.name} </div>
                <div className="homevent"> {event.name}</div>
                <div className="homevent"> {event.date}</div>
                <div className="homevent"> {event.time}</div>
            </div>
        }
        )
        : 
        "No upcoming Community Events"
    }

    </div>

    </>)


}