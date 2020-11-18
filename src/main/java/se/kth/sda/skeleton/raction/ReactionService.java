package se.kth.sda.skeleton.raction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    public List<Reaction> getAllReaction() {return reactionRepository.findAll(); }

    public Reaction getReactionById(Long id) {
        return reactionRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
    }

    public Reaction create(Reaction reaction){return reactionRepository.save(reaction);}

    public Reaction update(Reaction updateReaction){return reactionRepository.save(updateReaction);}

    public void delete(Long id){reactionRepository.deleteById(id);}

    public List<Reaction> getAllReactionByPostId(Long id){return reactionRepository.findAllByPostId(id);}

    public List<Reaction> getAllReactionByUserId(Long id){return reactionRepository.findAllByAuthorId(id);}

}
