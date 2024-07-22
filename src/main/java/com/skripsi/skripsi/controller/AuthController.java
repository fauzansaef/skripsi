package com.skripsi.skripsi.controller;

import com.skripsi.skripsi.auth.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

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

        return principal == "anonymousUser" ? "login" : "redirect:/home";


    }

    @GetMapping(value = "/")
    public String home() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String homePage() {
        return "home";
    }

    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }
}
