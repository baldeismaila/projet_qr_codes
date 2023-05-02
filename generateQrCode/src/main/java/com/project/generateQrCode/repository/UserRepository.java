package com.project.generateQrCode.repository;

import com.project.generateQrCode.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    @Query("select u from User u where u.email = :username")
    User findByUsername(String username);

}
