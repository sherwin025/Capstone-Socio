import { useEffect, useState } from "react"
import { getbusinesses } from "../requesthandlers/businessmanager"

export const Businesslist = () => {
    const [ businesses, setbusiness] = useState([])

    useEffect(()=>{
        getbusinesses().then(res=>setbusiness(res))
    }, [])
    return (<>
        All Businesses
        {
            businesses.map(business=> {
                return <div>
                    <div>{business.name}</div>
                    <div>{business.phone}</div>
                    <div>{ business.image ? <img src={`http://localhost:8000${business.image}`}></img>:""}</div>
                </div>
            })
        }
    </>)
}