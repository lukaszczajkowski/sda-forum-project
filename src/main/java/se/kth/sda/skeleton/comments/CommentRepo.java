package se.kth.sda.skeleton.comments;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    List<Comment> getAllCommentsByPostId(Long postId);
}
