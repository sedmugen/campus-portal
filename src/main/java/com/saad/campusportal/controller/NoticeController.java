package com.saad.campusportal.controller;

import com.saad.campusportal.model.Notice;
import com.saad.campusportal.service.NoticeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notice")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class NoticeController {

    private final NoticeService noticeService;

    // Constructor injection
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addNotice(@RequestBody @Valid Notice notice) {
        Notice savedNotice = noticeService.addNotice(notice);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Notice added successfully");
        response.put("notice", savedNotice);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        List<Notice> notices = noticeService.getAllNotices();
        return ResponseEntity.ok(notices);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        Map<String, String> response = new HashMap<>();
        response.put("success", "true");
        response.put("message", "Notice deleted successfully");
        return ResponseEntity.ok(response);
    }
}