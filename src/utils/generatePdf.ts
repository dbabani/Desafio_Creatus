import { User } from "@prisma/client";
import PDFDocument from "pdfkit";
import fs from "fs";

export function generatePdf(users: User[]): Buffer {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];  

  doc.fontSize(12);
  doc.text("Users Report", { align: "center" });
  doc.moveDown();

  users.forEach((user, index) => {
    doc.text(`${index + 1}. ID: ${user.id}`);
    doc.text(`   Name: ${user.name}`);
    doc.text(`   Email: ${user.email}`);
    doc.text(`   Password: ${user.password}`);
    doc.text(`   Level: ${user.level}`);
    doc.moveDown();
  });

  doc.on('data', buffers.push.bind(buffers));  

  doc.on('end', () => {
    const buffer = Buffer.concat(buffers);  
    fs.writeFileSync("output.pdf", buffer);  
  });

  doc.end();  

  return Buffer.concat(buffers); 
}
