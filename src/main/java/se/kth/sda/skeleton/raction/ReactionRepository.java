package se.kth.sda.skeleton.raction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    List<Reaction> findAllByAuthorId(Long authorId);
    List<Reaction> findAllByPostId(Long postId);
}
