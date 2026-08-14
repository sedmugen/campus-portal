package com.saad.campusportal.service.impl;

import com.saad.campusportal.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class AdminMessageService implements MessageService {
    @Override
    public String getMessage() {
        return "Welcome Admin to Campus Portal";
    }
}