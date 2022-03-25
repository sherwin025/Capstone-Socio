import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getCommunity } from "../requesthandlers/communitymanager"
import { createEvent, joinEvent } from "../requesthandlers/eventmanager"

export const EventForm = () => {
    const { communityid } = useParams()
    const history = useHistory()
    const name = useRef()
    const details = useRef()
    const address = useRef()
    const date = useRef()
    const time = useRef()
    const ispublic = useRef("False")
    const isactivity = useRef("False")
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

    const CreateEvent = (e) => {
        e.preventDefault()
        const eventobj = {
            "name": name.current.value,
            "details": details.current.value,
            "address": address.current.value,
            "isactivity": isactivity.current.checked,
            "public": ispublic.current.checked,
            "zipcode": zipcode.current.value,
            "date": date.current.value,
            "time": time.current.value,
            "approved": false,
            "community": communityid,
            "image": base64string
        }

        return createEvent(eventobj)
            .then(res => { joinEvent(res.id) })
            .then(() => {
                history.push(`/communities/${communityid}`)
            })
    }

    return (<>
        <form>
            <h3> New Event </h3>
            <h6>all events posted pending approval </h6>

            <fieldset >
                <input ref={name} type="text" id="communityname" className="form-control" placeholder="Event Name" required />
            </fieldset>
            <fieldset>
                <input className="filebutton" type="file" id="image" onChange={createGameImageString} />
            </fieldset>
            <fieldset>
                <input ref={details} type="text" id="communityabout" className="form-control" placeholder="Event Details" required />
            </fieldset>
            <fieldset>
                <input ref={address} type="text" id="communityrules" className="form-control" placeholder="Address" required />
            </fieldset>
            <fieldset>
                <input ref={zipcode} type="text" id="communityrules" className="form-control" placeholder="Zip Code" required />
            </fieldset>
            <fieldset>
                <input ref={date} type="date" id="communityrules" className="form-control" placeholder="Date" required />
            </fieldset>
            <fieldset>
                <input ref={time} type="time" id="communityrules" className="form-control" placeholder="Time" required />
            </fieldset>
            <fieldset>
                <label htmlFor="parent"> is this a kids activity?  </label>
                <input ref={isactivity} type="checkbox" id="parent" className="form-control" />
            </fieldset>
            <fieldset>
                <label htmlFor="public"> should this Event show up in search results?  </label>
                <input ref={ispublic} type="checkbox" id="public" className="form-control" />
            </fieldset>
            <fieldset>
                <button onClick={CreateEvent}> Create Event </button>
            </fieldset>
        </form>
        <button className="backtocomm" onClick={() => history.push(`/communities/${communityid}`)}> Back to Community</button>

    </>)
}