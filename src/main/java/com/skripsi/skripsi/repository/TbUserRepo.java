package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TbUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TbUserRepo extends JpaRepository<TbUser, Integer> {
    Optional<TbUser> findByUsernameAndActive(String username, Integer active);
}
