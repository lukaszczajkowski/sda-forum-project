package se.kth.sda.skeleton.post;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PostService {

    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public List<Post> getAllPosts() {
        return this.repository.findAll();
    }

    public Post getPostById(Long id){
        return this.repository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
    }

    public List<Post> getPostsByUserId(Long userId){
        return this.repository.findAllByUserId(userId);
    }

    public Post create(Post post) {
        return this.repository.save(post);
    }

    public Post update(Post updatedPost) {
        return this.repository.save(updatedPost);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}

