import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { CreateCommunity } from "../../requesthandlers/communitymanager"
import { createcommunitymember } from "../../requesthandlers/communitymembermanager"
import { createCommunityTags, createTags, getTags } from "../../requesthandlers/tagmanager"
import { NewCommunityTagComponent } from "./communitytagform"
import "../community.css"


export const CommunityForm = () => {
    const name = useRef()
    const image = useRef()
    const about = useRef()
    const rules = useRef()
    const parent = useRef("False")
    const ispublic = useRef("False")
    const history = useHistory()
    const [base64string, setbase] = useState(null)
    const [selectedtags, setselectedtags] = useState([])


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

    const createacommunity = (e) => {
        e.preventDefault()
        const commobject = {
            "name": name.current.value,
            "about": about.current.value,
            "rules": rules.current.value,
            "image": base64string,
            "parentportal": parent.current.checked,
            "public": ispublic.current.checked,
            "visible": true
        }
        return CreateCommunity(commobject).then(res => {

            createcommunitymember({ "member": localStorage.getItem("member"), "community": res.id, "admin": true, "approved": true })

            for (const tag of selectedtags) {
                if (tag.id) {
                    const commtag = {
                        "tag": tag.id,
                        "community": res.id
                    }

                    createCommunityTags(commtag)
                } else {
                    const atag = {
                        "label": tag.label
                    }

                    createTags(atag).then(newres => {
                        const commtag = {
                            "tag": newres.id,
                            "community": res.id
                        }

                        createCommunityTags(commtag)
                    }
                    )
                }
            }
            history.push(`/communities/${res.id}`)
        }
        )
    }

    return <>
        <form className="newcommform">
            <h3> Create a new Community </h3>

            <fieldset >
                <input ref={name} type="text" id="communityname" className="form-control" placeholder="Community Name" required />
            </fieldset>
            <fieldset>
                <input  className="filebutton" type="file" id="userimage" onChange={createGameImageString} />
            </fieldset>
            <fieldset>
                <input ref={about} type="text" id="communityabout" className="form-control" placeholder="What is your community about" required />
            </fieldset>
            <fieldset>
                <input ref={rules} type="text" id="communityrules" className="form-control" placeholder="Any specific rules?" required />
            </fieldset>
            <fieldset>
                <label htmlFor="parent"> is this a child-centric communtiy?  </label>
                <input ref={parent} type="checkbox" id="parent" className="form-control" placeholder="Parent" />
            </fieldset>
            <fieldset>
                <label htmlFor="public"> should this community show up in search results?  </label>
                <input ref={ispublic} type="checkbox" id="public" className="form-control" />
            </fieldset>
            <fieldset>
                <NewCommunityTagComponent selectedtags={selectedtags} setselectedtags={setselectedtags} />
            </fieldset>
            <fieldset>
                <button className="joinleavecomm" onClick={createacommunity}> Create your Community </button>
            </fieldset>
            <button className="backtocomm" onClick={() => history.push("./communities")}> Back to Communtities </button>
        </form>




    </>
}