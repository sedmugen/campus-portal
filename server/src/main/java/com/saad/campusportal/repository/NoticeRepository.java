package com.saad.campusportal.repository;

import com.saad.campusportal.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository providing data access and custom queries for Notice entities.
 */
@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    /**
     * Finds all campus notices ordered reverse-chronologically by creation timestamp.
     *
     * @return list of notices with newest first
     */
    List<Notice> findAllByOrderByCreatedAtDesc();
}