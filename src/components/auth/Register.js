import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const Register = (props) => {
    const passwordDialog = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const details = useRef()
    const zipcode = useRef()
    const parent = useRef("False")
    const image = useRef()

    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "is_staff": "False",
                "details": details.current.value,
                "zipcode": zipcode.current.value,
                "parent": parent.current.checked,
                "image": image.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem('token', res.token)
                        localStorage.setItem('member', res.member)
                        localStorage.setItem('admin', res.admin)
                        localStorage.setItem('last_login', res.last_login)
                        history.push('/')
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>


            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Join Socio today</h1>
                <fieldset>
                    <label htmlFor="profileimage"> Profile Image </label>
                    <input ref={image} type="text" id="profileimage" className="form-control" placeholder="profile Image" />
                </fieldset>
                <fieldset>
                    <label htmlFor="name"> Username: </label>
                    <input
                        ref={username}
                        type="text" id="username" className="form-control"
                        placeholder="select a username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email: </label>
                    <input  ref={email} type="email" id="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstname"> First Name: </label>
                    <input ref={first_name} type="text" id="firstname" className="form-control" placeholder="First Name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastname"> Last Name: </label>
                    <input  ref={last_name} type="text" id="lastname" className="form-control" placeholder="Last Name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio: </label>
                    <input  ref={details} type="text" id="bio" className="form-control" placeholder="Short statement about yourself" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="zipcode"> Zipcode: </label>
                    <input ref={zipcode} type="text" id="zipcode" className="form-control" placeholder="zipcode" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="parent"> Would you like information for Parents? </label>
                    <input ref={parent} type="checkbox" id="parent" className="form-control" placeholder="Parent" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password: </label>
                    <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifypassword">Verify Password: </label>
                    <input ref={verifyPassword} type="password" id="password" className="form-control" placeholder="Verify Password" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}

