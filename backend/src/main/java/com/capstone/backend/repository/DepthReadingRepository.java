package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.capstone.backend.model.DepthReading;

public interface DepthReadingRepository extends JpaRepository<DepthReading, Long> {

}
