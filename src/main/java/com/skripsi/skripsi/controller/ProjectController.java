package com.skripsi.skripsi.controller;

import com.skripsi.skripsi.service.ProjectService;
import com.skripsi.skripsi.service.ReferensiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService projectService;
    private final ReferensiService referensiService;

    @Autowired
    public ProjectController(ProjectService projectService, ReferensiService referensiService) {
        this.projectService = projectService;
        this.referensiService = referensiService;
    }

    @GetMapping("/monitoring")
    public String monitoring() {
        return "/project/monitoring";
    }

    @GetMapping("/request")
    public String request(Model model) {
        model.addAttribute("listBahasa", referensiService.getBahasaPemrograman());
        model.addAttribute("listDatabase", referensiService.getDatabase());
        return "/project/request";
    }

    @GetMapping("/task")
    public String task() {
        return "/project/task";
    }
}
