package com.capstone.backend.service;

import org.springframework.stereotype.Service;
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

    @Transactional
    public DepthReadingResponse createDepthReading(DepthReadingRequest request) {
        if (request.getDepthFeet() <= 0 || request.getDepthFeet() > 1000) {
            throw new IllegalArgumentException("Depth must be between 1 and 1000 feet");
        }
        
        DepthReading reading  = new DepthReading();
        reading.setDepthFeet(request.getDepthFeet());
        reading.setLatitude(request.getLatitude());
        reading.setLongitude(request.getLongitude());
        reading.setRecordedAt(request.getRecordedAt());

        DepthReading saved = depthReadingRepository.save(reading);
        
        return new DepthReadingResponse(
            saved.getId(), 
            saved.getDepthFeet(), 
            saved.getLatitude(), 
            saved.getLongitude(), 
            saved.getRecordedAt()
        );
    }
}
