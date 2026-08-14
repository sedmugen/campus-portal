package com.saad.campusportal.service;

import org.springframework.stereotype.Service;

/**
 * Service providing student management domain operations and health status.
 */
@Service
public class StudentService {

    private final LoggerService loggerService;

    public StudentService(LoggerService loggerService) {
        this.loggerService = loggerService;
    }

    public String getStudentInfo() {
        loggerService.log("Student Service status queried");
        return "Student Service Active";
    }
}