import { Businessannouncementlist } from "./businessannouncement"
import { Businesseventlist } from "./businessevents"
import { Businesslist } from "./businesslist"

export const BusinessComponent = () => {

    return (<>
    <button>Register New Business</button>
    {
        <Businesslist/>
    }
    {
        <Businesseventlist /> 
    }
        {
        <Businessannouncementlist /> 
    }
    </>)
}