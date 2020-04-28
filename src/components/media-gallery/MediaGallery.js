import React from 'react';
import './MediaGallery.css';

import {MediaTypes} from '../../constants/application.constants';

const ImageFormats = ["jpeg", "jpg", "png", "svg", "gif", "bmp", "tiff"];
const AudioFormats = ["mp3", "wav", "aiff", "au", "wma", "aa","aac", "ape", "wv", "m4a", "oga"]
const VideoFormats = ["mp4", "mkv", "3gp", "avi", "webm", "webp", "ogg", "divx", "wmv", "flv", "mov"];

export default class MediaGallery extends React.Component{

    showAtMax = 4;

    getMediaObjectsGrid(){

        let { media } = this.props;
        let mediaList = media.map(mediaObj => new MediaObjectTypeResolver(mediaObj));
        mediaList = mediaList.map((mediaObj, index) => mediaObj.renderMedia(index));

        if(mediaList.length > this.showAtMax){

            let hiddenObjectsCount = (mediaList.length - this.showAtMax + 1);
            let hiddenObjectCaption = media[this.showAtMax];
            
            mediaList = mediaList.slice(0, (this.showAtMax - 1));
            mediaList.push(
                <ExpandGallery key={this.showAtMax} 
                    hiddenObjectsCount={hiddenObjectsCount} 
                    caption={hiddenObjectCaption}/>
            );

        }

        return mediaList;

    }

    render(){
        return (
            <div className="row MediaGallery">
                {this.getMediaObjectsGrid()}
            </div>
        );
    }
}


/**
 * This class contains useful methods that identifies media object type i.e. 
 * Image, Audio, Video and helps render the corresponding media object component
 */
class MediaObjectTypeResolver {

    type;
    
    constructor(mediaObject) {
        this.data = mediaObject;
        this.setMediaType();
    }

    isComplex(){
        return (this.data instanceof Object);
    }

    setMediaType(){
        if(this.isImage()){
            this.type = MediaTypes.IMAGE;
        }else if(this.isAudio()){
            this.type = MediaTypes.AUDIO;
        }else if(this.isVideo()){
            this.type = MediaTypes.VIDEO;
        }
    }

    /**
     * This method returns given media source and given caption (if provided by users)
     */
    getMediaProps(){
        return {
            source: (this.isComplex() ? this.data.source: this.data),
            caption: (this.isComplex() ? this.data.caption: null)
        };
    }

    /**
     * This method returns the extension name for given media object source
     */
    getResourceExtension(){
        let fileName = (this.isComplex() ? this.data.source: this.data);
        return fileName.split(".").reverse()[0];
    }

    isImage(){
        return (ImageFormats.includes(this.getResourceExtension()));
    }

    isAudio(){
        return (AudioFormats.includes(this.getResourceExtension()));
    }

    isVideo(){
        return (VideoFormats.includes(this.getResourceExtension()));
    }

    /**
     * This method renders media object component relevant to media type
     * i.e. Image, Audio or Video
     */
    renderMedia(primaryKey){
        switch(this.type){
            case MediaTypes.IMAGE:
                return (<ImageMediaObject key={primaryKey} data={this.getMediaProps()}/>);
            case MediaTypes.AUDIO:
                return (<AudioMediaObject key={primaryKey} data={this.getMediaProps()}/>);
            case MediaTypes.VIDEO:
                return (<VideoMediaObject key={primaryKey} data={this.getMediaProps()}/>);
            default:
                return (<ImageMediaObject key={primaryKey} data={this.getMediaProps()}/>);
        }
    }

}







/**
 * This component is used to Maximize gallery and show the count of
 * hidden media objects in gallery and uses given caption source image
 * as background for blurred placeholder
 * @param {hiddenObjectsCount, caption} props 
 */
function ExpandGallery(props){
    let renderedTemplate = (<div className="row centerH centerV ExpandGallery">{"+ " + props.hiddenObjectsCount + " more"}</div>);
    
    // check if caption is available
    if(props.caption){
        let captionSrc = (props.caption instanceof Object) ? props.caption.source: props.caption;
        renderedTemplate = (<div className="ExpandGallery" style={{backgroundImage: `url(${captionSrc})`}}>
                                <div className="Label row centerH centerV">{"+ " + props.hiddenObjectsCount + " more"}</div>
                            </div>);
    }

    return renderedTemplate;
}









/**
 * This component renders Image Type media object in Media Gallery
 * for given source and shows given caption as placeholder while
 * media loads
 * @param {source, caption} props 
 */
class ImageMediaObject extends React.Component{

    state = {loading: true, data: null};
    imageContainerRef = React.createRef();

    async componentDidMount(){
        this.setState({loading: true});
        let image = await this.loadImage();
        this.setState({data: image});
        this.setState({loading: false});
    }

    async loadImage(){
       let response = await fetch(this.props.data.source, {cache: "no-cache"});
       let blob = await response.blob();
       return URL.createObjectURL(blob);
    }

    render(){
        let {loading, data} = this.state;

        // if loading is true then show Image Placeholder
        return (loading ? <div className="MediaObject Image Placeholder"></div> : <div 
            className="MediaObject Image" style={{backgroundImage: `url(${data})`}}></div>);
    }
}

/**
 * This component renders Audio Type media object in Media Gallery
 * for given source and shows given caption as placeholder while
 * media loads
 * @param {source, caption} props 
 */
class AudioMediaObject extends React.Component{
    render(){
        return(
            <div className="MediaObject Audio">Renders Audio</div>
        )
    }
}

/**
 * This component renders Video Type media object in Media Gallery
 * for given source and shows given caption as placeholder while
 * media loads
 * @param {source, caption} props 
 */
class VideoMediaObject extends React.Component{
    state = {loading: true, playing: false};
    videoElementRef = React.createRef();

    async componentDidMount(){
        this.setState({loading: true});
        let video = await this.loadVideo();
        this.setState({loading: false});
        this.videoElementRef.current.src = video;
        this.videoElementRef.current.addEventListener('play', () => this.setState({playing: true}));
        this.videoElementRef.current.addEventListener('pause', () => this.setState({playing: false}));
    }

    async loadVideo(){
        let response = await fetch(this.props.data.source);
        let blob = await response.blob();
        return URL.createObjectURL(blob);
    }

    toggleVideoPlayback(){
        let {playing} = this.state;
        if(!playing){
            this.videoElementRef.current.play();
        }else{
            this.videoElementRef.current.pause();
        }
    }

    render(){
        let {loading, playing} = this.state;

        // if loading is true then show Image Placeholder
        return (loading ? <div className="MediaObject Video Placeholder"></div> : <div 
            className="row centerH MediaObject Video">
                <video loop preload="metadata" ref={this.videoElementRef}></video>
                <div className="positionAbsolute VideoControls" data-playing={playing} onClick={() => this.toggleVideoPlayback()}>
                    <i className="positionRelative ri-play-circle-fill"></i>
                    <i className="positionRelative ri-pause-circle-fill"></i>
                    <i className="positionRelative ri-fullscreen-fill"></i>
                </div>
            </div>);
    }
}