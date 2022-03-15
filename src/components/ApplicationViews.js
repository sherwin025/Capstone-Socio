import React from "react"
import { Route } from "react-router-dom"
import { CommunityDetails } from "./Community./CommunityDetail"
import { CommunityPage } from "./Community./communitypage"
import { CommunityForm } from "./Community./newcommunityform"
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
            <Route exact path="/newcommunity">
                <CommunityForm />
            </Route>
            <Route path="/communities/:communityid(\d+)">
                <CommunityDetails />
            </Route>
        </>
    )
}