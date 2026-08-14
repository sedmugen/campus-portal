package com.saad.campusportal.controller;

import com.saad.campusportal.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller demonstrating Spring Dependency Injection patterns
 * (Field, Constructor, and Setter Injection) and Bean qualification.
 */
@RestController
@RequestMapping("/api/welcome")
public class WelcomeController {

    @Autowired
    private MessageService fieldInjectedService;

    private final MessageService constructorInjectedService;
    private MessageService setterInjectedService;

    @Autowired
    public WelcomeController(@Qualifier("adminMessageService") MessageService constructorInjectedService) {
        this.constructorInjectedService = constructorInjectedService;
    }

    @Autowired
    public void setSetterInjectedService(@Qualifier("studentMessageService") MessageService setterInjectedService) {
        this.setterInjectedService = setterInjectedService;
    }

    @GetMapping
    public Map<String, String> getWelcomeMessages() {
        Map<String, String> response = new HashMap<>();
        response.put("fieldInjection", fieldInjectedService.getMessage());
        response.put("constructorInjection", constructorInjectedService.getMessage());
        response.put("setterInjection", setterInjectedService.getMessage());
        return response;
    }

    @GetMapping("/student")
    public String getStudentMessage() {
        return fieldInjectedService.getMessage();
    }

    @GetMapping("/admin")
    public String getAdminMessage() {
        return constructorInjectedService.getMessage();
    }
}