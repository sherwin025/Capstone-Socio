import { useEffect, useState } from "react"
import { getbusinessAnnouncements } from "../requesthandlers/businessmanager"

export const Businessannouncementlist = () => {
    const [ businesses, setbusiness] = useState([])

    useEffect(()=>{
        getbusinessAnnouncements().then(res=>setbusiness(res))
    }, [])
    return (<>
        All Business Announcements: 
        {
            businesses.map(business=> {
                return business.approved ? <div>
                    <div>{business.details}</div>
                    <div>{business?.business?.name}</div>
                    <div>{ business.image ? <img src={`http://localhost:8000${business.image}`}></img>:""}</div>
                </div> : ""
            })
        }
    </>)
}