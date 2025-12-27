package com.saad.campusportal.service;

import org.springframework.stereotype.Service;

@Service
public class LoggerService {
    public String log(String message) {
        System.out.println("[LOG] " + message);
        return "Logged: " + message;
    }
}