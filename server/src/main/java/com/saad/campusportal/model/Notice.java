package com.saad.campusportal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Notice title cannot be blank")
    @Size(max = 150, message = "Notice title must not exceed 150 characters")
    @Column(nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Notice message cannot be blank")
    @Size(max = 2000, message = "Notice message must not exceed 2000 characters")
    @Column(nullable = false, length = 2000)
    private String message;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}