package com.saad.campusportal.service.impl;

import com.saad.campusportal.service.MessageService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

/**
 * Primary student greeting service implementation providing default greeting messages.
 */
@Service("studentMessageService")
@Primary
public class StudentMessageService implements MessageService {

    @Override
    public String getMessage() {
        return "Welcome Student to Campus Portal";
    }
}
