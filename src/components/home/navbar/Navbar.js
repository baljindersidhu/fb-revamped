import React from 'react';
import './Navbar.css';

export default function Navbar(){
    return (
        <div className="row centerV Navbar">
            <Brand />
            <SearchBar />
            <div className="fillParent"></div>
            <NavigationLinks />
            <div className="fillParent"></div>
            <UserActions />
            <UserAvatar />
        </div>
    );
}

function Brand(){
    return (
        <div className="row centerV centerH Brand"><i className="ri-facebook-fill"></i></div>
    );
}

function SearchBar(){
    return (
        <div className="row centerV SearchBar">
            <div className="label">Search</div>
            <i className="ri-search-line"></i>
        </div>
    );
}

function NavigationLinks(){
    let links = ["home-7", "messenger", "group"];
    links = links.map(link => `ri-${link}-line`);
    links = links.map(link => <i className={link}></i>);
    links = links.map(link => <div className="link" key={performance.now()}>{link}</div>)

    return (
        <div className="row NavigationLinks">{links}</div>
    );
}

function UserActions(){

    let actions = ["notification-3", "question", "settings-5"];
    actions = actions.map(action => `ri-${action}-line`);
    actions = actions.map(action => <i className={action}></i>);
    actions = actions.map(action => <div className="action" key={performance.now()}>{action}</div>)

    return (
        <div className="row UserActions">{actions}</div>
    );
}

function UserAvatar(){
    return (
        <div className="UserAvatar">
            <img src="users/user.jpg" alt="user_pic" aria-label="User Profile Pic" />
        </div>
    );
}

