class RestService{

    async getStories(){
        let response = await fetch("data/stories.json");
        return response.json();
    }

}

export default new RestService();