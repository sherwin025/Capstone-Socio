import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getEvents } from "../requesthandlers/eventmanager"

export const HomePageEvents = ({parent}) => {
    const [events, setevents] = useState([])

    useEffect(()=>{
        getEvents().then(res => setevents(res))
    }, [])

    return (<> 
    <div className="eventcontainer">
    {parent ?  "Kids Events" : "Your local Communtiy Events" }
    {
        events.length >= 1? 
        events.map((event)=> {
            return parent? event.approved & event.public & event.community?.parentportal ? <div className="indevent">
                <div className="communitynameevent"> <Link to={`./communities/${event.community?.id}`}>{event.community?.name}</Link> </div>
                <div className="homevent"> {event.name}</div>
                <div className="homevent"> {event.date}</div>
                <div className="homevent"> {event.time}</div>
            </div> : "" : event.approved? <div className="indevent">
                <div className="communitynameevent"> <Link to={`./communities/${event.community?.id}`}>{event.community?.name}</Link> </div>
                <div className="homevent"> {event.name}</div>
                <div className="homevent"> {event.date}</div>
                <div className="homevent"> {event.time}</div>
            </div>: ""
        }
        )
        : 
        "No upcoming Community Events"
    }

    </div>

    </>)


}