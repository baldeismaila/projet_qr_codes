package com.project.generateQrCode.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class QrCodeGenerator {

    public  static String generateQrCode(int i,int width, int height) throws WriterException, IOException {
        String qrCodePath = "C:\\Users\\Etu\\Documents\\projet\\qrcode_zip\\qrCodes\\";
        String qrCodeName = qrCodePath+ i + "_" + UUID.randomUUID() +"-QRCODE.png";

        File directory = new File(qrCodePath);
        if (!directory.exists()) directory.mkdir();

        var qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode (
                "ID: "+ i , BarcodeFormat.QR_CODE,width,height);
        Path path = FileSystems.getDefault().getPath(qrCodeName);
        MatrixToImageWriter.writeToPath(bitMatrix,"PNG",path);

        String[] qrName = qrCodeName.split("\\\\");
        return qrName[qrName.length - 1];
    }



    public static String generateZipQrCodeData(int size, int width, int height) throws WriterException, IOException {
        List<String> srcFiles = new ArrayList<>();

        for (int i=1; i <= size; i++){
            String qr = generateQrCode(i,width,height);
            srcFiles.add(qr);
        }
        String srcZip = Paths.get(srcFiles.get(0)).getParent().toAbsolutePath() + "/compressed.zip";
        FileOutputStream fos = new FileOutputStream(srcZip);
        ZipOutputStream zipOut = new ZipOutputStream(fos);

        for (String srcFile : srcFiles) {
            File fileToZip = new File(srcFile);
            FileInputStream fis = new FileInputStream(fileToZip);
            ZipEntry zipEntry = new ZipEntry(fileToZip.getName());
            zipOut.putNextEntry(zipEntry);

            byte[] bytes = new byte[1024];
            int length;
            while((length = fis.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, length);
            }
            fis.close();
        }

        zipOut.close();
        fos.close();

        /*for (String srcFile : srcFiles){
            Path fileToDeletePath = Paths.get(srcFile);
            Files.delete(fileToDeletePath);
        }*/

        Path fileZip = Paths.get(srcFiles.get(0)).getParent().toAbsolutePath();

        return fileZip.toString();
    }

    /*
    public  static void generateQrCode(User user) throws WriterException, IOException {
        String qrCodePath = "C:\\Users\\Etu\\Documents\\projet\\qrcode_zip\\";
        String qrCodeName = qrCodePath+user.getFirstname()+user.getId()+"-QRCODE.png";

        var qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode (
                "ID: "+user.getId()+ "\n"+
                        "Firstname: "+user.getFirstname()+ "\n"+
                        "Lastname: "+user.getLastname()+ "\n"+
                        "Email: "+user.getEmail()+ "\n"+
                        "Firstname: "+user.getFirstname(), BarcodeFormat.QR_CODE,400,400);
        Path path = FileSystems.getDefault().getPath(qrCodeName);
        MatrixToImageWriter.writeToPath(bitMatrix,"PNG",path);
    }
    */

}
