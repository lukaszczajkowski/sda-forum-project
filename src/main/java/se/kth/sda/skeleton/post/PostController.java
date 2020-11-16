package se.kth.sda.skeleton.post;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        this.service = service;
    }

    @GetMapping("")
    public List<Post> getAll(@RequestParam(required = false) Long userId) {
        if(userId != null) {
            return service.getPostsByUserId(userId);
        } else {
            return service.getAllPosts();
        }
    }

    @GetMapping("{id}")
    public Post getPostById(@PathVariable Long id) {
        return service.getPostById(id);
    }

    @PostMapping("")
    public Post create(Post post) {
        return service.create(post);
    }

    //@PutMapping()
}
