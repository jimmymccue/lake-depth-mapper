package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.capstone.backend.model.TestEntity;

public interface TestRepository extends JpaRepository<TestEntity, Long> {}
