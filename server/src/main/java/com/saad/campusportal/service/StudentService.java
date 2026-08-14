package com.saad.campusportal.service;

import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final LoggerService loggerService;

    // Constructor injection of LoggerService
    public StudentService(LoggerService loggerService) {
        this.loggerService = loggerService;
    }

    public String getStudentInfo() {
        loggerService.log("Student Service called");
        return "Student Service Active";
    }
}