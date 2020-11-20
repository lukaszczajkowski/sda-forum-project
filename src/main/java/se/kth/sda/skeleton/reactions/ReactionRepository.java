package se.kth.sda.skeleton.reactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository <Reaction, Long> {

    List<Reaction> findAllByPostId(Long postId);

    List<Reaction> findAllByUserId(Long userId);
}
