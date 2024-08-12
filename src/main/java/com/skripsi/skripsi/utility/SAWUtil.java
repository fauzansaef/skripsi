package com.skripsi.skripsi.utility;

import com.skripsi.skripsi.entity.TbKriteriaPegawaiMatrix;
import com.skripsi.skripsi.entity.TbPembobotan;
import com.skripsi.skripsi.dto.TbPerangkinganDTO;
import com.skripsi.skripsi.repository.TbPembobotanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class SAWUtil {
    private final TbPembobotanRepo tbPembobotanRepo;

    @Autowired
    public SAWUtil(TbPembobotanRepo tbPembobotanRepo) {
        this.tbPembobotanRepo = tbPembobotanRepo;
    }


    public MessageResponse metodeSAW(List<TbKriteriaPegawaiMatrix> tbKriteriaPegawaiMatrixList) {

        List<TbPembobotan> tbPembobotanList = tbPembobotanRepo.findAll();
        List<TbPerangkinganDTO> tbPerangkinganDTOList = new ArrayList<>();

        // Mengambil nilai bobot dari tbPembobotan = W
        double[] W = new double[tbPembobotanList.size()];
        int[] idPegawai = new int[tbKriteriaPegawaiMatrixList.size()];
        for (int i = 0; i < tbPembobotanList.size(); i++) {
            W[i] = tbPembobotanList.get(i).getBobot();
        }


        //mapping data kriteria pegawai matrix ke array 2D
        double[][] X = new double[tbKriteriaPegawaiMatrixList.size()][tbPembobotanList.size()];
        for (int i = 0; i < tbKriteriaPegawaiMatrixList.size(); i++) {
            idPegawai[i] = tbKriteriaPegawaiMatrixList.get(i).getIdPegawai();

            for (int j = 0; j < tbPembobotanList.size(); j++) {
                if (j == 0) {
                    X[i][j] = tbKriteriaPegawaiMatrixList.get(i).getKemampuanCoding(); // c1=benefit
                } else if (j == 1) {
                    X[i][j] = tbKriteriaPegawaiMatrixList.get(i).getProjectOngoing(); // c2=cost
                } else if (j == 2) {
                    X[i][j] = tbKriteriaPegawaiMatrixList.get(i).getPengalaman(); // c3=benefit
                } else if (j == 3) {
                    X[i][j] = tbKriteriaPegawaiMatrixList.get(i).getPelatihan();  // c4=benefit
                } else if (j == 4) {
                    X[i][j] = tbKriteriaPegawaiMatrixList.get(i).getStack();      // c5=benefit
                }

            }
        }


        //matrix normalisasi = R
        double[][] R = new double[X.length][X[0].length];
        for (int j = 0; j < X[0].length; j++) {
            double max = X[0][j];
            double min = X[0][1];
            for (int i = 1; i < X.length; i++) {
                if (X[i][j] > max) {
                    max = X[i][j];
                }
                if (X[i][1] < min) {
                    min = X[i][1];
                }
            }
            for (int i = 0; i < X.length; i++) {
                if (j == 1) {
                    R[i][j] = min / X[i][j];
                } else {
                    R[i][j] = X[i][j] / max;
                }
            }
        }

        //hitung nilai V = R * W (nila preferensi tiap alternatif)
        double[] V = new double[R.length];
        for (int i = 0; i < R.length; i++) {
            for (int j = 0; j < R[i].length; j++) {
                V[i] += R[i][j] * W[j];
            }

            TbPerangkinganDTO tbPerangkinganDTO = new TbPerangkinganDTO();
            tbPerangkinganDTO.setIdPegawai(idPegawai[i]);
            tbPerangkinganDTO.setPerhitunganAlternatif(V[i]);
            tbPerangkinganDTO.setTanggalPerangkingan(LocalDate.now());
            tbPerangkinganDTO.setTbPegawai(tbKriteriaPegawaiMatrixList.get(i).getTbPegawai());
            tbPerangkinganDTOList.add(tbPerangkinganDTO);
        }

        return new MessageResponse(1, "Perhitungan SAW Berhasil", tbPerangkinganDTOList);

    }


}
