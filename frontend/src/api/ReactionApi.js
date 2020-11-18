import Api from "./Api";

class ReactionApi {

    getReactionsId(id) {
        return Api.get('/reactions/'+id);
    }

    
    createPost(post) {
        return Api.post('/posts', post);
    }

    updatePost(post) {
        return Api.put('/posts', post);
    }

    deletePost(id) {
        return Api.delete('/posts/'+id);
    } 

    validateUser(post) {
        return Api.put('/posts/validate', post)
    }
}

export default new ReactionApi();