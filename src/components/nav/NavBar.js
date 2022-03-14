import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useHistory } from "react-router-dom"

export const NavBar = (props) => {
    const history = useHistory()

    const logoutuser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('member')
        localStorage.removeItem('last_login')
        localStorage.removeItem('admin')
        history.push({pathname: '/'})
    }

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/communities">Communities </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/business">Local Businesses </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/users">Users </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/parents"> Parent Portal</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/" onClick={logoutuser}> Logout</Link>
            </li>
        </ul>
    )
}