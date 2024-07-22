package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TbUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TbUserRepo extends JpaRepository<TbUser, Integer> {
}
