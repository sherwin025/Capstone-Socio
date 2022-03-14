import React from "react"
import { Announcementshomepage } from "./announcehomepage"
import { Communityhomepage } from "./communityhomepage"
import { HomePageEvents } from "./eventshomepage"
import "./homepage.css"

export const Homepage = () => {




    return (<>
        <div className="homepagelayout">
            <HomePageEvents />
            <Announcementshomepage />
            <Communityhomepage />
        </div>

    </>)
}