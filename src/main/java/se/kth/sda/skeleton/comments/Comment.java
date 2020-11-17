package se.kth.sda.skeleton.comments;

import org.w3c.dom.Text;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Calendar;
import java.util.Date;
import java.time.LocalDateTime;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private long id;

    @Column(columnDefinition = "TEXT")
    //@NotEmpty(message = "Please add your comments")
    private String commentData;

    private LocalDateTime dateTime;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;


    public Comment() {}
    public Comment(long id,String commentData, LocalDateTime dateTime) {
        this.id=id;
        this.commentData=commentData;
        this.dateTime = LocalDateTime.now();
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getCommentData() {
        return commentData;
    }

    public void setCommentData(String commentData) {
        this.commentData = commentData;
    }



    public LocalDateTime getDateTime() {
        return LocalDateTime.now();
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
    public Post getPostDetails() {
        return post;
    }
    public void setPostDetails(Post postDetails) {
        this.post = postDetails;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}