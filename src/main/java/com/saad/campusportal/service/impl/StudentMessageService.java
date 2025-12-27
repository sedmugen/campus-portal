package com.saad.campusportal.service.impl;

import com.saad.campusportal.service.MessageService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary  // This will be the default bean
public class StudentMessageService implements MessageService {
    @Override
    public String getMessage() {
        return "Welcome Student to Campus Portal";
    }
}
