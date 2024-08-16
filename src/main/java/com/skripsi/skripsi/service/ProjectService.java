package com.skripsi.skripsi.service;

import com.skripsi.skripsi.auth.UserDetailsImpl;
import com.skripsi.skripsi.dto.AplikasiDTO;
import com.skripsi.skripsi.dto.ReportDTO;
import com.skripsi.skripsi.dto.SKepDTO;
import com.skripsi.skripsi.dto.TbPerangkinganDTO;
import com.skripsi.skripsi.entity.*;
import com.skripsi.skripsi.repository.*;
import com.skripsi.skripsi.utility.ReportUtil;
import com.skripsi.skripsi.utility.SAWUtil;
import com.skripsi.skripsi.utility.MessageResponse;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService implements IProjectService {
    private final TbAplikasiRepo tbAplikasiRepo;
    private final TrxBahasaPemrogramanRepo trxBahasaPemrogramanRepo;
    private final TrxJenisDatabaseRepo trxJenisDatabaseRepo;
    private final TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo;
    private final TbTimRepo tbTimRepo;
    private final ModelMapper modelMapper;
    private final SAWUtil SAWUtil;
    private final ReportUtil reportUtil;
    private final TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo;
    private final RefStackRepo refStackRepo;


    @Autowired
    public ProjectService(TbAplikasiRepo tbAplikasiRepo, TrxBahasaPemrogramanRepo trxBahasaPemrogramanRepo, TrxJenisDatabaseRepo trxJenisDatabaseRepo, TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo, TbTimRepo tbTimRepo, ModelMapper modelMapper, SAWUtil SAWUtil, ReportUtil reportUtil, TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo,
                          RefStackRepo refStackRepo) {
        this.tbAplikasiRepo = tbAplikasiRepo;
        this.trxBahasaPemrogramanRepo = trxBahasaPemrogramanRepo;
        this.trxJenisDatabaseRepo = trxJenisDatabaseRepo;
        this.tbKriteriaPegawaiMatrixRepo = tbKriteriaPegawaiMatrixRepo;
        this.tbTimRepo = tbTimRepo;
        this.modelMapper = modelMapper;
        this.SAWUtil = SAWUtil;
        this.reportUtil = reportUtil;
        this.tbKriteriaPegawaiRepo = tbKriteriaPegawaiRepo;
        this.refStackRepo = refStackRepo;
    }

    @Override
    public List<TbAplikasi> getAllProject() {
        return tbAplikasiRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public List<TbAplikasi> getAllProjectByProses(int proses) {
        return tbAplikasiRepo.findAllByProses(proses);
    }

    @Override
    public List<TbAplikasi> getAllProjectByProsesPegawai(int proses) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        List<TbTim> tbTimList = tbTimRepo.findAllByIdPegawai(userDetails.getPegawai().getId());
        List<TbAplikasi> tbAplikasiList = new ArrayList<>();


        if (proses == 0) {
            System.out.println(tbTimList.size());
            if (!tbTimList.isEmpty()) {
                tbTimList.forEach(tbTim -> {
                    tbAplikasiList.add(tbTim.getTbAplikasi());
                });
                return tbAplikasiList;
            }
        } else {
            if (!tbTimList.isEmpty()) {
                tbTimList.forEach(tbTim -> {
                    if (tbTim.getTbAplikasi().getProses() == proses)
                        tbAplikasiList.add(tbTim.getTbAplikasi());
                });
                return tbAplikasiList;
            }
        }

        return tbAplikasiList;
    }

    @Override
    public MessageResponse getProjectById(int id) {
        if (!tbAplikasiRepo.existsById(id)) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        return new MessageResponse(1, "Success", tbAplikasiRepo.findById(id).get());
    }

    @Override
    public MessageResponse saveProject(AplikasiDTO aplikasiDTO) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        TbAplikasi tbAplikasi = modelMapper.map(aplikasiDTO, TbAplikasi.class);
        tbAplikasi.setProses(0);//0:draft, 1:pengembangan, 2:testing, 3:deploy
        tbAplikasi.setStack(Arrays.toString(aplikasiDTO.getListStack()));
        tbAplikasi.setAnalis(userDetails.getPegawai().getId());
        tbAplikasi.setCreatedAt(java.time.LocalDate.now());
        tbAplikasiRepo.save(tbAplikasi);

//        setListBahasaPemrogramanDanDatabase(aplikasiDTO, tbAplikasi);

        return new MessageResponse(1, "Project berhasil disimpan", tbAplikasi);
    }

    @Override
    public MessageResponse updateProject(int id, AplikasiDTO aplikasiDTO) {

        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);

        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }


        if (!trxBahasaPemrogramanRepo.findAllByIdAplikasi(id).isEmpty()) {
            trxBahasaPemrogramanRepo.findAllByIdAplikasi(id).forEach(trxBahasaPemrograman -> {
                trxBahasaPemrogramanRepo.deleteById(trxBahasaPemrograman.getId());
            });
        }

        if (!trxJenisDatabaseRepo.findAllByIdAplikasi(id).isEmpty()) {
            trxJenisDatabaseRepo.findAllByIdAplikasi(id).forEach(trxJenisDatabase -> {
                trxJenisDatabaseRepo.deleteById(trxJenisDatabase.getId());
            });
        }

