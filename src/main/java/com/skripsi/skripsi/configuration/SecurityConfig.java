package com.skripsi.skripsi.configuration;

import com.skripsi.skripsi.auth.CustomAccessDeniedHandler;
import com.skripsi.skripsi.auth.CustomAuthenticationProvider;
import com.skripsi.skripsi.auth.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@ComponentScan("com.skripsi.skripsi")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomAuthenticationProvider customAuthentication;
    private final UserDetailService userDetailsService;
    private final CustomAccessDeniedHandler accessDeniedHandler;


    @Autowired
    public SecurityConfig(CustomAuthenticationProvider customAuthentication, UserDetailService userDetailsService, CustomAccessDeniedHandler accessDeniedHandler) {
        this.customAuthentication = customAuthentication;
        this.userDetailsService = userDetailsService;
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
       authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        authenticationManagerBuilder.authenticationProvider(customAuthentication);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .authorizeRequests()
                .antMatchers(
                        "/assets/**",
                        "/js/**",
                        "/css/**",
                        "/img/**",
                        "/webjars/**").permitAll()
                .antMatchers("/").hasAnyRole("ROLE_ANALIS", "ROLE_PROGRAMMER", "ROLE_KEPALA_SEKSI", "ROLE_ADMINISTRATOR")
                .antMatchers("/home").hasAnyRole("ROLE_ANALIS", "ROLE_PROGRAMMER", "ROLE_KEPALA_SEKSI", "ROLE_ADMINISTRATOR")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .defaultSuccessUrl("/", true)
                .loginPage("/login")
                .permitAll()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .logout()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .clearAuthentication(true)
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login?logout")
                .permitAll()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)
                .and()
                .httpBasic()
                .and().headers().xssProtection();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
    }


}
