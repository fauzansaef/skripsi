package com.skripsi.skripsi.utility;

import com.skripsi.skripsi.auth.UserDetailsImpl;
import com.skripsi.skripsi.dto.ReportDTO;
import com.skripsi.skripsi.dto.SKepDTO;
import com.skripsi.skripsi.dto.TbPerangkinganDTO;
import com.spire.doc.Document;
import com.spire.doc.FileFormat;
import com.spire.doc.ToPdfParameterList;
import org.docx4j.model.datastorage.migration.VariablePrepare;
import org.docx4j.model.fields.merge.DataFieldName;
import org.docx4j.model.fields.merge.MailMerger;
import org.docx4j.model.table.TblFactory;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.wml.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.math.BigInteger;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.*;

import static org.docx4j.model.fields.merge.MailMerger.performMerge;
import static org.docx4j.model.fields.merge.MailMerger.setMERGEFIELDInOutput;

@Component
public class ReportUtil {

    @Value("${file.dir}")
    private String fileDir;

    public byte[] generateSKep(SKepDTO skepDTO) throws Exception {

        Path path = Paths.get(fileDir + "SKEP_TEMP.docx");
        InputStream fileStream = Files.newInputStream(new UrlResource(path.toUri()).getFile().toPath());
        Resource resource = new InputStreamResource(fileStream);

        LocalDate date = LocalDate.now(); // current date
        Locale locale = new Locale("id", "ID"); // Locale for Indonesian
        String monthName = date.getMonth().getDisplayName(TextStyle.FULL, locale);

        WordprocessingMLPackage template = WordprocessingMLPackage.load(resource.getInputStream());
        Map<DataFieldName, String> variables = new HashMap<>();
        variables.put(new DataFieldName("noNd"), skepDTO.getNoNd());
        variables.put(new DataFieldName("tanggalNd"), skepDTO.getTanggalNd());
        variables.put(new DataFieldName("namaAplikasi"), skepDTO.getNamaAplikasi());
        variables.put(new DataFieldName("tanggal"), String.valueOf(date.getDayOfMonth()));
        variables.put(new DataFieldName("bulan"), monthName);
        variables.put(new DataFieldName("tahun"), String.valueOf(date.getYear()));
        variables.put(new DataFieldName("bahasa"), skepDTO.getBahasa());
        variables.put(new DataFieldName("database"), skepDTO.getDatabase());
        variables.put(new DataFieldName("jenis"), skepDTO.getJenis());
        variables.put(new DataFieldName("analis"), skepDTO.getAnalis());
        variables.put(new DataFieldName("programmer"), skepDTO.getProgrammer());
        variables.put(new DataFieldName("kepalaSeksi"), skepDTO.getKepalaSeksi());
        variables.put(new DataFieldName("namaSeksi"), skepDTO.getNamaSeksi());


        setMERGEFIELDInOutput(MailMerger.OutputField.KEEP_MERGEFIELD);
        performMerge(template, variables, true);
        VariablePrepare.prepare(template);

        ByteArrayOutputStream outputStreamDocx4j = new ByteArrayOutputStream();
        template.save(outputStreamDocx4j);

        // Convert Word document to PDF
        InputStream inputStream = new ByteArrayInputStream(outputStreamDocx4j.toByteArray());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        document.loadFromStream(inputStream, FileFormat.Docx);
        ToPdfParameterList toPdfParameterList = new ToPdfParameterList();
        toPdfParameterList.isEmbeddedAllFonts();
        document.saveToFile(outputStream, FileFormat.PDF);

        return outputStream.toByteArray();
    }

