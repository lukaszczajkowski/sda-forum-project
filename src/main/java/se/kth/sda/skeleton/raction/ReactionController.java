package se.kth.sda.skeleton.raction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.post.PostService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/reactions")
public class ReactionController {
    @Autowired
    private ReactionService reactionService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private PostService postService;

    @GetMapping("")
    public List<Reaction> getALl(){
        return reactionService.getAllReaction();
    }

    @GetMapping("{id}")
    public Reaction getById(@PathVariable Long id){
        return reactionService.getReactionById(id);
    }

    @GetMapping("/post/{postId}")
    public List<Reaction> getReactionByPostId(@PathVariable Long postId){
        return reactionService.getAllReactionByPostId(postId);
    }

    @GetMapping("/user/{userId}")
    public List<Reaction> getReactionByUserId(@PathVariable Long userId){
        return reactionService.getAllReactionByUserId(userId);
    }

    @GetMapping("/count/post/{postId}")
    public int countReactionByPostId(@PathVariable Long postId)   {
        return reactionService.getAllReactionByPostId(postId).size();
    }

    @GetMapping("/count/user/{userId}")
    public int countReactionByUserId(@PathVariable Long userId){
        return reactionService.getAllReactionByUserId(userId).size();
    }

    @PostMapping("/{postId}")
    public Reaction create(@PathVariable Long postId){
        Reaction reaction = new Reaction();
        reaction.setTimeStamp(Calendar.getInstance().getTime());
        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
        Post post = postService.getPostById(postId);
        reaction.setPost(post);
        reaction.setAuthor(user);
        return reactionService.create(reaction);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){  reactionService.delete(id);}

    @PostMapping("/updateByPostId/{postId}")
    private int updateReactionByPostId(@PathVariable Long postId){
        System.out.println("I am called");
        String editorEmail = authService.getLoggedInUserEmail();
        List<Reaction> reactionsOfPost = reactionService.getAllReactionByPostId(postId);

        Boolean reacted = false;
        Long reactionId = null;
        for(Reaction reaction:reactionsOfPost){
            if(editorEmail.equals(reaction.getAuthor().getEmail())){
                reacted = true;
                reactionId = reaction.getId();
                break;
            }
        }

        if(reacted){
            reactionService.delete(reactionId);
        }else {
            Reaction reaction = new Reaction();
            reaction.setTimeStamp(Calendar.getInstance().getTime());
            User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
            Post post = postService.getPostById(postId);
            reaction.setPost(post);
            reaction.setAuthor(user);
            reactionService.create(reaction);
        }

        return reactionService.getAllReactionByPostId(postId).size();
    }

}
