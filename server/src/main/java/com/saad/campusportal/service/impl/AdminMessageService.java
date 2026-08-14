package com.saad.campusportal.service.impl;

import com.saad.campusportal.service.MessageService;
import org.springframework.stereotype.Service;

/**
 * Admin greeting service implementation qualified for administrative contexts.
 */
@Service("adminMessageService")
public class AdminMessageService implements MessageService {

    @Override
    public String getMessage() {
        return "Welcome Admin to Campus Portal";
    }
}