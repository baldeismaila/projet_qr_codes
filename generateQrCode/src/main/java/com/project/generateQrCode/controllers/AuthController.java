package com.project.generateQrCode.controllers;

import com.google.zxing.WriterException;
import com.project.generateQrCode.entities.Role;
import com.project.generateQrCode.entities.User;
import com.project.generateQrCode.services.AuthService;
import com.project.generateQrCode.utils.AuthRequest;
import com.project.generateQrCode.utils.AuthResponse;
import com.project.generateQrCode.utils.QrCodeGenerator;
import com.project.generateQrCode.utils.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/users/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping("/token/authenticate")
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody AuthRequest request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return authService.findAllUsers();
    }

    @GetMapping("/users/request")
    public List<RegisterRequest> getAllUsersRegister(){
        return authService.findAllUsersRegister();
    }

    @GetMapping("/users/{id}")
    public RegisterRequest getUser(@PathVariable("id") Integer id){
        return authService.findUserById(id);
    }

    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable("email") String email){
        return authService.findUserByEmail(email);
    }

    @GetMapping("/qrcodes/{size}")
    public String generateQrCodes(@PathVariable Integer size,
                                                    @RequestParam(name = "W", defaultValue = "100") Integer width,
                                                    @RequestParam(name = "H", defaultValue = "100") Integer height) throws IOException, WriterException {
        return QrCodeGenerator.generateZipQrCodeData(size,width,height);
    }

    @GetMapping("/users/qrcode/{size}")
    public String generationQrCodes(@PathVariable Integer size,
                                                    @RequestParam(name = "W", defaultValue = "100") Integer width,
                                                    @RequestParam(name = "H", defaultValue = "100") Integer height) throws IOException, WriterException {
        return QrCodeGenerator.generateQrCode(size,width,height);
    }

    @GetMapping("/users/roles/{email}")
    public void addRoleToUser(@PathVariable String email,@RequestParam(name = "role") Role role) {
        authService.addRoleToUser(email, role);
    }

    @PutMapping("/users/update/{id}")
    public void updateUser(@PathVariable("id") Integer id, @RequestBody User user) {
        authService.updateUser(id, user);
    }

    @GetMapping("/users/lock/{email}")
    public String blockUser(@PathVariable("email") String email) {
        return authService.blockUser(email);
    }

    @GetMapping("/users/unlock/{email}")
    public String unlockUser(@PathVariable("email") String email) {
        return authService.unlockUser(email);
    }

    @DeleteMapping("/users/delete/{email}")
    public void deleteUser(@PathVariable("email") String email) {
        authService.deleteUser(email);
    }

}
