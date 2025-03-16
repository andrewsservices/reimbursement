package com.revature.models.DTOs;

import java.util.UUID;

public class IncomingReimbursementDTO {
    private UUID reimbursementid;
    private String description;
    private double amount;
    private String status;
    private UUID employeeid;

    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(UUID reimbursementid, String description, double amount, String status, UUID employeeid) {
        this.reimbursementid = reimbursementid;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.employeeid = employeeid;
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

    public UUID getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(UUID employeeid) {
        this.employeeid = employeeid;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO [reimbursementid=" + reimbursementid + ", description=" + description
                + ", amount=" + amount + ", status=" + status + ", employeeid=" + employeeid + "]";
    }



}
