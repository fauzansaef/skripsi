package com.skripsi.skripsi.utility;

import com.skripsi.skripsi.dto.SKepDTO;
import com.spire.doc.Document;
import com.spire.doc.FileFormat;
import com.spire.doc.ToPdfParameterList;
import org.docx4j.model.datastorage.migration.VariablePrepare;
import org.docx4j.model.fields.merge.DataFieldName;
import org.docx4j.model.fields.merge.MailMerger;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
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

}
