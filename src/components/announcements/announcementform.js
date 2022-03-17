import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { createannouncement } from "../requesthandlers/announcementmanager"


export const AnnouncementForm = () => {
    const [newAnnouncement, setNewAnnouncement] = useState({})
    const { communityid } = useParams()
    const history = useHistory()
    const title = useRef()
    const details = useRef()
    const ispublic = useRef("False")
    const comments = useRef("False")
    const zipcode = useRef()


    const CreateAnnouncement = (e) => {
        e.preventDefault()
        const announcementobj = {
            "title": title.current.value,
            "details": details.current.value,
            "public": ispublic.current.checked,
            "comments": comments.current.checked,
            "zipcode": zipcode.current.value,
            "approved": false,
            "community": communityid
        }

        return createannouncement(announcementobj)
            .then(()=>{
                history.push(`/communities/${communityid}`)
            })
    }

    return (<>
        <form>
            <h3> New Announcement </h3>
            <h6>all announcements posted pending approval  </h6>

            <fieldset >
                <input ref={title} type="text" id="communityname" className="form-control" placeholder="Title" required />
            </fieldset>
            <fieldset>
                <input ref={details} type="text" id="communityabout" className="form-control" placeholder="Details" required />
            </fieldset>
            <fieldset>
                <input ref={zipcode} type="text" id="communityrules" className="form-control" placeholder="Zip Code" required />
            </fieldset>
            <fieldset>
                <label htmlFor="public"> should this Announcement show up in search results?  </label>
                <input ref={ispublic} type="checkbox" id="public" className="form-control" />
            </fieldset>
            <fieldset>
                <label htmlFor="public"> allow comments?  </label>
                <input ref={comments} type="checkbox" id="public" className="form-control" />
            </fieldset>
            <fieldset>
                <button onClick={CreateAnnouncement}> Create Announcement </button>
            </fieldset>
        </form>
        <button onClick={() => history.push(`/communities/${communityid}`)}> Back to Community</button>

    </>)
}