import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { createannouncement } from "../requesthandlers/announcementmanager"


export const AnnouncementForm = () => {
    const { communityid } = useParams()
    const history = useHistory()
    const title = useRef()
    const details = useRef()
    const ispublic = useRef("False")
    const comments = useRef("False")
    const zipcode = useRef()
    const [base64string, setbase] = useState(null)

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            setbase(base64ImageString)
        });
    }


    const CreateAnnouncement = (e) => {
        e.preventDefault()
        const announcementobj = {
            "title": title.current.value,
            "details": details.current.value,
            "public": ispublic.current.checked,
            "comments": comments.current.checked,
            "zipcode": zipcode.current.value,
            "approved": false,
            "community": communityid,
            "image": base64string
        }

        return createannouncement(announcementobj)
            .then(() => {
                history.push(`/communities/${communityid}`)
            })
    }

    return (<>
        <form>
            <h3> New Announcement </h3>
            <h6>all announcements posted pending approval  </h6>
            <fieldset>
                <input className="filebutton" type="file" id="userimage" onChange={createGameImageString} />
            </fieldset>
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
        <button className="backtocomm" onClick={() => history.push(`/communities/${communityid}`)}> Back to Community</button>

    </>)
}