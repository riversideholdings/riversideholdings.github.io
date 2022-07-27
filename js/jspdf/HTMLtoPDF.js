var source = document.getElementById("element-Invoice");
//invoice variables
var invDate = "26 July 2022";
var invNumber = "RH02069";
var nameaToaddress = "Mila";
var Address = "772 anthurium road ramsgate Kwazulu-Natal 4285"; 

function printToPdf(){
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
    doc.text(138, 55, 'Date:');doc.setTextColor(0,0,0);doc.text(148, 55, invDate);

    doc.setTextColor(51,124,173);
    doc.text(130, 60, 'Invoice #:');doc.setTextColor(192,0,0);doc.text(148, 60, invNumber);

    //add a line
    doc.setDrawColor(51,124,173);
    doc.setLineWidth(1.0);
    doc.line(20, 63, 190, 63);


    //add text
    doc.setTextColor(51,124,173);
    doc.setFontType("Bold");
    doc.setFontSize(12);
    doc.text(141, 75, 'To:');doc.setTextColor(0,0,0);doc.text(148, 75, nameaToaddress);

    doc.setTextColor(51,124,173);
    doc.setFontType("Bold");
    doc.setFontSize(12);
    var splitaddress = doc.splitTextToSize(Address, 40);
    doc.text(132, 85, 'Address:');doc.setTextColor(0,0,0);doc.text(148, 85,splitaddress);

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
