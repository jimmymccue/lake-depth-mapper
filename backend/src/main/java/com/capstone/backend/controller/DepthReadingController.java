package com.capstone.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.backend.dto.DepthReadingRequest;
import com.capstone.backend.dto.DepthReadingResponse;
import com.capstone.backend.service.DepthReadingService;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/depth-readings")
public class DepthReadingController {

    private final DepthReadingService depthReadingService;

    public DepthReadingController(DepthReadingService depthReadingService) {
        this.depthReadingService = depthReadingService;
    }

    // Endpoint used to create a depth reading
    @PostMapping("/")
    public ResponseEntity<DepthReadingResponse> createDepthReading(
            @Valid @RequestBody DepthReadingRequest request) {
        DepthReadingResponse created = depthReadingService.createDepthReading(request);
        return ResponseEntity.ok(created);
    }

    // Endpoint used to fetch all depth readings
    @GetMapping("/")
    public ResponseEntity<List<DepthReadingResponse>> getAllReadings() {
        return ResponseEntity.ok(depthReadingService.getAllReadings());
    }

    // Endpoint used to fetch a depth reading by Id.
    @GetMapping("/{id}")
    public ResponseEntity<DepthReadingResponse> getReadingById(@PathVariable Long id) {
        DepthReadingResponse response = depthReadingService.getDepthReadingById(id);
        return ResponseEntity.ok(response);
    }

    // Endpoint used to update a depth reading
    @PutMapping("/{id}")
    public ResponseEntity<DepthReadingResponse> updateReading(@PathVariable Long id,
            @RequestBody DepthReadingRequest request) {
        DepthReadingResponse updated = depthReadingService.updateReading(id, request);
        return ResponseEntity.ok(updated);
    }

    // Endpoint used to delete a depth reading
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReading(@PathVariable Long id) {
        depthReadingService.deleteDepthReading(id);
        return ResponseEntity.noContent().build();
    }

}
