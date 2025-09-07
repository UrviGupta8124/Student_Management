package com.example.studentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.studentmanagement.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
     long countByActive(boolean active);
}
