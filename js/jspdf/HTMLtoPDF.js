
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

    //add text
    doc.setFont("");
    doc.setFontType("Bold");
    doc.setFontSize(28);
    doc.text(130, 30, 'Invoice');

    doc.setFontType("italic");
    doc.setTextColor(51,124,173);
    doc.setFontSize(11);
    doc.text(20, 40, 'Baneberry Balloon General Traders (pty) ltd trading as');

    doc.setFontType("Bold");
    doc.setFontSize(12);
    doc.text(20, 45, 'Riverside Holdings');

    doc.setFontType("italic");
    doc.setFontSize(11);
    doc.text(20, 55, 'Phone: +27 73 1040 341');
    doc.text(20, 60, 'Email: riversideholdings.za@gmail.com');

    doc.setFontType("Bold");
    doc.setFontSize(12);
    doc.text(130, 70, 'To:');

    doc.setFontType("Bold");
    doc.setFontSize(12);
    doc.text(130, 80, 'Address:');
 
    // Save the PDF
    doc.save('TestRH.pdf');
}

function methodanother(){
  const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const formData = new FormData()
formData.append('instructions', JSON.stringify({
  parts: [
    {
      html: "index.html",
      assets: [
        "style.css",
        "Inter-Regular.ttf",
        "Inter-Medium.ttf",
        "Inter-Bold.ttf",
        "SpaceMono-Regular.ttf",
        "logo.svg"
      ]
    }
  ]
}))
formData.append('index.html', fs.createReadStream('index.html'))
formData.append('style.css', fs.createReadStream('style.css'))
formData.append('Inter-Regular.ttf', fs.createReadStream('Inter-Regular.ttf'))
formData.append('Inter-Medium.ttf', fs.createReadStream('Inter-Medium.ttf'))
formData.append('Inter-Bold.ttf', fs.createReadStream('Inter-Bold.ttf'))
formData.append('SpaceMono-Regular.ttf', fs.createReadStream('SpaceMono-Regular.ttf'))
formData.append('logo.svg', fs.createReadStream('logo.svg'))

;(async () => {
  try {
    const response = await axios.post('https://api.pspdfkit.com/build', formData, {
      headers: formData.getHeaders({
          'Authorization': 'Bearer pdf_live_HmKND0yQTiiXOqFkisPgUYvAqmWI7MW1UfilNwbF52g'
      }),
      responseType: "stream"
    })

    response.data.pipe(fs.createWriteStream("result.pdf"))
  } catch (e) {
    const errorString = await streamToString(e.response.data)
    console.log(errorString)
  }
})()

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", (err) => reject(err))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}

}


function lastmethod(){
  var source = window.document.getElementById("element-Invoice")[0];

  var doc = new jsPDF({
    orientation: 'landscape'
  });
  doc.setFont("Century Gothic");
  doc.setFontType("normal");
  doc.setFontSize(18);
  doc.setTextColor(100);
  doc.fromHTML(elementHTML, 15, 15, {
    'width': 170,
    'elementHandlers': specialElementHandlers
  });
}