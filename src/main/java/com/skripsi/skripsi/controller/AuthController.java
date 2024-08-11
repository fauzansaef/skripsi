package com.skripsi.skripsi.controller;

import com.skripsi.skripsi.auth.UserDetailsImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class AuthController {


    @GetMapping("/login")
    String login(HttpServletRequest request) {
        String referer = request.getHeader("Referer");
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) principal;
            request.getSession().setAttribute("userDetails", userDetails);
        }

        request.getSession().setAttribute("previousURL", referer);
        return principal.equals("anonymousUser") ? "login" : "redirect:/home";
    }

    @GetMapping(value = "/")
    @PreAuthorize("hasAnyRole('ROLE_PROGRAMMER', 'ROLE_ANALIS', 'ROLE_KEPALA_SEKSI', 'ROLE_ADMINISTRATOR')")
    public String home() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    @PreAuthorize("hasAnyRole('ROLE_PROGRAMMER', 'ROLE_ANALIS', 'ROLE_KEPALA_SEKSI', 'ROLE_ADMINISTRATOR')")
    public String homePage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        session.setAttribute("nama", userDetails.getPegawai().getNama());
        session.setAttribute("jabatan", userDetails.getPegawai().getJabatan());
        session.setAttribute("unit", userDetails.getPegawai().getUnit());
        session.setAttribute("kantor", userDetails.getPegawai().getKantor());
        return "home";
    }

    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }
}
