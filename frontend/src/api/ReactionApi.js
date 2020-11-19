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

    updateReaction(postId){
        return Api.post("/reactions/updateByPostId/" + postId);
    }
}

export default new ReactionApi();