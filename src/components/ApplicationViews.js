import React from "react"
import { Route } from "react-router-dom"
import { CommunityDetails } from "./Community./CommunityDetail"
import { CommunityPage } from "./Community./communitypage"
import { CommunityForm } from "./Community./communityforms/newcommunityform"
import { Homepage } from "./homepage/homepage"
import { EventForm } from "./events/eventform"
import { AnnouncementForm } from "./announcements/announcementform"
import { CommunityAdmin } from "./Community./Communityadmin"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Homepage/>
            </Route>
            <Route exact path="/communities">
                <CommunityPage />
            </Route>
            <Route exact path="/newcommunity">
                <CommunityForm />
            </Route>
            <Route exact path="/communities/:communityid(\d+)">
                <CommunityDetails />
            </Route>
            <Route exact path="/communities/:communityid(\d+)/admin">
                <CommunityAdmin />
            </Route>
            <Route path="/events/new/:communityid(\d+)">
                <EventForm />
            </Route>
            <Route path="/announcements/new/:communityid(\d+)">
                <AnnouncementForm />
            </Route>
        </>
    )
}