package com.revature.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.EmployeeDAO;
import com.revature.DAOs.ReimbursementDAO;
import com.revature.models.Employee;
import com.revature.models.DTOs.OutgoingEmployeeDTO;

import jakarta.transaction.Transactional;

@Service
public class EmployeeService {

    private final EmployeeDAO employeeDAO;
    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public EmployeeService(EmployeeDAO employeeDAO, ReimbursementDAO reimbursementDAO) {
        this.employeeDAO = employeeDAO;
        this.reimbursementDAO = reimbursementDAO;
    }


    public List<OutgoingEmployeeDTO> getAllEmployees(){
        List<Employee> allEmployees = employeeDAO.findAll();
        List<OutgoingEmployeeDTO> employeeDTOs = new ArrayList<>();
        for(Employee e: allEmployees){
            employeeDTOs.add(new OutgoingEmployeeDTO(e));
        }
        return employeeDTOs;
    }

    @Transactional
    public Employee promoteEmployee(UUID employeeid){
        Optional<Employee> optionalEmployee = employeeDAO.findById(employeeid);
        if(optionalEmployee.isPresent()){
            Employee employee = optionalEmployee.get();
            employee.setTitle("manager");
            return employeeDAO.save(employee);
        } else {
            throw new IllegalArgumentException("Employee not found with ID: " + employeeid);
        }
    }

    @Transactional
    public void removeEmployee(UUID employeeid){
         // Delete all reimbursements associated with the employee
         reimbursementDAO.deleteByEmployee_Employeeid(employeeid);
         // Delete the employee
         employeeDAO.deleteById(employeeid);
    }


}
