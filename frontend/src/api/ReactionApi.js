import Api from "./Api";

class ReactionApi {

    getAllReactions(){
        return Api.get('/reactions')
    }

    getReactionsById(id) {
        return Api.get('/reactions/'+id);
    }

    getReactionsByPostId(postId) {
        return Api.get('/reactions/post/'+postId);
    }

    getReactionsByUserId(userId) {
        return Api.get('/reactions/'+userId);
    }

    createReaction(postId) {
        return Api.post('/reactions/' +postId);
    }

    countReactionByPostId(postId) {
        return Api.get('/reactions/count/post/'+postId);
    } 

    //not used
    countReactionByUserId(userId) {
        return Api.get('/reactions/count/user/'+userId);
    } 

    deleteReaction(postId) {
        return Api.delete('/reactions/'+postId);
    } 

    //not used - handled by backend
    validateUser(reaction) {
        return Api.put('/reactions/validate', reaction);
    }

    //handled by backend?
    isUserReacted(postId){
        return Api.get("/reactions/validByPostId/" + postId);
    }

    getReactionIdByPostId(postId){
        return Api.get("/reactions/fetchReactionByPostId/" + postId);
    }
}

export default new ReactionApi();


