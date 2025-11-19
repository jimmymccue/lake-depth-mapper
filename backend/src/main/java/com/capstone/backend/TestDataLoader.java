package com.capstone.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.capstone.backend.model.TestEntity;
import com.capstone.backend.repository.TestRepository;

@Component
public class TestDataLoader implements CommandLineRunner {

    private final TestRepository repository;

    public TestDataLoader(TestRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        TestEntity test = new TestEntity();
        test.setId(1L);
        test.setValue("Hello H2");
        repository.save(test);
    }
}
