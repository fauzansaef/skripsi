package com.skripsi.skripsi.auth;

import com.skripsi.skripsi.entity.TbPegawai;
import com.skripsi.skripsi.entity.TbUser;
import com.skripsi.skripsi.repository.TbPegawaiRepo;
import com.skripsi.skripsi.repository.TbUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {
    private final TbUserRepo tbUserRepo;

    @Autowired
    public UserDetailService(TbUserRepo tbUserRepo) {
        this.tbUserRepo = tbUserRepo;
    }

    public UserDetails loadUserByUsername(String username) {
        TbUser user = tbUserRepo.findByUsernameAndActive(username,1)
                .orElseThrow(() -> new RuntimeException("username not found : " + username));
        return UserDetailsImpl.build(user);
    }
}
