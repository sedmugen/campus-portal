package com.saad.campusportal.service;

import org.springframework.stereotype.Service;

/**
 * Service providing course management domain operations and health status.
 */
@Service
public class CourseService {

    private final LoggerService loggerService;

    public CourseService(LoggerService loggerService) {
        this.loggerService = loggerService;
    }

    public String getCourseInfo() {
        loggerService.log("Course Service status queried");
        return "Course Service Active";
    }
}