package com.capstone.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class DepthReadingRequest {

    @NotNull(message = "Depth is required")
    @Min(value = 0, message = "Depth cannot be negative")
    @Max(value = 1000, message = "Depth cannot exceed 1000 feet")
    private Integer depthFeet;

    @NotNull(message = "Latitude is required")
    @Min(value = -90, message = "Latitude must be >= -90")
    @Max(value = 90, message = "Latitude must be <= 90")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @Min(value = -180, message = "Longitude must be >=-180")
    @Max(value = 180, message = "Longitude myst be <= 180")
    private Double longitude;

    public DepthReadingRequest() {}

    public DepthReadingRequest(Integer depthFeet, Double latitude, Double longitude) {
        this.depthFeet = depthFeet;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Integer getDepthFeet() {
        return depthFeet;
    }

    public void setDepthFeet(Integer depthFeet) {
        this.depthFeet = depthFeet;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

}
