import React from 'react';
import './IconButton.css';

import SvgLoader from '../svg-loader/SvgLoader';

/**
 * This Component renders an icon button for the given
 * background color and given svg icon source
 * @param color 
 * @param iconSrc
 */
export default function IconButton(props){
    return(
        <div className="row centerV centerH IconButton" style={{backgroundColor: `${props.color}`}}>
            <SvgLoader src={props.iconSrc} />
        </div>
    );
}