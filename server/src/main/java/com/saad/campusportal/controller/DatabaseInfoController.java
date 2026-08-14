package com.saad.campusportal.controller;

import com.saad.campusportal.config.DatabaseConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller exposing active runtime Spring profiles and database configuration metadata.
 */
@RestController
@RequestMapping("/api/dbinfo")
public class DatabaseInfoController {

    private final DatabaseConfig databaseConfig;
    private final Environment environment;

    @Autowired
    public DatabaseInfoController(DatabaseConfig databaseConfig, Environment environment) {
        this.databaseConfig = databaseConfig;
        this.environment = environment;
    }

    @GetMapping
    public Map<String, String> getDatabaseInfo() {
        Map<String, String> response = new HashMap<>();
        response.put("activeProfile", String.join(", ", environment.getActiveProfiles()));
        response.put("databaseConfig", databaseConfig.getDatabaseInfo());
        return response;
    }
}