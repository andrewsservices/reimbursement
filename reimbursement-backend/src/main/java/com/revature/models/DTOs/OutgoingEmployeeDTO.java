package com.revature.models.DTOs;

import java.util.UUID;

import com.revature.models.Employee;

public class OutgoingEmployeeDTO {
   private UUID employeeid;
   private String firstname;
   private String lastname;
    private String username;
    private String title;
    private String jwt;


    public OutgoingEmployeeDTO() {
    }



    public OutgoingEmployeeDTO(UUID employeeid, String firstname, String lastname, String username, String title) {
        this.employeeid = employeeid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.title = title;
    }

    public OutgoingEmployeeDTO(UUID employeeid, String firstname, String lastname, String username, String title, String jwt) {
        this.employeeid = employeeid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.title = title;
        this.jwt = jwt;
    }

    public OutgoingEmployeeDTO(Employee employee){
        this.employeeid = employee.getEmployeeid();
        this.firstname = employee.getFirstname();
        this.lastname = employee.getLastname();
        this.username = employee.getUsername();
        this.title = employee.getTitle();
    }



    public UUID getemployeeid() {
        return employeeid;
    }



    public void setemployeeid(UUID employeeid) {
        this.employeeid = employeeid;
    }



    public String getFirstname() {
        return firstname;
    }



    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }



    public String getLastname() {
        return lastname;
    }



    public void setLastname(String lastname) {
        this.lastname = lastname;
    }



    public String getUsername() {
        return username;
    }



    public void setUsername(String username) {
        this.username = username;
    }



    public String getTitle() {
        return title;
    }



    public void setTitle(String title) {
        this.title = title;
    }



    public String getJwt() {
        return jwt;
    }



    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    

}
