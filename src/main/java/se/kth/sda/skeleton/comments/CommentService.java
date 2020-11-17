package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepo repo;

    public List<Comment> getAllComments() {
        return repo.findAll();
    }
    public List<Comment> getAllCommentsByPostId(Long postId) {
        return repo.getAllCommentsByPostId(postId);
    }

    public Optional<Comment> getCommentById(Long id) {
        return repo.findById(id);
    }

    public Comment addNewComment(Comment newComment) {
        return repo.save(newComment);
    }

    public Comment updateComment(Comment updateComment) {
        return repo.save(updateComment);
    }

    public void deleteComment(Long id) {
        repo.deleteById(id);
    }
}
