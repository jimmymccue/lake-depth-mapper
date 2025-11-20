package com.capstone.backend.dto;

import java.time.LocalDateTime;

public class DepthReadingResponse {

    private Long id;
    private Integer depthFeet;
    private Double latitude;
    private Double longitude;
    private LocalDateTime recordedAt;

    public DepthReadingResponse(Long id, Integer depthFeet, Double latitude, Double longitude,
            LocalDateTime recordedAt) {
        this.id = id;
        this.depthFeet = depthFeet;
        this.latitude = latitude;
        this.longitude = longitude;
        this.recordedAt = recordedAt;
    }

    public Long getId() {
        return id;
    }

    public Integer getDepthFeet() {
        return depthFeet;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

}
