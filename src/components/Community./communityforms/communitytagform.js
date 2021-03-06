import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getTags } from "../../requesthandlers/tagmanager"


export const NewCommunityTagComponent = ({selectedtags,setselectedtags}) => {
    const newtag = useRef()
    const [newtags, setnewtags] = useState([])
    const [tags, settags] = useState([])

    useEffect(() => {
        getTags().then(res => settags(res))
    }, [])

    useEffect(() => {
        settags(newtags)
    }, [newtags])

    const addtagstolist = (e) => {
        e.preventDefault()
        const copy = [...tags]
        copy.push({ label: newtag.current.value })
        setnewtags(copy)
        newtag.current.value = ""

    }

    const addselectedtags = (tag) => {
        const copy = [...selectedtags]
        const itemindex = copy.indexOf(tag)
        
        if (itemindex === -1){
            copy.push(tag)
        } else {
            copy.splice(itemindex,1)
        }
        setselectedtags(copy)

    }

    return <>
   
        <label htmlFor="parent"> Selected associated tags </label>
        <div className="alltagslist">
        {
            tags.map(tag => {
                return <div className="tagscheckbox">
                    <label htmlFor="thetags"> {tag.label}</label>
                    <input type="checkbox" id="communitytags" onChange={() => addselectedtags(tag)} />
                </div>
            })
        }
         </div>
        <input ref={newtag} type="text" id="communityrules" className="searchbox" placeholder="New Tag Label" />
        <button className="joinleavecomm" onClick={addtagstolist} >Create Tag</button>
       

    </>
}