package com.revature.DAOs;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Reimbursement;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, UUID> {
   public List<Reimbursement> findByEmployee_Employeeid(UUID employeeid);
   void deleteByEmployee_Employeeid(UUID employeeid);
}
