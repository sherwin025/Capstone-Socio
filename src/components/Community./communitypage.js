import React from "react"
import { Communityhomepage } from "../homepage/communityhomepage"
import { AllCommunities } from "./allcommunities"
import "./community.css"



export const CommunityPage = () => {




    return (<>
        <div className="communitylayout">
            <AllCommunities />
            <Communityhomepage />
        </div>

    </>)
}