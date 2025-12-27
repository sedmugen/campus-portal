package com.saad.campusportal.service;

import com.saad.campusportal.model.Notice;
import com.saad.campusportal.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final LoggerService loggerService;

    // Constructor injection
    public NoticeService(NoticeRepository noticeRepository, LoggerService loggerService) {
        this.noticeRepository = noticeRepository;
        this.loggerService = loggerService;
    }

    public Notice addNotice(Notice notice) {
        loggerService.log("Adding new notice: " + notice.getTitle());
        return noticeRepository.save(notice);
    }

    public List<Notice> getAllNotices() {
        loggerService.log("Fetching all notices");
        return noticeRepository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteNotice(Long id) {
        loggerService.log("Deleting notice with id: " + id);
        noticeRepository.deleteById(id);
    }
}