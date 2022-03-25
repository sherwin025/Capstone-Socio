import { AllCommunities } from "../Community./allcommunities"
import { HomePageEvents } from "../homepage/eventshomepage"
import { ActivityList } from "./ActivityList"
import "./parentportal.css"


export const ParentPortal = () => {
    return (<>
        <div className="portalcontainer">
            <h3>Parents Portal</h3>
            <div className="portalsections">
                <div><AllCommunities parent={true} /></div>

                <div className="portaleanda">
                <div ><HomePageEvents parent={true} /> </div>
                <div> <ActivityList /> </div>
                </div>
            </div>
        </div>
    </>)
}