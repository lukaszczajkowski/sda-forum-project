package se.kth.sda.skeleton.comments;

import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.user.UserService;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;
    private Object ResponseStatusException;

    public CommentController() {
        this.commentService=new CommentService();
    }

    @GetMapping("/comment")
    public List<Comment> getAllComments(@RequestParam(required = false) Long postId) {
        if(postId == null) {
            return commentService.getAllComments();
        } else
            return commentService.getAllCommentsByPostId(postId);
    }
    @GetMapping("/comment/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/comment")
    public Comment addNewComment(@RequestBody Comment newComment) {
        newComment.setUser(userService.findUserByEmail(authService.getLoggedInUserEmail()));
        return commentService.addNewComment(newComment);
    }

    @PutMapping("/comment")
    public Comment updateComment(@RequestBody Comment updateComment) {
        String currentEmail=commentService.getCommentById(updateComment.getId())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND))
                .getUser().getEmail();
        if(currentEmail.equals(authService.getLoggedInUserEmail())) {
            return commentService.addNewComment(updateComment);
        }
        else
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,"Unauthorized to update");
    }

    @DeleteMapping("/comment/{id}")
    public void DeleteComment(@PathVariable Long id) {
        String currentEmail=commentService.getCommentById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND))
                .getUser().getEmail();
        if(currentEmail.equals(authService.getLoggedInUserEmail())) {
            commentService.deleteComment(id);
        }
        else
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,"Unauthorized to update");
    }
}
