import Axios from "axios";
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

    createReaction(postId) {
        return Api.post('/reactions' +postId);
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
        return Api.put('/reactions/validate', reaction);
    }

    isUserReacted(postId){
        return Api.get("/reactions/validByPostId/" + postId);
    }

    getReactionIdByPostId(postId){
        return Api.get("/reactions/fetchReactionByPostId/" + postId);
    }
}

export default new ReactionApi();