    public byte[] generateReport(List<ReportDTO> reportDTOList, LocalDate tglAwal, LocalDate tglAkhir) throws Exception {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        Path path = Paths.get(fileDir + "REPORT_PROJECT.docx");
        InputStream fileStream = Files.newInputStream(new UrlResource(path.toUri()).getFile().toPath());
        Resource resource = new InputStreamResource(fileStream);

        LocalDate date = LocalDate.now(); // current date
        Locale locale = new Locale("id", "ID"); // Locale for Indonesian
        String monthName = date.getMonth().getDisplayName(TextStyle.FULL, locale);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        WordprocessingMLPackage templateDoc = WordprocessingMLPackage.load(resource.getInputStream());
        Map<DataFieldName, String> variables = new HashMap<>();
        variables.put(new DataFieldName("awal"), tglAwal.format(formatter));
        variables.put(new DataFieldName("akhir"), tglAkhir.format(formatter));
        variables.put(new DataFieldName("tanggal"), String.valueOf(date.getDayOfMonth()));
        variables.put(new DataFieldName("bulan"), monthName);
        variables.put(new DataFieldName("tahun"), String.valueOf(date.getYear()));
        variables.put(new DataFieldName("jabatan"), userDetails.getPegawai().getJabatan());
        variables.put(new DataFieldName("namaPegawai"),userDetails.getPegawai().getNama());


        // Create an instance of the ObjectFactory class
        ObjectFactory factory = new ObjectFactory();

        // Create a table
        int writableWidthTwips = 5000;
        int cols = 5;
        Tbl table = TblFactory.createTable(0, cols, writableWidthTwips / cols);

        // Create a new row for column names
        Tr headerRow = factory.createTr();

        // Create a new table cell properties object
        TcPr cellProperties = new TcPr();

        // Create a new table width object
        TblWidth cellWidth = new TblWidth();

        // Set the width type to auto
        cellWidth.setType("auto");

        // Set the width value to 0
        cellWidth.setW(BigInteger.valueOf(0));

        cellWidth.setType("pct");
        cellWidth.setW(BigInteger.valueOf(5000)); // 50%

        // Set the width of the cell properties
        cellProperties.setTcW(cellWidth);

        P paragraph = factory.createP();

        // Create a new paragraph properties object
        PPr paragraphProperties = factory.createPPr();

        // Create a new justification object
        Jc justification = new Jc();

        // Set the justification to CENTER
        justification.setVal(JcEnumeration.CENTER);

        // Set the justification of the paragraph properties
        paragraphProperties.setJc(justification);

        // Set the properties of the paragraph
        paragraph.setPPr(paragraphProperties);


        // Create three paragraph breaks
        P paragraphBreak1 = factory.createP();
        P paragraphBreak2 = factory.createP();

        // Add the paragraph breaks to the document
        templateDoc.getMainDocumentPart().addObject(paragraphBreak1);
        templateDoc.getMainDocumentPart().addObject(paragraphBreak2);


        // Add cells to the row for each column name
        Tc cell1 = factory.createTc();
        cell1.getContent().add(createParagraphWithText(factory, "No. "));
        cell1.setTcPr(cellProperties);
        cell1.getContent().add(paragraph);
        headerRow.getContent().add(cell1);

        Tc cell2 = factory.createTc();
        cell2.getContent().add(createParagraphWithText(factory, "Nama Aplikasi"));
        cell2.setTcPr(cellProperties);
        cell2.getContent().add(paragraph);
        headerRow.getContent().add(cell2);

        Tc cell3 = factory.createTc();
        cell3.getContent().add(createParagraphWithText(factory, "No ND"));
        cell3.setTcPr(cellProperties);
        cell3.getContent().add(paragraph);
        headerRow.getContent().add(cell3);

        Tc cell4 = factory.createTc();
        cell4.getContent().add(createParagraphWithText(factory, "Tanggal ND"));
        cell4.setTcPr(cellProperties);
        cell4.getContent().add(paragraph);
        headerRow.getContent().add(cell4);

        Tc cell5 = factory.createTc();
        cell5.getContent().add(createParagraphWithText(factory, "Proses"));
        cell5.setTcPr(cellProperties);
        cell5.getContent().add(paragraph);
        headerRow.getContent().add(cell5);
        table.getContent().add(headerRow);

        // Iterate over the ReportDTO list
        int i = 1;

        for (ReportDTO report : reportDTOList) {
            // Create a new row
            Tr row = factory.createTr();

            // Add cells to the row for each field in the ReportDTO
            Tc cel1 = factory.createTc();
            cel1.getContent().add(createParagraphWithText(factory, String.valueOf(i)));
            row.getContent().add(cel1);

            Tc cel2 = factory.createTc();
            cel2.getContent().add(createParagraphWithText(factory, report.getNamaAplikasi()));
            row.getContent().add(cel2);

            Tc cel3 = factory.createTc();
            cel3.getContent().add(createParagraphWithText(factory, report.getNoNd()));
            row.getContent().add(cel3);

            Tc cel4 = factory.createTc();
            cel4.getContent().add(createParagraphWithText(factory, report.getTanggalNd()));
            row.getContent().add(cel4);

            Tc cel5 = factory.createTc();
            cel5.getContent().add(createParagraphWithText(factory, report.getProses()));
            row.getContent().add(cel5);

            i++;
            table.getContent().add(row);
        }
        // Add the row to the table


        // Add the table to the document
        templateDoc.getMainDocumentPart().addObject(table);


        setMERGEFIELDInOutput(MailMerger.OutputField.KEEP_MERGEFIELD);
        performMerge(templateDoc, variables, true);
        VariablePrepare.prepare(templateDoc);

        ByteArrayOutputStream outputStreamDocx4j = new ByteArrayOutputStream();
        templateDoc.save(outputStreamDocx4j);

        // Convert Word document to PDF
        InputStream inputStream = new ByteArrayInputStream(outputStreamDocx4j.toByteArray());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        document.loadFromStream(inputStream, FileFormat.Docx);
        ToPdfParameterList toPdfParameterList = new ToPdfParameterList();
        toPdfParameterList.isEmbeddedAllFonts();
        document.saveToFile(outputStream, FileFormat.PDF);

        return outputStream.toByteArray();
    }

