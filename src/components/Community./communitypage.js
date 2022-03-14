import React from "react"
import { Communityhomepage } from "../homepage/communityhomepage"
import { AllCommunities } from "./allcommunities"




export const CommunityPage = () => {




    return (<>
    Discover new Communties 
        <div className="homepagelayout">
            <AllCommunities />
            <Communityhomepage />
        </div>

    </>)
}