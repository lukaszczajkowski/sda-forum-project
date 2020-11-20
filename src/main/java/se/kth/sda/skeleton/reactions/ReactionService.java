package se.kth.sda.skeleton.reactions;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ReactionService {

    private final ReactionRepository reactionRepository;

    public ReactionService(ReactionRepository reactionRepository) {
        this.reactionRepository = reactionRepository;
    }

    public List<Reaction> getAll() {
        return reactionRepository.findAll();
    }

    public List<Reaction> getAllByPostId(Long postId){
        return reactionRepository.findAllByPostId(postId);
    }

    public Reaction getById(Long id) {
        return reactionRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<Reaction> getAllByUserId(Long userId){
        return reactionRepository.findAllByUserId(userId);
    }

    public Reaction create(Reaction reaction) {
        return reactionRepository.save(reaction);
    }

    public void delete(Long id) {
        reactionRepository.deleteById(id);
    }
}
