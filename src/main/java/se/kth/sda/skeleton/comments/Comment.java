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

    @GeneratedValue(strategy = GenerationType.AUTO)
    private LocalDateTime dateTime = LocalDateTime.now();

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;

    // Hibernate needs a default constructor to function
    public Comment() {}
    public Comment(long id,String commentData, LocalDateTime dateTime) {
        this.id=id;
        this.commentData=commentData;
        this.dateTime = dateTime;
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
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}