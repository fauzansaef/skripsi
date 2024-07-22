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

    private Integer id;
    private String username;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private Integer active;
    private TbPegawai pegawai;

    public UserDetailsImpl(Integer id, String username, Collection<? extends GrantedAuthority> authorities, TbPegawai pegawai, Integer active) {
        this.id = id;
        this.username = username;
        this.authorities = authorities;
        this.pegawai = pegawai;
        this.active = active;
    }

    public static UserDetailsImpl build(TbUser user) {
        GrantedAuthority role = new SimpleGrantedAuthority(user.getRefRole().getNamaRole());
        Collection<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(role);
        return new UserDetailsImpl(user.getId(), user.getUsername(), authorities, user.getPegawai(), user.getActive());
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
