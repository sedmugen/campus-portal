package com.saad.campusportal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saad.campusportal.model.Notice;
import com.saad.campusportal.repository.NoticeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CampusportalApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private NoticeRepository noticeRepository;

    @BeforeEach
    void setUp() {
        noticeRepository.deleteAll();
    }

    @Test
    @DisplayName("Context loads successfully")
    void contextLoads() {
    }

    @Test
    @DisplayName("GET /api/info returns service statuses")
    void shouldReturnServiceInformation() throws Exception {
        mockMvc.perform(get("/api/info"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.student", is("Student Service Active")))
                .andExpect(jsonPath("$.course", is("Course Service Active")))
                .andExpect(jsonPath("$.log", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/notice creates and persists notice")
    void shouldCreateNotice() throws Exception {
        Notice notice = new Notice();
        notice.setTitle("Midterm Examination Schedule");
        notice.setMessage("Midterm exams will commence from next Monday across all departments.");

        mockMvc.perform(post("/api/notice")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(notice)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Notice added successfully")))
                .andExpect(jsonPath("$.notice.id", notNullValue()))
                .andExpect(jsonPath("$.notice.title", is("Midterm Examination Schedule")));
    }

    @Test
    @DisplayName("GET /api/notice returns all notices ordered by createdAt desc")
    void shouldReturnAllNotices() throws Exception {
        Notice notice1 = new Notice(null, "Notice 1", "Message 1", null);
        Notice notice2 = new Notice(null, "Notice 2", "Message 2", null);
        noticeRepository.save(notice1);
        noticeRepository.save(notice2);

        mockMvc.perform(get("/api/notice"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    @DisplayName("DELETE /api/notice/{id} deletes notice successfully")
    void shouldDeleteNotice() throws Exception {
        Notice notice = new Notice(null, "To Delete", "Message to delete", null);
        Notice saved = noticeRepository.save(notice);

        mockMvc.perform(delete("/api/notice/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Notice deleted successfully")));

        mockMvc.perform(get("/api/notice"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    @DisplayName("POST /api/notice fails validation on blank fields")
    void shouldRejectBlankNotice() throws Exception {
        Notice invalidNotice = new Notice();
        invalidNotice.setTitle("");
        invalidNotice.setMessage("");

        mockMvc.perform(post("/api/notice")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidNotice)))
                .andExpect(status().isBadRequest());
    }
}
