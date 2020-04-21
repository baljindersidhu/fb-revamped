import React from 'react';
import './RightPanel.css';

import IconButton from '../../icon-button/IconButton';
import MenuIconButton from '../../menu-icon-button/MenuIconButton';

export default function RightPanel(){
    return(
        <div className="RightPanel">
            <YourPages />
            <SuggestedGroups />
        </div>
    );
}










/**
 * This component renders Your Pages card on right panel of Home page
 */
function YourPages(){
    return (
        <div className="row centerV Card">
            <div className="YourPages row centerV">
                <IconButton iconSrc="icons/fb-pages.svg" color="#0153ff"></IconButton>
                <div className="Label">Your Pages(1)</div>
            </div>
            <div className="fillParent"></div>
            <MenuIconButton />
        </div>
    );
}

















/**
 * This component renders suggested groups card on
 * right panel of home page
 */
function SuggestedGroups(){
    return (
        <div className="Card SuggestedGroups">
            <div className="row centerV">
                <div className="Header">Suggested groups</div>
                <div className="fillParent"></div>
                <div className="SeeMoreBtn">See more</div>
            </div>
            <div className="Cover">
                <img src="covers/suggested_grp.jpeg" alt="suggested_grp_cover" aria-label="suggested groups cover pic" />
            </div>
            <div className="row centerV">
                <div className="GroupDetails">
                    <div className="GroupName">Anthony Douglas</div>
                    <div className="GroupDescription">65 friends | 1.5k members</div>
                </div>
                <div className="fillParent"></div>
                <GroupMemebers />
            </div>
        </div>
    );
}

/**
 * This Component rencders group members list in Suggested Groups
 * component on right side panel of homepage
 */
function GroupMemebers(){

    let users = new Array(3).fill(1);
    const offsets = [-6.7, -5, -3.5];
    users = users.map((user, index) => (index + 3));
    users = users.map(user => `users/user${user}.jpeg`);
    users = users.map((user, index) => getUser(user, offsets[index]));

    function getUser(user, offset){
        return (
            <div className="positionAbsolute User" key={performance.now()}
                style={{left: `${offset}vw`}}>
                <img src={user} alt={user}/>
            </div>
        );
    }

    return (
        <div className="GroupMembers positionRelative">
            {users}
            <div className="positionAbsolute Count">+20</div>
        </div>
    );
}