import React from 'react';
import './LeftPanel.css';

import IconButton from '../../icon-button/IconButton';

export default function LeftPanel(){
    return(
        <div className="LeftPanel">
            <QuickLinks />
            <Shortcuts />
            <Explore />
        </div>
    );
}










/**
 * This component renders Quick Links Card
 * on Left Panel of Homepage
 */
function QuickLinks(){
    const colors = ["#0153ff", "#febf03", "#ff4054"];
    const labels = ["Messenger", "News Feed", "Watch Live"];
    let actionButtons = ["messenger", "news-feed", "watch-live-2"];
    actionButtons = actionButtons.map(button => `icons/fb-${button}.svg`);
    actionButtons = actionButtons.map((button, index) => getButton(button, index));

    function getButton(button, index){
        return (
            <div className="row centerV Link" key={index}>
                <IconButton iconSrc={button} color={colors[index]}/>
                <div className="Label">{labels[index]}</div>
            </div>
        );
    }

    return (
        <div className="Card QuickLinks">
            <div className="Header">Action Buttons</div>
            <div className="UserQuickLink positionRelative row centerV">
                <div className="UserAvatar">
                    <img src="users/user2.jpeg" alt="user_image" aria-label="user image"/>
                </div>
                <div className="Label">Sabdin Walid</div>
            </div>
            {actionButtons}
        </div>
    );
}











/**
 * This component renders Shortcuts Card
 * on Left Panel of Homepage
 */
function Shortcuts(){
    const iconSrc = "icons/fb-groups.svg";
    const notificationsCount = [10, 0, 10];
    const labels = ["UIUX Designers", "Hella Narwhal", "Keytar McSw"];
    const colors = ["#f3f7ff", "#fffcf2", "#fff7f7"];
    
    let shortcuts = new Array(3).fill(1);
    shortcuts = shortcuts.map((shortcut, index) => index);
    shortcuts = shortcuts.map(shortcut => getButton(shortcut));

    function getButton(index){
        let count = notificationsCount[index];
        return (
            <div className="row centerV Link" key={index}>
                <IconButton iconSrc={iconSrc} color={colors[index]}/>
                <div className="Label">{labels[index]}</div>
                {count !== 0 && <div className="NotificationCount">{count}</div>}
            </div>
        );
    }
    
    return (
        <div className="Shortcuts">
            <div className="Card">
                <div className="Header">Shortcuts</div>
                {shortcuts}
            </div>
            <div className="SeeMoreBtn">See more</div>
        </div>
    );
}











/**
 * This component renders Explore Links Card
 * on Left Panel of Homepage
 */
function Explore(){
    const labels = ["Groups", "Events", "Pages"];
    const colors = ["#f3f7ff", "#fffcf2", "#fff7f7"];
    let links = ["groups", "calendar", "pages"];
    links = links.map(link => `icons/fb-${link}.svg`);
    links = links.map((link, index) => getButton(link, index));

    function getButton(button, index){
        return (
            <div className="row centerV Link" key={index}>
                <IconButton iconSrc={button} color={colors[index]}/>
                <div className="Label">{labels[index]}</div>
            </div>
        );
    }
    

    return (
        <div className="Explore">
            <div className="Card">
                <div className="Header">Explore</div>
                {links}
            </div>
            <div className="SeeMoreBtn">See more</div>
        </div>
    );
}