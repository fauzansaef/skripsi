package com.skripsi.skripsi.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.skripsi.skripsi.entity.TbPegawai;
import com.skripsi.skripsi.entity.TbUser;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;

@Data
public class UserDetailsImpl implements UserDetails {


    private TbUser user;
    private TbPegawai pegawai;

    public UserDetailsImpl(TbUser user, TbPegawai pegawai) {
        this.user = user;
        this.pegawai = pegawai;
    }

    public static UserDetailsImpl build(TbUser user) {
        return new UserDetailsImpl(user, user.getPegawai());
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        GrantedAuthority role = new SimpleGrantedAuthority(user.getRefRole().getNamaRole());
        Collection<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(role);
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
