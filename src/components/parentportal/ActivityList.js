import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getEvents } from "../requesthandlers/eventmanager"
import { createEvent, DeleteEvent, getCommunityEvents, joinEvent, leaveEvent, UpdateEvent } from "../requesthandlers/eventmanager"

export const ActivityList = () => {
    const [events, setevents] = useState([])

    useEffect(() => {
        getEvents().then(res => setevents(res))
    }, [])

    return (<>
        <div className="eventcontainer">
           <h3> Kids Activities </h3>
            {
                events.length >= 1 ?
                    events.map((event) => {
                        return event.approved & event.public & event.community?.parentportal & event.isactivity ? <div className="indevent">
                            <div className="communitynameevent"> <Link to={`./communities/${event.community?.id}`}>{event.community?.name}</Link> </div>
                            <div className="homevent"> {event.name}</div>
                            <div className="homevent"> {event.date}</div>
                            <div className="homevent"> {event.time}</div>
                            <div>attending: {event.attending_count}</div>
                            <div> {event.member?.id === parseInt(localStorage.getItem("member")) ?
                                "" :
                                event.attendees.some((each) =>each.id === parseInt(localStorage.getItem("member"))) ?
                                    <button onClick={()=>{
                                        leaveEvent(event.id).then(getCommunityEvents(event.community?.id).then(res => setevents(res)))
                                    }}>Leave Event</button> : <button onClick={()=>{
                                        joinEvent(event.id).then(getCommunityEvents(event.community?.id).then(res => setevents(res)))
                                    }}>Join Event</button>
                            }</div>
                        </div> : ""
                    }
                    )
                    :
                    "No upcoming Community Events"
            }

        </div>

    </>)


}