const TimePeriod = {
    'MIN': 60,
    'HOUR': 60 * 60,
    'DAY': 60 * 60 * 24,
    'WEEK': 60 * 60 * 24 * 7 
};

export default class NewsFeedPost{
    
    userAvatar;
    userFullName;
    postedAt;
    caption;
    media;
    likesCount;
    commentsCount;
    
    constructor(news_feed_post_data){
        this.userAvatar = news_feed_post_data.userAvatar ? news_feed_post_data.userAvatar: null;
        this.userFullName = news_feed_post_data.userFullName ? news_feed_post_data.userFullName: null;
        this.postedAt = news_feed_post_data.postedAt ? news_feed_post_data.postedAt: null;
        this.caption = news_feed_post_data.caption ? news_feed_post_data.caption: null;
        this.media = news_feed_post_data.media ? news_feed_post_data.media: null;
        this.likesCount = news_feed_post_data.likesCount ? news_feed_post_data.likesCount: null;
        this.commentsCount = news_feed_post_data.commentsCount ? news_feed_post_data.commentsCount: null;
    }

    getUserAvatar(){
        return "users/" + this.userAvatar;
    }

    getPostedAt(){
        let timeElapsed = (Date.now() - this.postedAt) / 1000;

        if(timeElapsed >= TimePeriod.WEEK){
            return "Posted few weeks ago";
        }
        
        else if(timeElapsed >= TimePeriod.DAY){
            return `Posted few days ago`;
        }

        else if(timeElapsed >= TimePeriod.HOUR){
            return `Posted few hours ago`;
        }

        else if(timeElapsed >= TimePeriod.MIN){
            return `Posted few mins ago`;
        }

        else{
            return `Posted few moments ago`;
        }
    }

    getPostCaption(){
        if(this.captionIsMinimized()){
            return this.caption.substring(0, 182);
        }else if(this.caption){
            return this.caption;

        }

        return "";
    }

    captionIsMinimized(){
        return (this.caption && this.caption.length > 182);
    }

    
}