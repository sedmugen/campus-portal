package com.saad.campusportal.service;

import com.saad.campusportal.model.Notice;
import com.saad.campusportal.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service encapsulating business logic and persistence operations for campus notices.
 */
@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final LoggerService loggerService;

    public NoticeService(NoticeRepository noticeRepository, LoggerService loggerService) {
        this.noticeRepository = noticeRepository;
        this.loggerService = loggerService;
    }

    public Notice addNotice(Notice notice) {
        loggerService.log("Publishing notice: " + notice.getTitle());
        return noticeRepository.save(notice);
    }

    public List<Notice> getAllNotices() {
        loggerService.log("Retrieving all active campus notices");
        return noticeRepository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteNotice(Long id) {
        loggerService.log("Deleting notice with ID: " + id);
        noticeRepository.deleteById(id);
    }
}