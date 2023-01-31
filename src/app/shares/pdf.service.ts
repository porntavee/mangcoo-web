import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
@Injectable({
    providedIn: 'root'
})
export class PdfService {
    constructor() { }
    public generatePdf(data, name, type = "") {
        html2canvas(data, { allowTaint: true }).then(canvas => {
            let HTML_Width = 210;
            let HTML_Height = canvas.height * HTML_Width / canvas.width;// canvas.height;
            let top_left_margin = 1.5;
            let PDF_Width = HTML_Width;// + (top_left_margin * 2);
            let PDF_Height = 297//(PDF_Width * 1.5);// + (top_left_margin * 2);
            let canvas_image_width = HTML_Width;
            let canvas_image_height = HTML_Height;
            let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
            canvas.getContext('2d');
            let imgData = canvas.toDataURL("image/jpeg", 1.0);
            let pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, canvas_image_width, canvas_image_height);
            for (let i = 1; i <= totalPDFPages; i++) {
                pdf.addPage('a4', 'p');
                pdf.addImage(imgData, 'PNG', 0, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
            }
            if (type == "") {
                pdf.save(name + ".pdf");
                pdf.output('dataurlnewwindow');
            }
            else if (type.toLowerCase() == "open")
                pdf.output('dataurlnewwindow');
            else if (type.toLowerCase() == "download")
                pdf.save(name + ".pdf");
        });
    }

}