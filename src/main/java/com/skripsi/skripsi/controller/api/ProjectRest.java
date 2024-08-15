package com.skripsi.skripsi.controller.api;

import com.skripsi.skripsi.dto.AplikasiDTO;
import com.skripsi.skripsi.entity.TbAplikasi;
import com.skripsi.skripsi.dto.TbPerangkinganDTO;
import com.skripsi.skripsi.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
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

    @GetMapping("/proses/{proses}/pegawai")
    public List<TbAplikasi> getAllProjectByProsesPegawai(@PathVariable int proses) {
        return projectService.getAllProjectByProsesPegawai(proses);
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

    @PutMapping("/deployment/{id}")
    ResponseEntity<?> ajukanDeployment(@PathVariable int id) {
        return ResponseEntity.ok(projectService.ajukanDeployment(id));
    }

    @GetMapping("/perhitungan/{id}")
    List<TbPerangkinganDTO> perhitunganSaw(@PathVariable int id) {
        List<TbPerangkinganDTO> tbPerangkinganDTOS = (List<TbPerangkinganDTO>) projectService.perhitunganSaw(id).getData();
        Collections.sort(tbPerangkinganDTOS, Comparator.comparingDouble(TbPerangkinganDTO::getPerhitunganAlternatif).reversed());
        return tbPerangkinganDTOS;
    }

    @PostMapping("/{id}/generate-tim")
    ResponseEntity<?> generateTimProject(@PathVariable int id, @RequestParam List<Integer> idPegawais) {
        return ResponseEntity.ok(projectService.generateTimProject(idPegawais, id));
    }


    @GetMapping("/{id}/generate-skep")
    public byte[] download(@PathVariable int id) throws Exception {
        byte[] fileData = projectService.generateSKep(id);
        return fileData;
//        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
//        response.setHeader("Content-Disposition", "attachment; filename=skep.pdf");
//        response.getOutputStream().write(fileData);
    }

    @GetMapping("/generate-report")
    public byte[] generateReport(@RequestParam @DateTimeFormat String tglAwal,
                                 @RequestParam @DateTimeFormat(pattern="dd-MM-yyyy")String tglAkhir) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return projectService.generateReport(LocalDate.parse(tglAwal, formatter), LocalDate.parse(tglAkhir, formatter));
    }

    @GetMapping("/generate-report-pegawai/{id}")
    public byte[] generateReportPegawai(@PathVariable int id) throws Exception {
        return projectService.generateReportPegawai(id);
    }


}
