package com.project.generateQrCode.utils;

import com.project.generateQrCode.entities.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    //private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
}
