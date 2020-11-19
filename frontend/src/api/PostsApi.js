import Api from "./Api";

class PostsApi {
    getAllPosts() {
        return Api.get('/posts');
    }

    getPostById(id) {
        return Api.get('/posts/'+id);
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

    getPostsSortedByUserName() {
         return Api.get("/posts", {params: {sort: "name"}})
    }
}

export default new PostsApi();