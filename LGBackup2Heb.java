package edu;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class LGBackup2Heb {

    public static void main(String[] args) throws Exception {
        int lineNo = 0;
        int smsNo = 0;
        String lineToTrans = "";
        try (BufferedReader br = new BufferedReader(new FileReader(new File("message_DB.html")))) {
            String line;
            boolean parse = false;
            while ((line = br.readLine()) != null) {
                ++lineNo;
                if (line.startsWith("TEL:")) {
                    System.out.println();
                    System.out.println("SMS:" + ++smsNo);
                    System.out.println(line);
                }
                if (line.startsWith("Date:"))
                    System.out.println(line);
                if (line.startsWith("Subject;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:")) {
                    lineToTrans += removeBadChars(line.substring("Subject;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:".length()));
                    parse = true;
                } else if (line.startsWith("Subject:")) {
                    System.out.println(line.substring("Subject:".length()));
                } else if (parse) {
                    lineToTrans += removeBadChars(line);
                }
                if (line.startsWith("END:VBODY") && parse) {
                    parse = false;
                    lineToTrans = lineToTrans.substring(0, lineToTrans.length() - "END:VBODY".length());
                    lineToTrans = lineToTrans.replace("=", "").replace("\n", "");
                    for (int i = 0; i < lineToTrans.length()-1; i += 2) {
                        String c;
                        if (lineToTrans.charAt(i) == 'D' && lineToTrans.charAt(i + 1) == '7') { // todo support also =F0
                            if (i+2 < lineToTrans.length()-1) {
                                c = new String(
                                        new byte[]{
                                                (byte) (fromHex(lineToTrans.charAt(i)) * 16 + fromHex(lineToTrans.charAt(i + 1))),
                                                (byte) (fromHex(lineToTrans.charAt(i + 2)) * 16 + fromHex(lineToTrans.charAt(i + 3)))
                                        });
                                i += 2;
                            }
                            else {
                                c = new String(
                                        new byte[]{
                                                (byte) (fromHex(lineToTrans.charAt(i)) * 16 + fromHex(lineToTrans.charAt(i + 1)))
                                        });
                            }
                        } else {
                            c = new String(
                                    new byte[]{
                                            (byte) (fromHex(lineToTrans.charAt(i)) * 16 + fromHex(lineToTrans.charAt(i + 1)))
                                    });
                        }
                        System.out.print(c);
                    }
                    lineToTrans = "";
                    System.out.println();
                }
            }
        }
    }

    public static String removeBadChars(String s) {
        String r = "";
        for (int i=0; i<s.length(); ++i) {
            char x = s.charAt(i);
            if (x >= '0' && x <= '9' || x >= 'A' && x <= 'F' || x == '=')
                r += x;
        }
        return r;
    }

    public static int fromHex(char c) {
        if (c >= '0' && c <= '9') return c - '0';
        return c - 'A' + 10;
    }
}
