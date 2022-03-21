import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import {Navbar, Container, Nav} from 'react-bootstrap'
import "./NavBar.css"

export const NavBar = (props) => {
    const history = useHistory()
    const admin = localStorage.getItem("admin")
    const logoutuser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('member')
        localStorage.removeItem('last_login')
        localStorage.removeItem('admin')
        history.push({ pathname: '/' })
    }

    return (<>
    
        <Navbar className="nav-back" sticky="top" variant="dark" expand="lg">
            <Navbar.Brand href="/" className="site-title" >Socio</Navbar.Brand>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link className="text-light" style={{fontSize:"20px"}} href="/">Home</Nav.Link>
                        <Nav.Link className="text-light" style={{fontSize:"20px"}} href="/communities">Communities</Nav.Link>
                        <Nav.Link className="text-light" style={{fontSize:"20px"}} href="/users">Users</Nav.Link>
                        <Nav.Link className="text-light" style={{fontSize:"20px"}} href="/parents">Parent Portal</Nav.Link>
                        <Nav.Link className="text-light" style={{fontSize:"20px"}} href="/business">Local Business</Nav.Link>
                        <Nav.Link className="text-light" style={{fontSize:"20px"}} href="/messages">Messages</Nav.Link>
                        <Nav.Link className="text-light" style={{fontSize:"20px"}} href="/" onClick={logoutuser}> Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}