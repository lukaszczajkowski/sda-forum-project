import Api from "./Api";

class ReactionApi {

    getReactionsId(id) {
        return Api.get('/reactions/'+id);
    }

    getReactionsByPostId(id) {
        return Api.get('/reactions/post/'+id);
    }

    getReactionsByUserId(id) {
        return Api.get('/reactions/user/'+id);
    }

    createReaction(reaction) {
        return Api.put('/reactions', reaction);
    }

    deleteReaction(id) {
        return Api.delete('/reactions/'+id);
    } 
    
    countReactionByPostId(id) {
        return Api.get('/reactions/count/post/'+id);
    } 

    validateUser(reaction) {
        return Api.put('/reactions/validate', reaction)
    }
}

export default new ReactionApi();