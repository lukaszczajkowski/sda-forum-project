package se.kth.sda.skeleton.raction;

import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.user.User;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.Date;

@Entity
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    private User author;

    @ManyToOne
    private Post post;

    private Date timeStamp;

    public Reaction() {}

    public Reaction(Long id, Date timeStamp) {
        this.id = id;
        this.timeStamp = timeStamp;
    }

    public Reaction(Long id, User author, Date timeStamp) {
        this.id = id;
        this.author = author;
        this.timeStamp = timeStamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }
}
