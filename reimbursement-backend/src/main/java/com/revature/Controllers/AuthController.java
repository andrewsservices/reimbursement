package com.revature.Controllers;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Employee;
import com.revature.models.DTOs.OutgoingEmployeeDTO;
import com.revature.services.AuthService;
import com.revature.models.DTOs.LoginDTO;

@RestController
@RequestMapping("/auth")
@CrossOrigin(value={"http://localhost:5173",
"http://myersbucket.s3-website.us-east-2.amazonaws.com/"},
allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<OutgoingEmployeeDTO> registerEmployee(@RequestBody Employee employee,HttpSession session){
        OutgoingEmployeeDTO returnedEmployee = authService.registerEmployee(employee);
        session.setAttribute("employeeid", returnedEmployee.getemployeeid());
        session.setAttribute("username", returnedEmployee.getUsername());
        session.setAttribute("title", returnedEmployee.getTitle());
        return ResponseEntity.ok(returnedEmployee);
    }

    @PostMapping("/login")
    public ResponseEntity<OutgoingEmployeeDTO> login(@RequestBody LoginDTO loginDTO,HttpSession session){
        OutgoingEmployeeDTO loggedInEmployee = authService.login(loginDTO);
        session.setAttribute("employeeid", loggedInEmployee.getemployeeid());
        session.setAttribute("username", loggedInEmployee.getUsername());
        session.setAttribute("title", loggedInEmployee.getTitle());
        System.out.println("Employee " + session.getAttribute("username") + " has logged in");
        return ResponseEntity.ok(loggedInEmployee);
    }

}
