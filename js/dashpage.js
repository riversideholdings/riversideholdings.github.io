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
          var invoiceTotal = (invoiceArr[i].c[11].v);	
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
    
               
        const sum2 = Arr.reduce((accumulator, object) => {
          return accumulator + object.invTotal;
        }, 0);
      
        document.getElementById("total-salesamnt").innerHTML = `<i class="fa-solid fa-coins" style="color: gold;"></i>&nbsp; Total sales value invoiced:<br> <b class="blue">R ${sum2}0</b>`;
       
       
           //this code populates only unpaid orders
           var finder2 = Arr.filter(function(invoice, index){
            if(invoice.invStatus == 'Awaiting Payment')
            return true;});

            const sum = finder2.reduce((accumulator, object) => {
              return accumulator + object.invTotal;
            }, 0);
          
           document.getElementById("total-salesamnt-unpaid").innerHTML = `<i class="fa-solid fa-hand-holding-dollar redicon"></i>&nbsp; Total unpaid quoted orders:<br> <b class="redicon">R ${sum}0</b>`;
        
            for(var j = 0; j < 10; j++)
            {

              var tbodypop =document.getElementById("tbodyd");

              tbodypop.innerHTML += `<tr>
              <td>${finder2[j].invNumber}</td>
              <td>${finder2[j].invDate}</td>
              <td>${finder2[j].RecipientName}</td>
              <td><center><div class="status-circle redglow"></div><center></td>
              </tr>`;

                    
           

            }

            //for paid orders
            
          var findPaid = Arr.filter(function(invoice, index){
            if(invoice.invStatus == 'Paid')
            return true;});

            const sumpd = findPaid.reduce((accumulator, object) => {
              return accumulator + object.invTotal;
            }, 0);
          
           document.getElementById("total-salesamnt-paid").innerHTML = `<i class="fa-solid fa-check-double green"></i>&nbsp; Total completed sales value:<br> <b class="green">R ${sumpd}0</b>`;
        

            


  
        //console.log(finder2)
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
        counterinv.innerHTML =`<i class="fa-solid fa-file-invoice-dollar blue"></i>&nbsp;&nbsp; Total Invoices on record: <b style="color: #3586a6;">${arrayLegnth}</b>`; 

           //this code populates only unpaid orders
           var finder = Arr.filter(function(invoice, index){
            if(invoice.invStatus == 'Awaiting Payment')
            return true;});

        try{//script for incomplete orders
          var num = finder.length;
          document.getElementById("ordercount2").innerHTML = `<i class="fa-solid fa-clipboard-list redicon"></i> &nbsp;&nbsp;Number of unpaid Orders: <b style='color:red;'>${num}</b>`;
          
         }
         catch{//script for complete orders
         }
         var numUn = finder.length;
         var num = Arr.length;
         var differenceNum =num - numUn;
         document.getElementById("ordercountComplete").innerHTML = `<i class="fa-solid fa-file-circle-check green"></i>&nbsp; Number of completed orders: <b style='color:rgb(25, 139, 25);'>${differenceNum}</b>`;
        
         
        var tbl = document.getElementById("tbodyd");
        var n = tbl.rows.length;
        document.getElementById("rowcount").innerHTML = `<td style="color:#43c2f3;">${n} Rows</td><td></td><td></td><td></td>`;
         
      }) 
    
  }


function clearfrmclient()
{
  document.getElementById("clientfrm").reset();
}

  const scriptURLclientfrm = 'https://script.google.com/macros/s/AKfycbx9m5Mw-agREUBUDkKJc8pfFasiGhzQj5sburFNtNy5S6YpYKHccIqnpftPejgyrIeo/exec'
    const formClient = document.forms['client-frm']
  
    formClient.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURLclientfrm, { method: 'POST', body: new FormData(formClient)})
        .then(response => console.log('Success!', response), successClientfrm())
        .catch(error => console.error('Error!', error.message))
    })

function successClientfrm(){

  var outBodyClient = document.getElementById("modbodClient");
    var fottClient = document.getElementById("modfootClient");

  //after updatig the status, success message is shown on the modal body outterModBodyIn
  outBodyClient.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`

  const timeroutc = setTimeout(loadercircle, 2000);
  
  function loadercircle(){
      //after updatig the status, success message is shown on the modal body outterModBodyIn
      outBodyClient.innerHTML = `<h1 class="text-center">Client Successfully added! <br><center><i class="fa fa-square-check green"></i></center></h1>`
      fottClient.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
   }; 
}