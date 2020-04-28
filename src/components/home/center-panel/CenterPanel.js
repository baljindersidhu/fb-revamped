import React from 'react';
import './CenterPanel.css';

import IconButton from '../../icon-button/IconButton';
import MenuIconButton from '../../menu-icon-button/MenuIconButton';
import RestService from '../../../services/rest.service';
import NewsFeedPost from '../../../models/NewsFeedPost';
import MediaGallery from '../../media-gallery/MediaGallery';

export default function CenterPanel() {
    return(
        <div className="CenterPanel">
            <CreatePost />
            <Stories />
            <NewsFeed />
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















/**
 * This component renders News Feed on Center Panel of Homepage
 */

class NewsFeed extends React.Component{

    state = {loading: true, posts: null};

    async componentDidMount(){
        this.setState({loading: true});
        let posts = await RestService.getPostsForNewsFeed();
        posts = posts.map(post => new NewsFeedPost(post));
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));
        this.setState({posts: posts});
        this.setState({loading: false});
    }

    getPostTemplate(post_data){
        return (
            <div className="NewsFeedPost Card" key={performance.now()}>
                
                {/* Post Header */}
                <div className="row centerV">
                    <div className="UserAvatar" style={{backgroundImage: `url(${post_data.getUserAvatar()})`}}></div>
                    <div>
                        <div className="UserFullName">{post_data.userFullName}</div>
                        <div className="row centerV">
                            <div className="PostedAt">{post_data.getPostedAt()}</div>
                            <i className="ri-alarm-line"></i>
                        </div>
                    </div>
                    <div className="fillParent"></div>
                    <MenuIconButton />
                </div>

                {/* Post Caption */}
                <div className="PostCaption">{post_data.getPostCaption()} 
                    {post_data.captionIsMinimized() ? <span className="seeMoreBtn">See More</span> : ""}
                </div>

                {/* Media Gallery */}
                <MediaGallery media={post_data.media}/>

                {/* Post Actions i.e. Like/Comment/Share */}
                <div className="row centerV Actions">
                    
                    <div className="Action"><i className="ri-thumb-up-fill"></i></div>
                    <div className="Action"><i className="ri-heart-2-fill"></i></div>

                    <div className="Label">{post_data.likesCount}</div>
                    <div className="Label">{post_data.commentsCount + " comments"}</div>

                    <div className="fillParent"></div>

                    <i className="ri-share-forward-line"></i>
                    <i className="Label">Share</i>

                </div>

            </div>
        );
    }

    render(){
        let {loading, posts} = this.state;

        return (
            <div className="NewsFeed">
                {loading && <div>{new Array(5).fill(1).map((node, index) => index).map(index => <DummyNewsFeedPost key={index} />)}</div>}
                {(!loading && posts && (posts instanceof Array)) && posts.map(post => this.getPostTemplate(post))}
            </div>
        );
    }
}

function DummyNewsFeedPost(){
    return(
        <div className="DummyNewsFeedPost Card">
            <div className="row centerV">
                <div className="UserAvatarPlaceholder"></div>
                <div>
                    <div className="UserNamePlaceholder"></div>
                    <div className="PostedAtPlaceholder"></div>
                </div>
                <div className="fillParent"></div>
                <div className="MenuIconBtnPlaceholder"></div>
            </div>
            <div className="PostCaptionPlaceholder"></div>
        </div>
    )
}