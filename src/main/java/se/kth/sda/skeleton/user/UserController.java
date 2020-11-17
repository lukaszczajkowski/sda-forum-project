package se.kth.sda.skeleton.user;

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

    @GetMapping("")
    public User getUsersByEmail(@RequestParam String email) {
        return service.findUserByEmail(email);
    }

    //For testing purposes only
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }
}
