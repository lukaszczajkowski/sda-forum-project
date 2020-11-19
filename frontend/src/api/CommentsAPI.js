import Api from "./Api";

class CommentsApi {
    
    getAllComments() {
        return Api.get('/comment');
    }

    getCommentsById(id) {
        return Api.get('/comment/'+id);
    }
    getCommentsByPostId(id) {
        return Api.get('/comment/?postId='+id);
    }

    writeComment(comment) {
        return Api.post('/comment', comment);
    }

    updateComment(comment) {
        return Api.put('/comment', comment);
    }

    deleteComment(id) {
        return Api.delete('/comment/'+id);
    }

    validateUser(comment) {
        return Api.put('/comment/validate', comment);
    }
    
}

export default new CommentsApi();