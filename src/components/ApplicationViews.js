import React from "react"
import { Route } from "react-router-dom"
import { CommunityPage } from "./Community./communitypage"
import { Homepage } from "./homepage/homepage"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/communities">
                <CommunityPage />
            </Route>
        </>
    )
}