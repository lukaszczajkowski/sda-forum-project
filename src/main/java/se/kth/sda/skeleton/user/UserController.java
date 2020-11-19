package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.skeleton.auth.AuthRequest;
import se.kth.sda.skeleton.auth.AuthService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @Autowired
    private AuthService authService;

    @GetMapping("")
    public User getUsersByEmail(@RequestParam String email) {
        return service.findUserByEmail(email);
    }

    //For testing purposes only
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/me")
    public User getUser(){
        String email = authService.getLoggedInUserEmail();
        return service.findUserByEmail(email);
    }
}