    public byte[] generateReportPegawai(List<TbPerangkinganDTO> tbPerangkinganDTOList, String namaAplikasi) throws Exception {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        Path path = Paths.get(fileDir + "REPORT_PROGRAMMER.docx");
        InputStream fileStream = Files.newInputStream(new UrlResource(path.toUri()).getFile().toPath());
        Resource resource = new InputStreamResource(fileStream);
        LocalDate date = LocalDate.now(); // current date
        Locale locale = new Locale("id", "ID"); // Locale for Indonesian
        String monthName = date.getMonth().getDisplayName(TextStyle.FULL, locale);

        WordprocessingMLPackage templateDoc = WordprocessingMLPackage.load(resource.getInputStream());
        Map<DataFieldName, String> variables = new HashMap<>();
        variables.put(new DataFieldName("namaAplikasi"), namaAplikasi);
        variables.put(new DataFieldName("tanggal"), String.valueOf(date.getDayOfMonth()));
        variables.put(new DataFieldName("bulan"), monthName);
        variables.put(new DataFieldName("tahun"), String.valueOf(date.getYear()));
        variables.put(new DataFieldName("namaPegawai"),userDetails.getPegawai().getNama());
        variables.put(new DataFieldName("jabatan"), userDetails.getPegawai().getJabatan());

        // Create an instance of the ObjectFactory class
        ObjectFactory factory = new ObjectFactory();

        // Create a table
        int writableWidthTwips = 5000;
        int cols = 5;
        Tbl table = TblFactory.createTable(0, cols, writableWidthTwips / cols);

        // Create a new row for column names
        Tr headerRow = factory.createTr();

        // Create a new table cell properties object
        TcPr cellProperties = new TcPr();

        // Create a new table width object
        TblWidth cellWidth = new TblWidth();

        // Set the width type to auto
        cellWidth.setType("auto");

        // Set the width value to 0
        cellWidth.setW(BigInteger.valueOf(0));

        cellWidth.setType("pct");
        cellWidth.setW(BigInteger.valueOf(5000)); // 50%

        // Set the width of the cell properties
        cellProperties.setTcW(cellWidth);

        P paragraph = factory.createP();

        // Create a new paragraph properties object
        PPr paragraphProperties = factory.createPPr();

        // Create a new justification object
        Jc justification = new Jc();

        // Set the justification to CENTER
        justification.setVal(JcEnumeration.CENTER);

        // Set the justification of the paragraph properties
        paragraphProperties.setJc(justification);

        // Set the properties of the paragraph
        paragraph.setPPr(paragraphProperties);


        // Create three paragraph breaks
        P paragraphBreak1 = factory.createP();

        // Add the paragraph breaks to the document
        templateDoc.getMainDocumentPart().addObject(paragraphBreak1);

        // Add cells to the row for each column name
        Tc cell1 = factory.createTc();
        cell1.getContent().add(createParagraphWithText(factory, "No. "));
        cell1.setTcPr(cellProperties);
        cell1.getContent().add(paragraph);
        headerRow.getContent().add(cell1);

        Tc cell2 = factory.createTc();
        cell2.getContent().add(createParagraphWithText(factory, "Nama"));
        cell2.setTcPr(cellProperties);
        cell2.getContent().add(paragraph);
        headerRow.getContent().add(cell2);

        Tc cell3 = factory.createTc();
        cell3.getContent().add(createParagraphWithText(factory, "NIP"));
        cell3.setTcPr(cellProperties);
        cell3.getContent().add(paragraph);
        headerRow.getContent().add(cell3);

        Tc cell4 = factory.createTc();
        cell4.getContent().add(createParagraphWithText(factory, "Jabatan"));
        cell4.setTcPr(cellProperties);
        cell4.getContent().add(paragraph);
        headerRow.getContent().add(cell4);

        Tc cell5 = factory.createTc();
        cell5.getContent().add(createParagraphWithText(factory, "Perhitungan SAW"));
        cell5.setTcPr(cellProperties);
        cell5.getContent().add(paragraph);
        headerRow.getContent().add(cell5);

        Tc cell6 = factory.createTc();
        cell6.getContent().add(createParagraphWithText(factory, "Rekomendasi"));
        cell6.setTcPr(cellProperties);
        cell6.getContent().add(paragraph);
        headerRow.getContent().add(cell6);

        table.getContent().add(headerRow);

        // Iterate over the ReportDTO list
        int i = 1;

        for (TbPerangkinganDTO report : tbPerangkinganDTOList) {
            // Create a new row
            Tr row = factory.createTr();

            // Add cells to the row for each field in the ReportDTO
            Tc cel1 = factory.createTc();
            cel1.getContent().add(createParagraphWithText(factory, String.valueOf(i)));
            row.getContent().add(cel1);

            Tc cel2 = factory.createTc();
            cel2.getContent().add(createParagraphWithText(factory, report.getTbPegawai().getNama()));
            row.getContent().add(cel2);

            Tc cel3 = factory.createTc();
            cel3.getContent().add(createParagraphWithText(factory, report.getTbPegawai().getNip()));
            row.getContent().add(cel3);

            Tc cel4 = factory.createTc();
            cel4.getContent().add(createParagraphWithText(factory, report.getTbPegawai().getJabatan()));
            row.getContent().add(cel4);

            Tc cel5 = factory.createTc();
            cel5.getContent().add(createParagraphWithText(factory, String.valueOf(report.getPerhitunganAlternatif())));
            row.getContent().add(cel5);

            double data = report.getPerhitunganAlternatif();

            Tc cel6 = factory.createTc();
            if (data > 0.7) {
                cel6.getContent().add(createParagraphWithText(factory, "Sangat Sesuai"));
            } else if (data > 0.5 && data <= 0.7) {
                cel6.getContent().add(createParagraphWithText(factory, "Sesuai"));
            } else if (data > 0.3 && data <= 0.5) {
                cel6.getContent().add(createParagraphWithText(factory, "Kurang Sesuai"));
            } else if (data <= 0.3) {
                cel6.getContent().add(createParagraphWithText(factory,"Tidak Sesuai"));
            } else {
                cel6.getContent().add(createParagraphWithText(factory, "Error"));
            }
            row.getContent().add(cel6);

            i++;
            table.getContent().add(row);
        }
        // Add the row to the table


        // Add the table to the document
        templateDoc.getMainDocumentPart().addObject(table);


        setMERGEFIELDInOutput(MailMerger.OutputField.KEEP_MERGEFIELD);
        performMerge(templateDoc, variables, true);
        VariablePrepare.prepare(templateDoc);

        ByteArrayOutputStream outputStreamDocx4j = new ByteArrayOutputStream();
        templateDoc.save(outputStreamDocx4j);

        // Convert Word document to PDF
        InputStream inputStream = new ByteArrayInputStream(outputStreamDocx4j.toByteArray());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        document.loadFromStream(inputStream, FileFormat.Docx);
        ToPdfParameterList toPdfParameterList = new ToPdfParameterList();
        toPdfParameterList.isEmbeddedAllFonts();
        document.saveToFile(outputStream, FileFormat.PDF);

        return outputStream.toByteArray();
    }


    // Helper method to create a paragraph with a text
    private static P createParagraphWithText(ObjectFactory factory, String text) {
        Text t = factory.createText();
        t.setValue(text);
        R run = factory.createR();
        run.getContent().add(t);
        P paragraph = factory.createP();
        paragraph.getContent().add(run);
        return paragraph;
    }

}
