package com.revature.models;

import java.util.UUID;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Component
@Entity
@Table(name="employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID employeeid;

    private String firstname;

    private String lastname;

    @Column(nullable=false)
    private String username;

    @Column(nullable=false)
    private String password;

    private String title = "basic";


    public Employee() {
    }


    public Employee(UUID employeeid, String firstname, String lastname, String username, String password, String title) {
        this.employeeid = employeeid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.title = title;
    }



    public UUID getEmployeeid() {
        return employeeid;
    }
    public void setEmployeeid(UUID employeeid) {
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





    public String getPassword() {
        return password;
    }





    public void setPassword(String password) {
        this.password = password;
    }





    public String getTitle() {
        return title;
    }





    public void setTitle(String title) {
        this.title = title;
    }





    @Override
    public String toString() {
        return "Employee [employeeid=" + employeeid + ", username=" + username + ", password=" + password + ", title="
                + title + "]";
    }






}
