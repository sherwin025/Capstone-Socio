import { AllCommunities } from "../Community./allcommunities"
import { HomePageEvents } from "../homepage/eventshomepage"
import { ActivityList } from "./ActivityList"

export const ParentPortal = () => {
    return (<>
    
    <h3>Parents Portal</h3>
    <div><AllCommunities parent={true}/></div>
    <div><HomePageEvents parent={true}/> </div>
    <div> <ActivityList /> </div>
    </>)
}