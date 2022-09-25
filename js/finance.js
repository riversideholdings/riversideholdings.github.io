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
document.addEventListener('DOMContentLoaded', fetchlastInvNum, shownewInvNum, graphs)

/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
//fetch las invoice number
function fetchlastInvNum() {
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
      graphs();

    })


}

/*===========================================================================================
THIS FUNCTION PRODUCES INFORMATION FOR THE COLORFULL BLOCKS AT THE TOP OF THE FINANCE SECTION
============================================================================================*/
function shownewInvNum() {
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
        var lt1 = invoiceArr[i].c[8].v;
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

      try {
        document.getElementById("total-salesamnt").innerHTML = `<center><i class="fa-solid fa-coins whiteicn"></i><br>Total value invoiced:<br> <b>R ${sum2.toFixed(2)}</b></center>`;
      } catch {
        //
      }

      //this code populates only unpaid orders
      var finder2 = Arr.filter(function (invoice, index) {
        if (invoice.invStatus == 'Awaiting Payment')
          return true;
      });

      const sum = finder2.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      try {
        document.getElementById("total-salesamnt-unpaid").innerHTML = `<center><i class="fa-solid fa-hand-holding-dollar whiteicn"></i><br>Total unpaid orders:<br> <b>R ${sum.toFixed(2)}</b></center>`;
      } catch {
        //
      }

      for (var j = 0; j < finder2.length; j++) {

        var tbodypop = document.getElementById("tbodyd");

        try {
          tbodypop.innerHTML += `<tr>
              <td>${finder2[j].invNumber}</td>
              <td>${finder2[j].invDate}</td>
              <td>${finder2[j].RecipientName}</td>
              <td><center><div class="status-circle redglow"></div><center></td>
              </tr>`;
        }
        catch {
          //
        }



      }

      //for paid orders

      var findPaid = Arr.filter(function (invoice, index) {
        if (invoice.invStatus == 'Paid')
          return true;
      });

      const sumpd = findPaid.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      try {
        document.getElementById("total-salesamnt-paid").innerHTML = `<center><i class="fa-solid fa-money-bill-trend-up whiteicn"></i><br>Total revenue:<br> <b>R ${sumpd.toFixed(2)}</b></center>`;

        var tsales = document.getElementById("ratiobr1");
        var trevenue = document.getElementById("ratiobr2");
        var tunpaid = document.getElementById("ratiobr3");

        var tVals = document.getElementById("v1");
        var tValr = document.getElementById("v2");
        var tValu = document.getElementById("v3");

        //this statement creates the rations
        var totalSum = sum + sumpd + sum2;

        var percentRevenue = (sumpd / totalSum) * 100;
        trevenue.style.width = Math.round(percentRevenue) + "%";
        tValr.innerHTML = Math.round(percentRevenue) + "%";

        var percentUnpaid = (sum / totalSum) * 100;
        tunpaid.style.width = Math.round(percentUnpaid) + "%";
        tValu.innerHTML = Math.round(percentUnpaid) + "%";

        var percentAllInv = (sum2 / totalSum) * 100;
        tsales.style.width = Math.round(percentAllInv) + "%";
        tVals.innerHTML = Math.round(percentAllInv) + "%";

        //console.log(finder2)
        //console.log(Arr);
        let arrayLegnth = Arr.length;
        //console.log(arrayLegnth-1 );

        let lastElement = arrayLegnth - 1;
        //console.log(Arr[lastElement]); 

        var e = Arr[lastElement].invNumber;
        var f = parseFloat(e.replace(/\D/g, '')) + 1;
        var newInvoicNum = "RH0" + f;
        //console.log(newInvoicNum);

        document.getElementById("order-num-new").innerHTML = newInvoicNum;

        var ordernuminput = document.getElementById("Invoice_num");
        ordernuminput.value = document.getElementById("order-num-new").innerHTML;


        var counterinv = document.getElementById("completedorderCount");
        counterinv.innerHTML = `<i class="fa-solid fa-file-invoice-dollar whiteicn"></i><span class="alnright">Number of invoices: <b>${arrayLegnth}</b></span>`;

        //this code populates only unpaid orders
        var finder = Arr.filter(function (invoice, index) {
          if (invoice.invStatus == 'Awaiting Payment')
            return true;
        });

        try {//script for incomplete orders
          var num = finder.length;
          document.getElementById("ordercount2").innerHTML = `<i class="fa-solid fa-clipboard-list whiteicn"></i><span class="alnright">Unpaid Orders: <b>${num}</b></span>`;

        }
        catch {//script for complete orders
        }
        var numUn = finder.length;
        var num = Arr.length;
        var differenceNum = num - numUn;
        document.getElementById("ordercountComplete").innerHTML = `<i class="fa-solid fa-file-circle-check whiteicn"></i><span class="alnright">Completed orders: <b>${differenceNum}</b></span>`;


        var tbl = document.getElementById("tbodyd");
        var n = tbl.rows.length;
        document.getElementById("rowcount").innerHTML = `<tr><td style="color:#43c2f3;">${n} Rows</td><td></td><td></td><td></td></tr>`;
      } catch {
        //
      }

    })

}


