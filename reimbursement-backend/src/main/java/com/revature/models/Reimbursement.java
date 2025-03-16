package com.revature.models;

import java.util.UUID;

import org.springframework.stereotype.Component;

import jakarta.persistence.*;

@Component
@Entity
@Table(name="reimbursements")
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID reimbursementid;

    private String description;

    private double amount;

    private String status;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "employeeid")
    private Employee employee;

    public Reimbursement() {
    }

    public Reimbursement(UUID reimbursementid, String description, double amount, String status, Employee employee) {
        this.reimbursementid = reimbursementid;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.employee = employee;
    }

    public UUID getReimbursementid() {
        return reimbursementid;
    }

    public void setReimbursementid(UUID reimbursementid) {
        this.reimbursementid = reimbursementid;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }





}
