//https://docs.google.com/spreadsheets/d/1B72XHR8ff7JqN9Pj52RBjFFPUt5dmtrTJOaT2dUAeXk/edit?usp=sharing

//==============get invoices=================================//
//google spreedsheet data
//1B72XHR8ff7JqN9Pj52RBjFFPUt5dmtrTJOaT2dUAeXk
const sheetId = '1B72XHR8ff7JqN9Pj52RBjFFPUt5dmtrTJOaT2dUAeXk';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Invoice - records';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`

//DOM function lisatener
const data = []
document.addEventListener('DOMContentLoaded', fetchlastInvNum,shownewInvNum)
 
/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
//fetch las invoice number
function fetchlastInvNum(){
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        //Remove additional text and extract only JSON:
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        //rows of the data retrieved
        const invoiceArr = jsonData.table.rows;
        //=============LOG TO CONSOLE========================//
        //console.log(jsonData);
        //console.log(invoiceArr);

        shownewInvNum();

      })


  }
  
  function shownewInvNum(){
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        //Remove additional text and extract only JSON:
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        //rows of the data retrieved
        const invoiceArr = jsonData.table.rows;
        //=============LOG TO CONSOLE========================//
        //console.log(jsonData);
        //console.log(invoiceArr);

        let Arr = [];
  
        for (let i = 0; i < invoiceArr.length; i++) {
      
          var invNumber = invoiceArr[i].c[0].v;
          var invDate = invoiceArr[i].c[1].v;
          var Recipient = invoiceArr[i].c[2].v;
          var RecipientAddress = invoiceArr[i].c[3].v;	
          var Pricesused = invoiceArr[i].c[4].v;	
          var ml330 = invoiceArr[i].c[5].v;	
          var ml500 = invoiceArr[i].c[6].v;	
          var ml750 = invoiceArr[i].c[7].v;	
          var lt1	 = invoiceArr[i].c[8].v;
          var lt5 = invoiceArr[i].c[9].v;	
          var DiscountNotes = invoiceArr[i].c[10].v;	 
          var invoiceTotal = invoiceArr[i].c[11].v;	
          var invstatus = invoiceArr[i].c[12].v;

        //contruction a proper structured array of the data
        Arr.push({
            "invNumber": invNumber, 
            "invDate": invDate,
            "RecipientName": Recipient,
            "RecipientAddress": RecipientAddress,
            "Pricesused": Pricesused,	
            "milLitres330": ml330,
            "milLitres500": ml500,
            "mlLitres750": ml750,
            "litres1": lt1,
            "litres5": lt5,
            "DiscountNotes": DiscountNotes, 
            "invTotal": invoiceTotal,
            "invStatus": invstatus,
          });

        }
        
        //console.log(Arr);

        let arrayLegnth = Arr.length;
        //console.log(arrayLegnth-1 );
  
        let lastElement = arrayLegnth - 1;
        //console.log(Arr[lastElement]); 

        var e = Arr[lastElement].invNumber;
        var f = parseFloat(e.replace(/\D/g, ''))+1;
        var newInvoicNum = "RH0" + f;
        //console.log(newInvoicNum);

        document.getElementById("order-num-new").innerHTML = newInvoicNum;

        var ordernuminput = document.getElementById("Invoice_num");
        ordernuminput.value = document.getElementById("order-num-new").innerHTML;

     
        var counterinv = document.getElementById("completedorderCount");
        counterinv.innerHTML = "Total Invoices on record: " + arrayLegnth; 

        
      }) 
    
  }
