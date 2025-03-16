package com.revature.services;

import java.util.Optional;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingEmployeeDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.EmployeeDAO;
import com.revature.models.Employee;
import com.revature.models.DTOs.OutgoingEmployeeDTO;

@Service
public class AuthService {

    private final EmployeeDAO employeeDAO;

    @Autowired
    public AuthService(EmployeeDAO employeeDAO){
        this.employeeDAO = employeeDAO;
    }

    public OutgoingEmployeeDTO registerEmployee(Employee employee){
        Employee returnedEmployee = employeeDAO.save(employee);
        OutgoingEmployeeDTO registeredEmployee = new OutgoingEmployeeDTO(
            returnedEmployee.getEmployeeid(),
            returnedEmployee.getFirstname(),
            returnedEmployee.getLastname(),
            returnedEmployee.getUsername(),
            returnedEmployee.getTitle()
        );

        return registeredEmployee;

    }

    public OutgoingEmployeeDTO login(LoginDTO loginDTO){
       if(loginDTO.getUsername() == null || loginDTO.getUsername().isBlank()){
        throw new IllegalArgumentException("Username cannot be null or blank");
       }
         if(loginDTO.getPassword() == null || loginDTO.getPassword().isBlank()){
          throw new IllegalArgumentException("Password cannot be null or blank");
         }
         Employee returnedEmployee = employeeDAO.findByUsernameAndPassword(
            loginDTO.getUsername(),
            loginDTO.getPassword())
            .orElse(null);
            if(returnedEmployee == null){
                throw new IllegalArgumentException("Invalid Username or Password");
            }
            return new OutgoingEmployeeDTO(returnedEmployee);
    }
}
