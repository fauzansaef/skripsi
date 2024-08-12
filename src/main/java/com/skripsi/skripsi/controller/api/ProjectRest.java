package com.skripsi.skripsi.controller.api;

import com.skripsi.skripsi.dto.AplikasiDTO;
import com.skripsi.skripsi.entity.TbAplikasi;
import com.skripsi.skripsi.service.ProjectService;
import com.skripsi.skripsi.utility.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasAnyRole('ROLE_PROGRAMMER', 'ROLE_ANALIS', 'ROLE_KEPALA_SEKSI', 'ROLE_ADMINISTRATOR')")
@RequestMapping("/api/project")
public class ProjectRest {
    private final ProjectService projectService;

    @Autowired
    public ProjectRest(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<TbAplikasi> getAllProject() {
        return projectService.getAllProject();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable int id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @GetMapping("/proses/{proses}")
    public List<TbAplikasi> getAllProjectByProses(@PathVariable int proses) {
        return projectService.getAllProjectByProses(proses);
    }

    @PostMapping
    ResponseEntity<?> saveProject(@RequestBody AplikasiDTO aplikasiDTO) {
        return ResponseEntity.ok(projectService.saveProject(aplikasiDTO));
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateProject(@PathVariable int id, @RequestBody AplikasiDTO aplikasiDTO) {
        return ResponseEntity.ok(projectService.updateProject(id, aplikasiDTO));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteProject(@PathVariable int id) {
        return ResponseEntity.ok(projectService.deleteProject(id));
    }

    @PutMapping("/ajukan/{id}")
    ResponseEntity<?> ajukanProject(@PathVariable int id) {
        return ResponseEntity.ok(projectService.ajukanProject(id));
    }
}