function setstr() {
  var lastnumfrm = parseFloat(document.getElementById("lastarr").innerHTML);
  var setClID = document.getElementById("lientIDInput");
  var sname = document.getElementById("Client_Name").value;
  var f3lettrs = sname.substring(0, 3).toUpperCase();
  var n = lastnumfrm + 1;
  var concatstring = f3lettrs + n + "RH";

  setClID.value = concatstring;
  console.log(concatstring);
}

/*====================================================================================
END FUNCTION
======================================================================================*/


/*===========================================================================================
THIS FUNCTION PRODUCES INFORMATION FOR THE GRAPHS IN FINANCE
============================================================================================*/
function graphs() {
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


      let dataArr = [];

      for (let i = 0; i < invoiceArr.length; i++) {

        var invNumber = invoiceArr[i].c[0].v;
        var invDate = invoiceArr[i].c[1].v;
        var Recipient = invoiceArr[i].c[2].v;
        var RecipientAddress = invoiceArr[i].c[3].v;
        var Pricesused = invoiceArr[i].c[4].v;
        var ml330 = invoiceArr[i].c[5].v;
        var ml500 = invoiceArr[i].c[6].v;
        var ml750 = invoiceArr[i].c[7].v;
        var lt1 = invoiceArr[i].c[8].v;
        var lt5 = invoiceArr[i].c[9].v;
        var DiscountNotes = invoiceArr[i].c[10].v;
        var invoiceTotal = (invoiceArr[i].c[11].v);
        var invstatus = invoiceArr[i].c[12].v;

        //contruction a proper structured array of the data
        dataArr.push({
          "invNumber": invNumber,
          "invDate": parseFloat(invDate.substring(10, 11)) + 1,
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

      //==================================================
      //monthly revenue calculation 
      //===================================================

      //variables for monthly values
      var Jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec;

      //january 
      Jan = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "1")
          return true;
      });
      const sumpJan = Jan.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //febuary 
      feb = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "2")
          return true;
      });
      const sumpfeb = feb.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //march
      mar = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "3")
          return true;
      });
      const sumpmar = mar.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //april
      apr = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "4")
          return true;
      });
      const sumpapr = apr.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //may
      may = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "5")
          return true;
      });
      const sumpmay = may.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //june
      jun = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "6")
          return true;
      });
      const sumpjun = jun.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //july
      jul = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "7")
          return true;
      });
      const sumpjul = jul.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //august
      aug = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "8")
          return true;
      });
      const sumpaug = aug.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //september
      sep = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "9")
          return true;
      });
      const sumpsep = sep.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //october
      oct = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "10")
          return true;
      });
      const sumpoct = oct.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //november
      nov = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "11")
          return true;
      });
      const sumpnov = nov.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      //december
      dec = dataArr.filter(function (invoice, index) {
        if (invoice.invDate == "12")
          return true;
      });
      const sumpdec = dec.reduce((accumulator, object) => {
        return accumulator + object.invTotal;
      }, 0);

      /*============================================================
      END
      ================================================================*/

      //Line chart
      var xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var yValues = [sumpJan, sumpfeb, sumpmar, sumpapr, sumpmay, sumpjun, sumpjul, sumpaug, sumpsep, sumpoct, sumpnov, sumpdec];
      var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145", "#3586a6", "#43c2f3", "yellow", "red", "gold", "purple"];

      //line chart
      new Chart("monthlyChart-line", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#3586a6",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{ ticks: { min: 0, max: 100000 } }],
          },
          title: {
            display: true,
            text: "Riverside Holdings monthly revenue 2022"
          }
        }
      });

      //pie chart
      new Chart("pie-chart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "Riverside Holdings monthly revenue 2022"
          }
        }
      });

      //bar chart
      new Chart("monthlyChart-bar", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Riverside Holdings monthly revenue 2022"
          }
        }
      });

    })
}

function changechart(n) {
  var btnid = n

  var linechart = document.getElementById("monthlydivline");
  var barchart = document.getElementById("monthlydivbar");
  var b1 = document.getElementById("btn1");
  var b2 = document.getElementById("btn2");


  if (btnid == "btn1") {
    linechart.style.display = "none";
    barchart.style.display = "block";
    b1.style.display = "none";
    b2.style.display = "block";
  }
  else if (btnid == "btn2") {
    linechart.style.display = "block";
    barchart.style.display = "none";
    b2.style.display = "none";
    b1.style.display = "block";
  }

}

function showEx(x){
  var btnid = x;

  var exp = document.getElementById("expenses-sect");
  var exbtn1 = document.getElementById("btn-ex");
  var exbtn2 = document.getElementById("btn-ex2");


  if(btnid == "btn-ex"){
    exp.style.display = "block";
    exbtn1.style.display = "none";
    exbtn2.style.display = "block";
  }
  else if(btnid == "btn-ex2"){
    exp.style.display = "none";
    exbtn2.style.display = "none";
    exbtn1.style.display = "block";
  }
}