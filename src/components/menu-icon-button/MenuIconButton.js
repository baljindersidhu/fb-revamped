import React from 'react';
import './MenuIconButton.css';

import IconButton from '../icon-button/IconButton';

export default function MenuIconButton(){
    return(
        <div className="MenuIconButton">
            <IconButton iconSrc="icons/menu.svg" color="#c3c4c752"></IconButton>
        </div>
    )
}
