package se.kth.sda.skeleton.post;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService service;


    private final UserService userService;
    private final AuthService authService;

    public PostController(PostService service, UserService userService, AuthService authService) {
        this.service = service;
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("")
    public List<Post> getAll(@RequestParam(required = false) Long userId,
                            @RequestParam(required = false) String sort) {
        if (userId != null) {
            System.out.println("I am here");
            return service.getPostsByUserId(userId);
        }
        if (sort != null) {
            return service.getAllPosts(sort);
        }
        return service.getAllPosts();
    }

    @GetMapping("{id}")
    public Post getPostById(@PathVariable Long id) {
        return service.getPostById(id);
    }

    @PostMapping("")
    public Post create(@RequestBody Post post) {
        post.setDate(Calendar.getInstance().getTime());
        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
        post.setUser(user);
        return service.create(post);
    }

    @PutMapping("")
    public Post update(@RequestBody Post updatedPost) {
        if(checkCredentials(updatedPost)){
            return service.update(updatedPost);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        if(checkCredentials(service.getPostById(id))){
            service.delete(id);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("/validate")
    public Post validate(@RequestBody Post post) {
        if(checkCredentials(post)){
            return post;
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private boolean checkCredentials(Post post) {
        String postAuthorEmail = post.getUser().getEmail();
        String editorEmail = authService.getLoggedInUserEmail();
        return postAuthorEmail.equals(editorEmail);
    }
}
