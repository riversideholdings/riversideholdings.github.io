var source = document.getElementById("element-Invoice");


function printToPdf(){
var elementHTML = document.getElementById('element-Invoice');

  html2canvas(elementHTML, {
    useCORS: true,
    onrendered: function(canvas) {
      var pdf = new jsPDF('p', 'pt', 'A4');

      var pageHeight = 980;
      var pageWidth = 900;
      for (var i = 0; i <= elementHTML.clientHeight / pageHeight; i++) {
        var srcImg = canvas;
        var sX = 0;
        var sY = pageHeight * i; // start 1 pageHeight down for every new page
        var sWidth = pageWidth;
        var sHeight = pageHeight;
        var dX = 0;
        var dY = 0;
        var dWidth = pageWidth;
        var dHeight = pageHeight;

        window.onePageCanvas = document.createElement("canvas");
        onePageCanvas.setAttribute('width', pageWidth);
        onePageCanvas.setAttribute('height', pageHeight);
        var ctx = onePageCanvas.getContext('2d');
        ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

        var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
        var width = onePageCanvas.width;
        var height = onePageCanvas.clientHeight;

        if (i > 0) // if we're on anything other than the first page, add another page
        pdf.addPage(612, 864); // 8.5" x 12" in pts (inches*72)

        pdf.setPage(i + 1); // now we declare that we're working on that page
        pdf.addImage(canvasDataURL, 'PNG', 30, 50, (width * .62), (height * .62)); // add content to the page
      }
      
    // Save the PDF
      pdf.save('RHTEST.pdf');
    }
  });
}

function emailHtml() {
   var doc = new jsPDF();
   var fontsAv = doc.getFontList();

   console.log(fontsAv);

    //draw back rectangel for invoice block
    doc.setDrawColor(15, 85, 108);
    doc.setLineWidth(60.0);
    doc.line(160, 10, 160, 34);    // filled square 

    //add text
    doc.setFont("Helvetica");
    //doc.setFont('Century Gothic', 'normal');
    doc.setFontType("Bold");
    doc.setTextColor(255,255,255);
    doc.setFontSize(28);
    doc.text(145, 25, 'Invoice');
  
    //add a line 
    doc.setDrawColor(15, 85, 108);
    doc.setLineWidth(1.0);
    doc.line(20, 34, 190, 34);

    doc.setFontType("italic");
    doc.setTextColor(51,124,173);
    doc.setFontSize(12);
    doc.text(20, 40, 'Baneberry Balloon General Traders (pty) ltd trading as');

    doc.setFontType("Bold");
    doc.setFontSize(14);
    doc.text(20, 45, 'Riverside Holdings');

    doc.setFontType("italic");
    doc.setFontSize(12);
    doc.text(20, 55, 'Phone: +27 73 1040 341');
    doc.text(20, 60, 'Email: riversideholdings.za@gmail.com');

    //add text
    doc.setFontType("Bold");
    doc.setFontSize(12);
    doc.text(138, 55, 'Date:');
    doc.text(130, 60, 'Invoice #:');

    //add a line
    doc.setDrawColor(51,124,173);
    doc.setLineWidth(1.0);
    doc.line(20, 63, 190, 63);

    //add text
    doc.setFontType("Bold");
    doc.setFontSize(12);
    doc.text(141, 75, 'To:');

    doc.setFontType("Bold");
    doc.setFontSize(12);
    doc.text(132, 85, 'Address:');

    //lines to form my table
    //add a line 
    doc.setDrawColor(15, 85, 108);
    doc.setLineWidth(5.0);
    doc.line(20, 112, 190, 112);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(150, 192, 150, 112);
    //add a line 
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.0);
    doc.line(20, 172, 190, 172);
    //add a line 
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.0);
    doc.line(20, 187, 190, 187);
     //add a line 
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(20, 192, 190, 192);
   
    //Add banking details
    //add text
    doc.setTextColor(0,0,0);
    doc.setFontType("Bold");
    doc.setFontSize(14);
    doc.text(20, 212, ' Banking Details:');
    doc.text(70, 212, 'First National Bank (FNB)');
    doc.text(80, 245, 'Thank you for your business.');

    doc.setFontSize(12);
    doc.setFontType("italic");
    doc.text(20, 220, ' Account Number:');
    doc.text(70, 220, '62794424615:');
    doc.text(20, 225, ' Account Holder:');
    doc.text(70, 225, 'Nwabisa Gxumisa:');
    doc.text(20, 230, ' Brach Code:')
    doc.text(70, 230, '250655:')

     //add a line 
    doc.setDrawColor(15, 85, 108);
    doc.setLineWidth(1.0);
    doc.line(20, 250, 190, 250);


 
    // Save the PDF
    doc.save('TestRH.pdf');
}
