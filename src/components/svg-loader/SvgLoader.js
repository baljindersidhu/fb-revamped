import React from 'react';
import './SvgLoader.css';

export default class SvgLoader extends React.Component{
    
    ref = React.createRef();

    async componentDidMount(){
        let response = await fetch(this.props.src);
        let svgSource = await response.text();
        this.ref.current.appendChild(this.parseSvgFromSource(svgSource));
    }

    parseSvgFromSource(svgSource){
        let domParser = new DOMParser();
        let documentEl = domParser.parseFromString(svgSource, "image/svg+xml");
        return documentEl.firstElementChild;
    }
    
    render(){
        return (<div className="SvgContainer" ref={this.ref}></div>);
    }
}