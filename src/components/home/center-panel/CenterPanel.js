import React from 'react';
import './CenterPanel.css';

import IconButton from '../../icon-button/IconButton';
import MenuIconButton from '../../menu-icon-button/MenuIconButton';

export default function CenterPanel() {
    return(
        <div className="CenterPanel">
            <CreatePost />
        </div>
    )
}












/**
 * This component renders Crate Post Card on the Center Panel of Homepage
 */
function CreatePost(){

    const labels = ["Gallery", "Tag Friends", "Feeling/Activity"];
    const colors = ["#0153ff", "#ff4054", "#febf03"];
    let actions = ["gallery", "tag-friend", "smile"];
    actions = actions.map(action => `icons/fb-${action}.svg`);
    actions = actions.map((action, index) => getAction(action, index));

    function getAction(actionIcon, index){
        return (
            <div className="row centerV Action" key={index}>
                <IconButton iconSrc={actionIcon} color={colors[index]} />
                <div className="Label">{labels[index]}</div>
            </div>
        );
    }

    return (
        <div className="Card CreatePost">
            <div className="row centerV">
                <IconButton iconSrc="icons/fb-new-post.svg" color="#f2f6ff" />
                <div className="Header">Create Post</div>
            </div>

            <div className="row WritePost">
                <div className="UserAvatar">
                    <img src="users/user.jpg" alt="user.jpeg" aria-label="user profile image" />
                </div>
                <textarea className="fillParent" rows="2" placeholder="What's on your mind, Sabdin?"></textarea>
            </div>

            <div className="row centerV ActionsList">
                {actions}
                <div className="fillParent"></div>
                <MenuIconButton />
            </div>
        </div>
    );
}