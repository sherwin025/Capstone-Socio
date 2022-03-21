import { useEffect, useState } from "react"
import { getbusinessevents } from "../requesthandlers/businessmanager"

export const Businesseventlist = () => {
    const [ businesses, setbusiness] = useState([])

    useEffect(()=>{
        getbusinessevents().then(res=>setbusiness(res))
    }, [])
    return (<>
        All Business Events: 
        {
            businesses.map(business=> {
                return business.approved?  <div>
                    <div>{business.title}</div>
                    <div>{business?.business?.name}</div>
                    <div>{ business.image ? <img src={`http://localhost:8000${business.image}`}></img>:""}</div>
                </div>: ""
            })
        }
    </>)
}