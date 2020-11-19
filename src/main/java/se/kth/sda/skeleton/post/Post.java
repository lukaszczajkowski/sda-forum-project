package se.kth.sda.skeleton.post;


import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.user.User;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @ManyToOne
    private User user;

    @Column(name = "date")
    private Date date;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments;

    public Post(Long id, String title, String content, User user, Date date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
        this.date = Calendar.getInstance().getTime();
    }



    public Post(Long id, String content, String title) {
        this.id = id;
        this.content = content;
        this.title = title;
    }

    public Post() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
  
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
