package com.capstone.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.capstone.backend.dto.DepthReadingRequest;
import com.capstone.backend.dto.DepthReadingResponse;
import com.capstone.backend.model.DepthReading;
import com.capstone.backend.repository.DepthReadingRepository;
import jakarta.transaction.Transactional;

@Service
public class DepthReadingService {

    private final DepthReadingRepository depthReadingRepository;

    public DepthReadingService(DepthReadingRepository depthReadingRepository) {
        this.depthReadingRepository = depthReadingRepository;
    }

    // Creates a new DepthReading.
    @Transactional
    public DepthReadingResponse createDepthReading(DepthReadingRequest request) {
        if (request.getDepthFeet() <= 0 || request.getDepthFeet() > 1000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Depth must be between 1 and 1000 feet");
        }

        DepthReading reading = new DepthReading();
        reading.setDepthFeet(request.getDepthFeet());
        reading.setLatitude(request.getLatitude());
        reading.setLongitude(request.getLongitude());
        reading.setRecordedAt(LocalDateTime.now());

        DepthReading saved = depthReadingRepository.save(reading);

        return new DepthReadingResponse(saved.getId(), saved.getDepthFeet(), saved.getLatitude(),
                saved.getLongitude(), saved.getRecordedAt());
    }

    // Gets all DepthReadings.
    @Transactional
    public List<DepthReadingResponse> getAllReadings() {
        return depthReadingRepository.findAll().stream()
                .map(reading -> new DepthReadingResponse(reading.getId(), reading.getDepthFeet(),
                        reading.getLatitude(), reading.getLongitude(), reading.getRecordedAt()))
                .collect(Collectors.toList());
    }

    // Gets a single DepthReading by Id.
    @Transactional
    public DepthReadingResponse getDepthReadingById(Long id) {
        DepthReading reading = depthReadingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "DepthReading with ID " + id + " not found"));

        return new DepthReadingResponse(reading.getId(), reading.getDepthFeet(),
                reading.getLatitude(), reading.getLongitude(), reading.getRecordedAt());
    }

    // Updates a DepthReading by Id.
    @Transactional
    public DepthReadingResponse updateReading(Long id, DepthReadingRequest request) {
        DepthReading reading = depthReadingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "DepthReading with ID " + id + " not found"));

        if (request.getDepthFeet() <= 0 || request.getDepthFeet() > 1000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Depth must be between 1 and 1000 feet");
        }

        reading.setDepthFeet(request.getDepthFeet());
        reading.setLatitude(request.getLatitude());
        reading.setLongitude(request.getLongitude());
        reading.setRecordedAt(LocalDateTime.now());

        DepthReading updated = depthReadingRepository.save(reading);

        return new DepthReadingResponse(updated.getId(), updated.getDepthFeet(),
                updated.getLatitude(), updated.getLongitude(), updated.getRecordedAt());

    }

    // Deletes a DepthReading by Id.
    @Transactional
    public void deleteDepthReading(Long id) {
        DepthReading reading = depthReadingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Depth Reading with ID " + id + " not found"));

        depthReadingRepository.delete(reading);
    }
}