//        setListBahasaPemrogramanDanDatabase(aplikasiDTO, tbAplikasi);
        tbAplikasi.setStack(Arrays.toString(aplikasiDTO.getListStack()));
        modelMapper.map(aplikasiDTO, tbAplikasi);
        tbAplikasiRepo.save(tbAplikasi);

        return new MessageResponse(1, "Project berhasil diupdate", tbAplikasi);
    }

    private void setListBahasaPemrogramanDanDatabase(AplikasiDTO aplikasiDTO, TbAplikasi tbAplikasi) {
        Arrays.stream(aplikasiDTO.getListBahasaPemrograman()).collect(Collectors.toList()).forEach(bahasaPemrograman -> {
            TrxBahasaPemrograman trxBahasaPemrograman = new TrxBahasaPemrograman();
            trxBahasaPemrograman.setIdAplikasi(tbAplikasi.getId());
            trxBahasaPemrograman.setIdBahasaPemrograman(bahasaPemrograman);
            trxBahasaPemrogramanRepo.save(trxBahasaPemrograman);
        });

        Arrays.stream(aplikasiDTO.getListJenisDatabase()).collect(Collectors.toList()).forEach(jenisDatabase -> {
            TrxJenisDatabase trxJenisDatabase = new TrxJenisDatabase();
            trxJenisDatabase.setIdAplikasi(tbAplikasi.getId());
            trxJenisDatabase.setIdDatabase(jenisDatabase);
            trxJenisDatabaseRepo.save(trxJenisDatabase);
        });
    }

    @Override
    public MessageResponse deleteProject(int id) {
        if (tbAplikasiRepo.existsById(id)) {
            tbAplikasiRepo.deleteById(id);
            return new MessageResponse(1, "Project berhasil dihapus", null);
        } else {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }
    }

    @Override
    public MessageResponse ajukanProject(int id) {
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        if (tbAplikasi.getProses() > 0) {
            return new MessageResponse(0, "Project sudah diajukan", null);
        }

        tbAplikasi.setProses(1);
        tbAplikasiRepo.save(tbAplikasi);
        return new MessageResponse(1, "Project berhasil diajukan pengembangan", tbAplikasi);
    }

    @Override
    public MessageResponse ajukanDeployment(int id) {
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        if (tbAplikasi.getProses() == 4) {
            return new MessageResponse(0, "Project sudah di deploy", null);
        }

        tbAplikasi.setProses(4);
        tbAplikasiRepo.save(tbAplikasi);

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        //update jumlah pengalaman project
        TbKriteriaPegawai tbKriteriaPegawai = tbKriteriaPegawaiRepo.findByIdPegawai(userDetails.getPegawai().getId()).orElse(null);
        if (tbKriteriaPegawai != null) {
            tbKriteriaPegawai.setJumlahPengalaman(tbKriteriaPegawai.getJumlahPengalaman() + 1);
            tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);
        }
        TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = tbKriteriaPegawaiMatrixRepo.findByIdPegawai(userDetails.getPegawai().getId()).orElse(null);
        if (tbKriteriaPegawaiMatrix != null) {
            //C3
            if (tbKriteriaPegawai.getJumlahPengalaman() <= 1) {
                tbKriteriaPegawaiMatrix.setPengalaman(1);
            } else if (tbKriteriaPegawai.getJumlahPengalaman() == 2) {
                tbKriteriaPegawaiMatrix.setPengalaman(2);
            } else if (tbKriteriaPegawai.getJumlahPengalaman() == 3) {
                tbKriteriaPegawaiMatrix.setPengalaman(3);
            } else if (tbKriteriaPegawai.getJumlahPengalaman() == 4) {
                tbKriteriaPegawaiMatrix.setPengalaman(4);
            } else {
                tbKriteriaPegawaiMatrix.setPengalaman(5);
            }
            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);

        }


        return new MessageResponse(1, "Project berhasil diajukan deployment", tbAplikasi);
    }

    @Override
    public MessageResponse perhitunganSaw(int id) {
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }
        List<TbKriteriaPegawaiMatrix> tbKriteriaPegawaiMatrixList = tbKriteriaPegawaiMatrixRepo.findAll();

        tbKriteriaPegawaiMatrixList.forEach(tbKriteriaPegawaiMatrix -> {
            TbKriteriaPegawai tbKriteriaPegawai = tbKriteriaPegawaiRepo.findByIdPegawai(tbKriteriaPegawaiMatrix.getIdPegawai()).orElse(null);
            String[] arrayStackAplikasi = tbAplikasi.getStack().replace("[", "").replace("]", "").split(",");
            String[] arrayStackPegawai = new String[0];
            if (tbKriteriaPegawai != null) {
                arrayStackPegawai = tbKriteriaPegawai.getPenguasaanStack().replace("[", "").replace("]", "").split(",");
            }

            ArrayList<String> listStackPegawai = new ArrayList<>(Arrays.asList(arrayStackPegawai));
            ArrayList<String> listStackAplikasi = new ArrayList<>(Arrays.asList(arrayStackAplikasi));


            listStackPegawai.retainAll(listStackAplikasi);

            //C5
            if (listStackPegawai.size() <= 1) {
                tbKriteriaPegawaiMatrix.setStack(1);
            } else if (listStackPegawai.size() == 2) {
                tbKriteriaPegawaiMatrix.setStack(2);
            } else if (listStackPegawai.size() == 3) {
                tbKriteriaPegawaiMatrix.setStack(3);
            } else if (listStackPegawai.size() == 4) {
                tbKriteriaPegawaiMatrix.setStack(4);
            } else if (listStackPegawai.size() > 4) {
                tbKriteriaPegawaiMatrix.setStack(5);
            } else {
                throw new RuntimeException("Error set C5");
            }
            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);
        });
        return SAWUtil.metodeSAW(tbKriteriaPegawaiMatrixList);
    }

    @Override
    public MessageResponse generateTimProject(List<Integer> idPegawais, int idAplikasi) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();

        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(idAplikasi).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        tbAplikasi.setProses(2);
        tbAplikasi.setIdApproval(userDetails.getPegawai().getId());
        tbAplikasiRepo.save(tbAplikasi);

        idPegawais.forEach(idPegawai -> {
            TbTim tbTim = new TbTim();
            tbTim.setIdAplikasi(idAplikasi);
            tbTim.setIdPegawai(idPegawai);
            tbTim.setRoleProject("Programmer");
            tbTimRepo.save(tbTim);

            //update jumlah project ongoing
            TbKriteriaPegawai tbKriteriaPegawai = tbKriteriaPegawaiRepo.findByIdPegawai(idPegawai).orElse(null);
            if (tbKriteriaPegawai != null) {
                tbKriteriaPegawai.setJumlahProjectOngoing(tbKriteriaPegawai.getJumlahProjectOngoing() + 1);
                tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);
            }

            TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = tbKriteriaPegawaiMatrixRepo.findByIdPegawai(idPegawai).orElse(null);
            if (tbKriteriaPegawaiMatrix != null) {
                //C2
                switch (tbKriteriaPegawai.getJumlahProjectOngoing()) {
                    case 0:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(1);
                        break;
                    case 1:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(2);
                        break;
                    case 2:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(3);
                        break;
                    case 3:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(4);
                        break;
                    default:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(5);
                        break;
                }
            }


        });


        return new MessageResponse(1, "Tim project berhasil dibuat", null);
    }

    @Override
    public byte[] generateSKep(int id) throws Exception {
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);

        String[] arrayStackAplikasi = tbAplikasi.getStack().trim().replace("[", "").replace("]", "").split(",");

        int[] intArrayStackAplikasi = Arrays.stream(arrayStackAplikasi).map(String::trim).mapToInt(Integer::parseInt).toArray();


        SKepDTO skepDTO = new SKepDTO();
        skepDTO.setAnalis(tbAplikasi.getTbPegawaiAnalis().getNama());

        switch (tbAplikasi.getJenis()) {
            case 1:
                skepDTO.setJenis("Services API");
                break;
            case 2:
                skepDTO.setJenis("Mobile");
                break;
            case 3:
                skepDTO.setJenis("Web");
                break;
            case 4:
                skepDTO.setJenis("Desktop");
                break;
            default:
                skepDTO.setJenis("Unknown");
                break;
        }
        skepDTO.setNoNd(tbAplikasi.getNdRequest());
        skepDTO.setTanggalNd(tbAplikasi.getTglNd().toString());
        skepDTO.setNamaAplikasi(tbAplikasi.getNama());
        skepDTO.setKepalaSeksi(tbAplikasi.getTbPegawaiApproval().getNama());

        List<String> bahasa = new ArrayList<>();
        List<String> database = new ArrayList<>();
        List<String> programmer = new ArrayList<>();

        for (int i = 0; i < intArrayStackAplikasi.length; i++) {
            RefStack refStack = refStackRepo.findById(intArrayStackAplikasi[i]).orElseThrow(() -> new RuntimeException("Stack not found"));

            if (refStack.getJenis() == 1) {
                bahasa.add(refStack.getNama());
            } else if (refStack.getJenis() == 2) {
                database.add(refStack.getNama());
            }
        }

        tbAplikasi.getTim().forEach(tbTim -> {
            if (tbTim.getRoleProject().equals("Programmer")) {
                programmer.add(tbTim.getTbPegawai().getNama());
            }
        });

        String resultBahasa = String.join(", ", bahasa);
        String resultDatabase = String.join(", ", database);
        String resultProgrammer = String.join(", ", programmer);
        skepDTO.setBahasa(resultBahasa);
        skepDTO.setDatabase(resultDatabase);
        skepDTO.setProgrammer(resultProgrammer);
        skepDTO.setNamaSeksi(tbAplikasi.getTbPegawaiApproval().getUnit());

        return reportUtil.generateSKep(skepDTO);
    }

    @Override
    public byte[] generateReport(LocalDate tglAwal, LocalDate tglAkhir) throws Exception {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        List<ReportDTO> reportDTOList = new ArrayList<>();
        if (userDetails.getUser().getRefRole().getNamaRole().equals("ROLE_PROGRAMMER")) {
            System.out.println("cek");
            List<TbTim> tbTimList = tbTimRepo.findAllByIdPegawai(userDetails.getPegawai().getId());

            List<TbAplikasi> tbAplikasiList = new ArrayList<>();

            if (!tbTimList.isEmpty()) {
                tbTimList.forEach(tbTim -> {
                    tbAplikasiList.add(tbTim.getTbAplikasi());
                });
            }

            for (TbAplikasi tbAplikasi : tbAplikasiList) {
                if (tbAplikasi.getCreatedAt().isAfter(tglAwal) && tbAplikasi.getCreatedAt().isBefore(tglAkhir)) {
                    ReportDTO reportDTO = new ReportDTO();
                    reportDTO.setNamaAplikasi(tbAplikasi.getNama());
                    reportDTO.setNoNd(tbAplikasi.getNdRequest());
                    reportDTO.setTanggalRequest(tbAplikasi.getCreatedAt().toString());
                    switch (tbAplikasi.getProses()) {
                        case 0:
                            reportDTO.setProses("Draft");
                            break;
                        case 1:
                            reportDTO.setProses("Pembentukan Tim");
                            break;
                        case 2:
                            reportDTO.setProses("Pengembangan");
                            break;
                        case 3:
                            reportDTO.setProses("Testing");
                            break;
                        case 4:
                            reportDTO.setProses("Deploy");
                            break;
                        default:
                            reportDTO.setProses("Unknown");
                            break;
                    }
                    reportDTOList.add(reportDTO);
                }
            }
            return reportUtil.generateReport(reportDTOList, tglAwal, tglAkhir);

        } else {

            List<TbAplikasi> tbAplikasiList = tbAplikasiRepo.findAll();
            for (TbAplikasi tbAplikasi : tbAplikasiList) {
                if (tbAplikasi.getCreatedAt().isAfter(tglAwal) && tbAplikasi.getCreatedAt().isBefore(tglAkhir)) {
                    ReportDTO reportDTO = new ReportDTO();
                    reportDTO.setNamaAplikasi(tbAplikasi.getNama());
                    reportDTO.setNoNd(tbAplikasi.getNdRequest());
                    reportDTO.setTanggalRequest(tbAplikasi.getCreatedAt().toString());
                    switch (tbAplikasi.getProses()) {
                        case 0:
                            reportDTO.setProses("Draft");
                            break;
                        case 1:
                            reportDTO.setProses("Pembentukan Tim");
                            break;
                        case 2:
                            reportDTO.setProses("Pengembangan");
                            break;
                        case 3:
                            reportDTO.setProses("Testing");
                            break;
                        case 4:
                            reportDTO.setProses("Deploy");
                            break;
                        default:
                            reportDTO.setProses("Unknown");
                            break;
                    }
                    reportDTOList.add(reportDTO);
                }
            }
            return reportUtil.generateReport(reportDTOList, tglAwal, tglAkhir);
        }
    }

    @Override
    public byte[] generateReportPegawai(int id) throws Exception {
        MessageResponse messageResponse = perhitunganSaw(id);
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);
        if (messageResponse.getStatus() == 0) {
            throw new RuntimeException("Error generate report pegawai");
        }
        List<TbPerangkinganDTO> tbPerangkinganDTOList = (List<TbPerangkinganDTO>) messageResponse.getData();
        return reportUtil.generateReportPegawai(tbPerangkinganDTOList,tbAplikasi.getNama());
    }

}
