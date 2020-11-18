package se.kth.sda.skeleton.raction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
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

    @GetMapping("")
    public List<Reaction> getALl(){
        return reactionService.getAllReaction();
    }

    @GetMapping("/{id}")
    public Reaction getById(@PathVariable Long id){
        return reactionService.getReactionById(id);
    }

    @GetMapping("/post/{id}")
    public List<Reaction> getReactionByPostId(@PathVariable Long id){
        return reactionService.getAllReaction();
    }

    @GetMapping("/user/{id}")
    public List<Reaction> getReactionByUserId(@PathVariable Long id){
        return reactionService.getAllReactionByUserId(id);
    }

    @PostMapping("")
    public Reaction create(@RequestBody Reaction reaction){
        reaction.setTimeStamp(Calendar.getInstance().getTime());
        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
        reaction.setAuthor(user);
        return reactionService.create(reaction);
    }

    @DeleteMapping
    public void delete(@PathVariable Long id){
        if(checkCredentials(reactionService.getReactionById(id))){
            reactionService.delete(id);
        }else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private boolean checkCredentials(Reaction reaction){
        String reactionAuthorEmail = reaction.getAuthor().getEmail();
        String editorEmail = authService.getLoggedInUserEmail();
        return reactionAuthorEmail == editorEmail;
    }
}
