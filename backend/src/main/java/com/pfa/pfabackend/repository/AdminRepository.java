package com.pfa.pfabackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pfa.pfabackend.model.Admin;
import com.pfa.pfabackend.model.User;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Page<Admin> findAll(Pageable pageable);

    @Query("SELECT a FROM Admin a WHERE a.user.id = :userId")
    Admin findByUser(@Param("userId") Long userId);

}
