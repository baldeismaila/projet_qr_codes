package com.project.generateQrCode.services;

import com.project.generateQrCode.entities.Role;
import com.project.generateQrCode.entities.User;
import com.project.generateQrCode.repository.UserRepository;
import com.project.generateQrCode.utils.AuthRequest;
import com.project.generateQrCode.utils.AuthResponse;
import com.project.generateQrCode.utils.RegisterRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if(!(userRepository.findByEmail(request.getEmail()).isEmpty())){
            throw new RuntimeException("A user with email " +request.getEmail() +" already exists");
        }

        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getFirstname()+"01"))
                .role(request.getRole())
                .active(true)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        System.out.println("affichage du token:"+user + user.getAuthorities());
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public void addRoleToUser(String email, Role role) {
        User user = userRepository.findByUsername(email);
        if(user == null) throw new RuntimeException("User not found");
        if(role != Role.ROLE_USER && role != Role.ROLE_ADMIN) {
            throw new RuntimeException("Role not found");
        }
        user.setRole(role);
        userRepository.save(user);
    }

    public RegisterRequest findUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
        return mapToUserRequest(user);
    }

    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return user;
    }
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public void updateUser(Integer id, User user) {
        var userTemp = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
        if(userTemp == null){
            throw new RuntimeException("A user with id " + id +" doesn't exist");
        }
        user.setId(userTemp.getId());
        user.setPassword(passwordEncoder.encode(userTemp.getPassword()));
        user.setActive(true);
        userRepository.save(user);
    }

    public void deleteUser(String email) {
        var userTemp = userRepository.findByUsername(email);
        if(userTemp == null){
            throw new RuntimeException("A user with email " +email +" doesn't exist");
        }else {
            userRepository.deleteById(userTemp.getId());
        }
    }

    @Transactional
    public String blockUser(String email) {
        var userTemp = userRepository.findByUsername(email);
        if(userTemp == null){
            throw new RuntimeException("A user with email " +email +" doesn't exist");
        }
        userTemp.setActive(false);
        return email + " is blocked";
    }

    @Transactional
    public String unlockUser(String email) {
        var userTemp = userRepository.findByUsername(email);
        if(userTemp == null){
            throw new RuntimeException("A user with email " +email +" doesn't exist");
        }
        userTemp.setActive(true);
        return email + " is unlocked";
    }

    public List<RegisterRequest> findAllUsersRegister() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map((user) -> mapToUserRequest(user))
                .collect(Collectors.toList());
    }

    private RegisterRequest mapToUserRequest(User user){
        RegisterRequest userRequest = new RegisterRequest();
        userRequest.setId(user.getId());
        userRequest.setFirstname(user.getFirstname());
        userRequest.setLastname(user.getLastname());
        userRequest.setEmail(user.getEmail());
        userRequest.setRole(user.getRole());

        return userRequest;
    }

}
