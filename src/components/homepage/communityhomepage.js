import React, { useState, useEffect } from "react"
import { getCommunity, getUserCommunity } from "../requesthandlers/communitymanager"

export const Communityhomepage = () => {
    const [community, setcommunity] = useState([])

    useEffect(()=>{
        getUserCommunity(localStorage.getItem("member")).then(res=>setcommunity(res))
    }, [])

    return (<> 
    <div className="eventcontainer">
    Your Communities
    {
        community.length >= 1? 
        community.map((event)=> {
            return <div className="indevent">
                <div className="communitynameevent">{event.name} </div>
            </div>
        }
        )
        : 
        "Not currently apart of any communities"
    }

    </div>

    </>)


}