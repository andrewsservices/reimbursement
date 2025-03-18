package com.revature.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Employee;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingEmployeeDTO;
import com.revature.security.JwtTokenUtil;
import com.revature.services.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(value={"http://localhost:5174",
"http://myersbucket2025.s3-website.us-east-2.amazonaws.com/"},
allowCredentials = "true")
public class AuthController {

    private final AuthService authService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthService authService, JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    // @PostMapping("/register")
    // public ResponseEntity<OutgoingEmployeeDTO> registerEmployee(@RequestBody Employee employee,HttpSession session){
    //     OutgoingEmployeeDTO returnedEmployee = authService.registerEmployee(employee);
    //     session.setAttribute("employeeid", returnedEmployee.getemployeeid());
    //     session.setAttribute("username", returnedEmployee.getUsername());
    //     session.setAttribute("title", returnedEmployee.getTitle());
    //     return ResponseEntity.ok(returnedEmployee);
    // }

    @PostMapping("/register")
    public ResponseEntity<OutgoingEmployeeDTO> registerEmployee(@RequestBody Employee employee) {
    try {

         // Set the role (title) if not provided
         if (employee.getTitle() == null || employee.getTitle().isBlank()) {
            employee.setTitle("basic"); // Default role
        }
        // Save the new employee to the database
        Employee registeredEmployee = authService.registerEmployee(employee);

        // Generate a JWT token for the new employee
        String jwt = jwtTokenUtil.generateAccessToken(registeredEmployee);

        // Create the OutgoingEmployeeDTO
        OutgoingEmployeeDTO outgoingEmployeeDTO = new OutgoingEmployeeDTO(
            registeredEmployee.getEmployeeid(),
            registeredEmployee.getFirstname(),
            registeredEmployee.getLastname(),
            registeredEmployee.getUsername(),
            registeredEmployee.getTitle(),
            jwt
        );

        // Return the response entity with the OutgoingEmployeeDTO
        return ResponseEntity.ok().body(outgoingEmployeeDTO);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
    @PostMapping("/login")
    public ResponseEntity<OutgoingEmployeeDTO> login(@RequestBody LoginDTO loginDTO){
        try{
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
            );
            Employee loggedInEmployee = (Employee) auth.getPrincipal();
            String jwt = jwtTokenUtil.generateAccessToken(loggedInEmployee);

            return ResponseEntity.ok().body(
                new OutgoingEmployeeDTO(
                    loggedInEmployee.getEmployeeid(),
                    loggedInEmployee.getFirstname(),
                    loggedInEmployee.getLastname(),
                    loggedInEmployee.getUsername(),
                    loggedInEmployee.getTitle(),
                    jwt
                )
            );

        } catch (Exception e){
            e.printStackTrace();
            return null;
        }

        /*
        *
        OutgoingEmployeeDTO loggedInEmployee = authService.login(loginDTO);
        session.setAttribute("employeeid", loggedInEmployee.getemployeeid());
        session.setAttribute("username", loggedInEmployee.getUsername());
        session.setAttribute("title", loggedInEmployee.getTitle());
        System.out.println("Employee " + session.getAttribute("username") + " has logged in");
        return ResponseEntity.ok(loggedInEmployee);
        *
        */




    }

}
