package com.saad.campusportal.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class LoggerService {

    private static final Logger logger = LoggerFactory.getLogger(LoggerService.class);

    public String log(String message) {
        logger.info("[PORTAL-AUDIT] {}", message);
        return "Logged: " + message;
    }
}