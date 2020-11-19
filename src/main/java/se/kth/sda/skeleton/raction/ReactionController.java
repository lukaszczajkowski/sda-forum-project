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
    public void delete(@PathVariable Long id){
        if(checkCredentials(reactionService.getReactionById(id))){
            reactionService.delete(id);
        }else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("/validate")
    public Reaction validate(@RequestBody Reaction reaction) {
        if(checkCredentials(reaction)){
            return reaction;
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private boolean checkCredentials(Reaction reaction){
        String reactionAuthorEmail = reaction.getAuthor().getEmail();
        String editorEmail = authService.getLoggedInUserEmail();
        return reactionAuthorEmail == editorEmail;
    }

    @GetMapping("/fetchReactionByPostId/{postId}")
    private Long getIdByPostId(@PathVariable Long postId){
        Reaction reaction = checkUserReactedAlready(postId);
        if(reaction == null) {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        } else {
            return reaction.getId();
        }
    }

    @GetMapping("/validByPostId/{postId}")
    private boolean validByPost(@PathVariable Long postId){
        if(checkUserReactedAlready(postId) == null){
            return false;
        }else{
            return true;
        }
    }

    //changed to boolean from Reaction
    private Reaction checkUserReactedAlready(Long postId){
        String editorEmail = authService.getLoggedInUserEmail();
        List<Reaction> reactedOfPost = reactionService.getAllReactionByPostId(postId);
        if(reactedOfPost.size() == 0){
            create(postId);
            checkUserReactedAlready(postId);
        } else {
            for(Reaction reaction:reactedOfPost) {
                if (reaction.getAuthor().getEmail().equals(editorEmail)) {
                System.out.println("Check user reacted - match found!");
                return reaction;
                    }
            }
        }
        return null;
    }
}
