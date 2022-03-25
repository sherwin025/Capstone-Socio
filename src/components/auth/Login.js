import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./auth.css"
export const Login = () => {
    const existDialog = useRef()
    const history = useHistory()
    const username = useRef()
    const password = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(res => {
                if ("member" in res && 'token' in res) {
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('member', res.member)
                    localStorage.setItem('parent', res.parent)
                    localStorage.setItem('last_login', res.last_login)
                    history.push('/')
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>Username or Password does not match</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Socio App</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username: </label>
                        <input
                            ref={username}
                            type="username"
                            id="username"
                            className="form-control"
                            placeholder="username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputpassword"> password: </label>
                        <input
                            ref={password}
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="password"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

