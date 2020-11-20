package se.kth.sda.skeleton.reactions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.post.PostService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/reactions")
public class ReactionController {

    private final ReactionService reactionService;
    private final AuthService authService;
    private final UserService userService;
    private final PostService postService;

    public ReactionController(ReactionService reactionService,
                              AuthService authService,
                              UserService userService,
                              PostService postService) {
        this.reactionService = reactionService;
        this.authService = authService;
        this.userService = userService;
        this.postService = postService;
    }

    @GetMapping("{postId}")
    public List<Reaction> getAll(@PathVariable(required = false) Long userId,
                                 @PathVariable(required = true) Long postId){
        if(userId != null) {
            return reactionService.getAllByUserId(userId);
        } else if (postId != null) {
            return reactionService.getAllByPostId(postId);
        } else {
            return reactionService.getAll();
        }
    }

    //Pass the reaction id
    @GetMapping("{id}")
    public Reaction getById(@PathVariable Long id) {
        return reactionService.getById(id);
    }

    //Pass the post id
    @PostMapping("{postId}")
    public Reaction create(@PathVariable Long postId) {

        System.out.println("Are we here?");
        List<Reaction> postReactions = reactionService.getAllByPostId(postId);
        String loggedUserEmail = authService.getLoggedInUserEmail();

        for(Reaction reaction : postReactions) {
            if (reaction.getUser().getEmail().equals(loggedUserEmail)){
                Long reactionId = reaction.getId();
                unlike(reactionId);
                return null;
            }
        }

        Reaction reaction = new Reaction();
        Post post = postService.getPostById(postId);
        reaction.setPost(post);
        String email = authService.getLoggedInUserEmail();
        User user = userService.findUserByEmail(email);
        reaction.setUser(user);
        System.out.println("Reaction by" + reaction.getUser().getEmail());
        System.out.println("Creating...");
        return reactionService.create(reaction);
    }

    @GetMapping("/count/post/{postId}")
    public int countReactionByPostId(@PathVariable Long postId) {
        return reactionService.getAllByPostId(postId).size();
    }

    //Pass the post id
    @DeleteMapping("{postId}")
    public void delete(@PathVariable Long postId) {

        List<Reaction> postReactions = reactionService.getAllByPostId(postId);
        String loggedUserEmail = authService.getLoggedInUserEmail();

        for(Reaction reaction : postReactions) {
            if (reaction.getUser().getEmail().equals(loggedUserEmail)) {
                Long reactionId = reaction.getId();
                System.out.println("Deleting...");
                reactionService.delete(reactionId);
            }
        }

        throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
    }

    @GetMapping("/validByPostId/{postId}")
    private boolean validByPost(@PathVariable Long postId){
        List<Reaction> postsReactions = reactionService.getAllByPostId(postId);
        String loggedInUserEmail = authService.getLoggedInUserEmail();
        for (Reaction reaction:
                postsReactions) {
            System.out.println("Comparing " + loggedInUserEmail + " with " + reaction.getUser().getEmail());
            if(reaction.getUser().getEmail().equals(loggedInUserEmail)){
                System.out.println("Already liked");
                return true;
            }
        }
        System.out.println("Didn't like.");
        return false;
    }

    public void unlike(Long id) {
        System.out.println("Deleting");
        reactionService.delete(id);
    }

}
