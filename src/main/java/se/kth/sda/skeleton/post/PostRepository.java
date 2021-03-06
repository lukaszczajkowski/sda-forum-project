package se.kth.sda.skeleton.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository <Post, Long> {
    List<Post> findAllByUserId(Long userId);
}

