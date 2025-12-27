package com.saad.campusportal.service;

import org.springframework.stereotype.Service;

@Service
public class CourseService {

    private final LoggerService loggerService;

    // Constructor injection of LoggerService
    public CourseService(LoggerService loggerService) {
        this.loggerService = loggerService;
    }

    public String getCourseInfo() {
        loggerService.log("Course Service called");
        return "Course Service Active";
    }
}