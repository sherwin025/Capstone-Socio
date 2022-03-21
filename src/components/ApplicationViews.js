import React from "react"
import { Route } from "react-router-dom"
import { CommunityDetails } from "./Community./CommunityDetail"
import { CommunityPage } from "./Community./communitypage"
import { CommunityForm } from "./Community./communityforms/newcommunityform"
import { Homepage } from "./homepage/homepage"
import { EventForm } from "./events/eventform"
import { AnnouncementForm } from "./announcements/announcementform"
import { CommunityAdmin } from "./Community./Communityadmin"
import { UserPage } from "./users/user"
import { DirectMessaages } from "./messages/DirectMessage"
import { MessageForm } from "./messages/MessageForm"
import { UserMessageForm } from "./messages/usermessageform"
import { ParentPortal } from "./parentportal/ParentPortal"
import { BusinessComponent } from "./Business/businesscomponent"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Homepage/>
            </Route>
            <Route exact path="/communities">
                <CommunityPage />
            </Route>
            <Route exact path="/users">
                <UserPage />
            </Route>
            <Route exact path="/newcommunity">
                <CommunityForm />
            </Route>
            <Route exact path="/messages/new">
                <MessageForm />
            </Route>
            <Route exact path="/messages">
                <DirectMessaages />
            </Route>
            <Route path="/messages/new/:userid(\d+)">
                <UserMessageForm />
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
            <Route path="/parents" >
                <ParentPortal />
            </Route>
            <Route path="/business" >
                <BusinessComponent />
            </Route>
        </>
    )
}