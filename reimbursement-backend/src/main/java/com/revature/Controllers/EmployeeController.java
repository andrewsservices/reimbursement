package com.revature.Controllers;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.revature.aspects.AdminOnly;

import com.revature.models.Employee;
import com.revature.models.DTOs.OutgoingEmployeeDTO;
import com.revature.services.EmployeeService;
import com.revature.services.ReimbursementService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/employees")

@CrossOrigin(value={"http://localhost:5173",
"http://myersbucket.s3-website.us-east-2.amazonaws.com/"},
allowCredentials = "true")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final ReimbursementService reimbursementService;

    @Autowired
    public EmployeeController(EmployeeService employeeService, ReimbursementService reimbursementService) {
        this.employeeService = employeeService;
        this.reimbursementService = reimbursementService;
    }

    @GetMapping
    @AdminOnly
    public ResponseEntity<List<OutgoingEmployeeDTO>> getAllEmployees(){
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @PatchMapping("/promote/{id}")
    @AdminOnly
    public ResponseEntity<Employee> promoteEmployee(@PathVariable UUID id){
        Employee promotedEmployee = employeeService.promoteEmployee(id);
        return ResponseEntity.ok(promotedEmployee);
    }

    @DeleteMapping("/{id}")
    @AdminOnly
    public void removeEmployee(@PathVariable UUID id) {
        employeeService.removeEmployee(id);
    }
}
