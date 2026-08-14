package com.saad.campusportal.config;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Production environment database profile implementing PostgreSQL configuration metadata.
 */
@Component
@Profile("prod")
public class PostgreDatabaseConfig implements DatabaseConfig {

    @Override
    public String getDatabaseInfo() {
        return "PostgreSQL Database Configuration - Production Environment (Port: 5432)";
    }
}