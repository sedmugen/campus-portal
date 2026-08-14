package com.saad.campusportal.controller;

import com.saad.campusportal.service.CourseService;
import com.saad.campusportal.service.LoggerService;
import com.saad.campusportal.service.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/info")
public class InfoController {

    private final StudentService studentService;
    private final CourseService courseService;
    private final LoggerService loggerService;

    public InfoController(StudentService studentService, CourseService courseService, LoggerService loggerService) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.loggerService = loggerService;
    }

    @GetMapping
    public Map<String, String> getInfo() {
        loggerService.log("System info status requested");
        Map<String, String> response = new HashMap<>();
        response.put("student", studentService.getStudentInfo());
        response.put("course", courseService.getCourseInfo());
        response.put("log", "Audit logging active");
        return response;
    }
}