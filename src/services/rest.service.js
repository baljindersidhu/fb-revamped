class RestService{

    async getStories(){
        let response = await fetch("data/stories.json");
        return response.json();
    }

    async getPostsForNewsFeed(){
        let response = await fetch("data/news-feed.json");
        return response.json();
    }

}

export default new RestService();