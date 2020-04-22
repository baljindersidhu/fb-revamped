import React from 'react';
import './CenterPanel.css';

import IconButton from '../../icon-button/IconButton';
import MenuIconButton from '../../menu-icon-button/MenuIconButton';
import RestService from '../../../services/rest.service';

export default function CenterPanel() {
    return(
        <div className="CenterPanel">
            <CreatePost />
            <Stories />
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












/**
 * This Component Renders stories card on centerl panel of homepage
 */
class Stories extends React.Component{

    state = {loading: true, stories: null};

    async componentDidMount(){
        this.setState({loading: true});
        let stories = await RestService.getStories();
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));
        this.setState({stories: stories});
        this.setState({loading: false});
    }

    getHeader(){
        return (
            <div className="row centerV">
                <div className="Header">Stories</div>
                <div className="fillParent"></div>
                <div className="SeeMoreBtn">See more</div>
            </div>
        );
    }

    getDummyStoryTemplate(){
        return (
            <div className="DummyStoryTemplate" key={performance.now()}>
                <div className="StoryPlaceholder"></div>
                <div className="row centerV">
                    <div className="UserAvatarPlaceholder"></div>
                    <div className="UserFullNamePlaceholder"></div>
                </div>
            </div>
        );
    }

    render(){
        let {loading, stories} = this.state;
        if(loading || !stories) return (
            <div className="Stories Card">
                {this.getHeader()}
                <div className="row StoriesList">
                    {new Array(5).fill(1).map(index => this.getDummyStoryTemplate())}
                </div>
            </div>
        );

        return(
            <div className="Stories Card">
                {this.getHeader()}
                <div className="row StoriesList">
                    {stories.map(story => 
                        <div className="Story" key={performance.now()}>
                                <div className="Cover" style={{backgroundImage: `url(${story.cover})`}}></div>
                                <div className="row centerV">
                                    <div className="UserAvatar">
                                        <img src={story.userAvatar} alt={story.userAvatar} aria-label="posted by user image"/>
                                    </div>
                                    <div className="UserFullName">{story.userFullName}</div>
                                </div>
                            </div>
                    )}
                </div>
            </div>
        );
    }
}