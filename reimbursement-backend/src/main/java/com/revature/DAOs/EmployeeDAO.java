package com.revature.DAOs;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Employee;

@Repository
public interface EmployeeDAO extends JpaRepository<Employee,UUID>{

    public Optional<Employee> findByUsernameAndPassword(String username,String password);


}
