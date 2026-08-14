package com.saad.campusportal.config;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class MySQLDatabaseConfig implements DatabaseConfig {
    @Override
    public String getDatabaseInfo() {
        return "MySQL Database Configuration - Development Environment (Port: 3306)";
    }
}