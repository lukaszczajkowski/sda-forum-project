import Api from "./Api";

class ReactionApi {

    getAllReactions(){
        return Api.get('/reactions')
    }

    getReactionsById(id) {
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

    countReactionByPostId(id) {
        return Api.get('/reactions/count/post/'+id);
    } 

    countReactionByUserId(id) {
        return Api.get('/reactions/count/user/'+id);
    } 

    deleteReaction(id) {
        return Api.delete('/reactions/'+id);
    } 

    validateUser(reaction) {
        return Api.put('/reactions/validate', reaction)
    }
}

export default new ReactionApi();