function clearLocal() {
  var idToKeep = localStorage.getItem("ClientID");
  //onsole.log(idToKeep);

  //localStorage.setItem("maintainID", idToKeep);

  localStorage.removeItem("maintainID");
  //console.log("ClientID has been removed from local Storage");
  //console.log(localStorage);

}

//https://docs.google.com/spreadsheets/d/1B72XHR8ff7JqN9Pj52RBjFFPUt5dmtrTJOaT2dUAeXk/edit?usp=sharing
var editModTitle = document.getElementById("InTitelMod");
var editModBody = document.getElementById("modInBody");
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
document.addEventListener('DOMContentLoaded', init, detailstap)

/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
function init() {
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


      let structuredArr = [];
      let awaitPaymentArr = [];

      var populateCards = document.getElementById("cardRows");
      var populateUnpaid = document.getElementById("unPaidcardRows");
      var populateTable = document.getElementById("allOrdersT");

      for (let i = 0; i < invoiceArr.length; i++) {

        var invNumber = invoiceArr[i].c[0].v;
        var invDate = invoiceArr[i].c[1].f;
        var Recipient = invoiceArr[i].c[2].v;
        var RecipientAddress = invoiceArr[i].c[3].v;
        var Pricesused = invoiceArr[i].c[4].v;
        var ml330 = invoiceArr[i].c[5].v;
        var ml500 = invoiceArr[i].c[6].v;
        var ml750 = invoiceArr[i].c[7].v;
        var lt1 = invoiceArr[i].c[8].v;
        var lt5 = invoiceArr[i].c[9].v;
        var DiscountNotes = invoiceArr[i].c[10].v;
        var invoiceTotal = invoiceArr[i].c[11].v;
        var invstatus = invoiceArr[i].c[12].v;
        var client_Id = invoiceArr[i].c[14].v;

        var combineItems = `500ml cases: ${ml500}
            <br>750ml cases: ${ml750} 
            <br>1lt cases: ${lt1}
            <br>5lt cases: ${lt5}
            `;

        var coloring, iconused;
        if (invstatus == "Paid") {
          coloring = "green";
          iconused = "circle-check";
        }
        else if (invstatus == "Awaiting Payment") {
          coloring = "redicon";
          iconused = "credit-card";
        }
        else if (invstatus == "Void") {
          coloring = "redicon";
          iconused = "ban";
        }

        try {
          populateCards.innerHTML += `
              <div class="col-sm-6">
                <div class="card" style="width: 35rem; height: 50rem;" id="Card${invNumber}">
                  <div class="card-body">
                    <h4 class="card-title" id="inNum">Invoice Number: # ${invNumber}</h4>
                    <h5 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar-days"></i> ${invDate}</h5>
                    <p class="card-subtitle mb-2 text-muted"><i class="fa fa-user"></i>&nbsp;&nbsp; <b>${Recipient}</b></p>
                    <hr></hr>
                    <p class="card-text">Address: <b>${RecipientAddress}</b></p>
                    <h5 class="card-text">Discouts Applied: <b>${DiscountNotes}</b></h5>
                    <hr></hr>
                    <h4 class="card-text"><i class="fa fa-dolly"></i> Items: ${Pricesused}</h4>
                    <p class="card-text">${combineItems}</p>
                    </div>
                    <div class="card-foot" style="padding-left: 15px; padding-bottom: 10px;">
                    <h4 class="card-text"><i class="fa fa-sack-dollar moneygreen"></i> R ${invoiceTotal}</h4><br>
                    <span><button type="button" id="${invNumber}" onclick="detailstap(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#detailCenter">Details</button></span>&nbsp;&nbsp;&nbsp;
                    <span class="${coloring}"><i class="fa fa-${iconused}"></i>&nbsp; ${invstatus}</span>
                  </div>
                </div>
              </div>`;
        }
        catch {
          //console.log("You are seeing this because some code in the request.js is not part of this page.")
        }

        try {
          var classcolr = "";
          if (invstatus == "Paid") {
            classcolr = `<div class="status-circle-green greenglow"></div>`;
          }
          else if (invstatus == "Awaiting Payment") {
            classcolr = `<div class="status-circle redglow"></div>`;
          }
          else {
            classcolr = `<div class="status-circle redglow"></div>`;
          }
          populateTable.innerHTML += `<tr id="tr${invNumber}">
              <td><b>${i + 1}</b></td>
              <td>${invNumber}</td>
              <td>${invDate}</td>
              <td class="DontShowmeonsmallScreen"><i class="fa fa-user"></i>&nbsp;&nbsp; ${Recipient}</td>
              <td class="DontShowmeonsmallScreen">R ${invoiceTotal}</td>
              <td><center>${classcolr}</center></td>
              <td><center><button type="button" class="btn btn-primary" id="${invNumber}" onclick="detailstap(this.id)" data-toggle="modal" data-target="#detailCenter"><span class="DontShowmeonsmallScreen">View Details</span> &nbsp;<span><i class="fa-regular fa-eye"></i></span></button></center></td>
              </tr>`;
        }
        catch {

        }


        //contruction a proper structured array of the data
        structuredArr.push({
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
          "ClientIDd": client_Id
        });

      }

      //this statement will only execute in the personalised users page
      var usersTableOrders = document.getElementById("CustomersOrders");
      var UserIDToUse = localStorage.getItem("ClientID")

      //console.log(UserIDToUse);

      //this code populates orders based on their id/inv num
      var findByID = structuredArr.filter(function (invoice, index) {
        if (invoice.ClientIDd == UserIDToUse && invoice.invStatus != "Void")
          return true;
      });
      //console.log(findByID);

      for (let u = 0; u < findByID.length; u++) {

        var invNumID = findByID[u].invNumber;
        var invRecNameID = findByID[u].RecipientName;
        var invTotID = findByID[u].invTotal;
        var addressID = findByID[u].RecipientAddress;
        var dateID = findByID[u].invDate;
        var statusID = findByID[u].invStatus;

        try {
          document.getElementById("ClientNAme").innerHTML = invRecNameID;

          var classcolr2 = "";
          if (statusID == "Paid") {
            classcolr2 = `<div class="status-circle-green greenglow"></div>`;
          }
          else if (statusID == "Awaiting Payment") {
            classcolr2 = `<div class="status-circle redglow"></div>`;
          }
          else {
            classcolr2 = `<div class="status-circle redglow"></div>`;
          }
          usersTableOrders.innerHTML += `<tr id="tr${invNumID}">
              <td><b>${u + 1}</b></td>
              <td>${invNumID}</td>
              <td>${dateID}</td>
              <td class="DontShowmeonsmallScreen"><i class="fa fa-user"></i>&nbsp;&nbsp; ${invRecNameID}</td>
              <td class="DontShowmeonsmallScreen">R ${invTotID}</td>
              <td><center>${classcolr2}</center></td>
              <td><center><button type="button" class="btn btn-primary" id="${invNumID}" onclick="detailstap(this.id)" data-toggle="modal" data-target="#detailCenter"><span class="DontShowmeonsmallScreen">View Details</span> &nbsp;<span><i class="fa-regular fa-eye"></i></span></button></center></td>
              </tr>`;
        }
        catch {


        }


      }
      //var totalinv = invTotID++;
      //document.getElementById("TotalInv").innerHTML = totalinv;




      //this code populates only unpaid orders
      var finder = structuredArr.filter(function (invoice, index) {
        if (invoice.invStatus == 'Awaiting Payment')
          return true;

      });
      //console.log(finder);

      var tablepop = document.getElementById("unPaidcardRows");
      var tableView = document.getElementById("allunpaidOdrs");

      for (let j = 0; j < finder.length; j++) {
        var invNum = finder[j].invNumber;
        var invRecName = finder[j].RecipientName;
        var invTot = finder[j].invTotal;
        var address = finder[j].RecipientAddress;
        var date = finder[j].invDate;
        var status = finder[j].invStatus;
        var iml300 = finder[j].milLitres330;
        var iml500 = finder[j].milLitres500;
        var iml750 = finder[j].mlLitres750;
        var ilt1 = finder[j].litres1;
        var ilt5 = finder[j].litres5;
        var pused = finder[j].Pricesused;
        var notes = finder[j].DiscountNotes;

        var combineItems2 = `500ml cases: ${iml500}
            <br>750ml cases: ${iml750} 
            <br>1lt cases: ${ilt1}
            <br>5lt cases: ${ilt5}
            `;

        try {
          tablepop.innerHTML += `<tr>
              <div class="col-sm-6">
              <div class="card" style="width: 35rem; height: 50rem;" id="Card${invNum}">
                <div class="card-body">
                  <h4 class="card-title" id="inNum">Invoice Number: # ${invNum}</h4>
                  <h5 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar-days"></i> ${date}</h5>
                  <p class="card-subtitle mb-2 text-muted"><i class="fa fa-user"></i>&nbsp;&nbsp; <b>${invRecName}</b></p>
                  <hr></hr>
                  <p class="card-text">Address: <b>${address}</b></h5>
                  <h5 class="card-text">Discouts Applied: <b>${notes}</b></h5>
                  <hr></hr>
                  <h4 class="card-text"><i class="fa fa-dolly"></i> Items: ${pused}</h4>
                  <p class="card-text">${combineItems2}</p>
                  </div>
                  <div class="card-foot" style="padding-left: 15px; padding-bottom: 10px;">
                  <h4 class="card-text"><i class="fa fa-sack-dollar moneygreen"></i> R ${invTot}</h4><br>
                  <span><button type="button" id="${invNum}" onclick="detailstap(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#detailCenter">Details</button></span>&nbsp;&nbsp;&nbsp;
                  <button class="btn btn-info" id="${invNum}ed" onclick="popmodalforupdate(this.id)" data-toggle="modal" data-target="#EditCenter"><i class="fa fa-pen"></i></button>
                  <span class="${coloring}2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-${iconused}"></i>&nbsp; ${status}</span>
                </div>
              </div>
            </div>`;
        }
        catch {
          //console.log("You are seeing this because some code in the request.js is not part of this page.")
        }

        try {
          var classcolr = "";
          if (status == "Paid") {
            classcolr = `<div class="status-circle-green greenglow"></div>`;
          }
          else if (status == "Awaiting Payment") {
            classcolr = `<div class="status-circle redglow"></div>`;
          }
          else {
            classcolr = `<div class="status-circle redglow"></div>`;
          }

          tableView.innerHTML += `<tr id="tr${invNum}">
              <td><b>${j + 1}</b></td>
              <td>${invNum}</td>
              <td>${date}</td>
              <td class="DontShowmeonsmallScreen"><i class="fa fa-user"></i>&nbsp;&nbsp; ${invRecName}</td>
              <td class="DontShowmeonsmallScreen">R ${invTot}</td>
              <td class="DontShowmeonsmallScreen"><center>${classcolr}</center></td>
              <td><center><button type="button" class="btn btn-primary" id="${invNum}" onclick="detailstap(this.id)" data-toggle="modal" data-target="#detailCenter"><span class="DontShowmeonsmallScreen">View Details</span> &nbsp;<span><i class="fa-regular fa-eye"></i></span></button></center></td>
              <td> <button class="btn btn-info" id="${invNum}ed" onclick="popmodalforupdate(this.id)" data-toggle="modal" data-target="#EditCenter"><i class="fa fa-pen"></i></button></td>
              </tr>`;
        }
        catch {

        }


      }

      //----------------------------------------------------
      try {//script for incomplete orders
        var num = finder.length;
        document.getElementById("ordercount2").innerHTML = "Riverside Holdings orders: <b style='color:red;'>" + num + "</b> Orders not paid";

      }
      catch {//script for complete orders
        var numUn = finder.length;
        var num = structuredArr.length;
        var differenceNum = num - numUn;
        document.getElementById("ordercount").innerHTML = "Riverside Holdings orders: <b style='color:#3586a6;'>" + num + " Orders on record.</b><br><b style='color:red;'>" + numUn + "</b> Orders are not payed. <br><b style='color:rgb(25, 139, 25);'>" + differenceNum + "</b> Have been paid and completed.";
      }
      //log array to console to check proper structure
      //console.log("");
      //console.log("Proper Structured Array combining the " + num + " Above");
      //console.log(structuredArr)


    })


}

function popmodalforupdate(clickedon) {

  //when u reach 100000 orders change this 
  let invnummm = clickedon.slice(0, 7)
  editModTitle.innerHTML = "Invoice number: " + invnummm;



  //the values of these have been set right at the top of the script
  //InTitelMod
  //modInBody
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
      var forminside = document.getElementById("formupdateValue");

      for (let i = 0; i < invoiceArr.length; i++) {

        var invNumber = invoiceArr[i].c[0].v;
        var invDate = invoiceArr[i].c[1].f;
        var Recipient = invoiceArr[i].c[2].v;
        var RecipientAddress = invoiceArr[i].c[3].v;
        var Pricesused = invoiceArr[i].c[4].v;
        var ml330 = invoiceArr[i].c[5].v;
        var ml500 = invoiceArr[i].c[6].v;
        var ml750 = invoiceArr[i].c[7].v;
        var lt1 = invoiceArr[i].c[8].v;
        var lt5 = invoiceArr[i].c[9].v;
        var DiscountNotes = invoiceArr[i].c[10].v;
        var invoiceTotal = invoiceArr[i].c[11].v;
        var invstatus = invoiceArr[i].c[12].v;
        var invDeliveryStat = invoiceArr[i].c[13].v;

        var combineItems = `500ml cases: ${ml500}
        <br>750ml cases: ${ml750} 
        <br>1lt cases: ${lt1}
        <br>5lt cases: ${lt5}
        `;

        var coloring, iconused, detailtext;
        if (invstatus == "Paid") {
          coloring = "green";
          iconused = "circle-check";
          detailtext = "The order has been complete and payed for!"
          var addDangerBtn = " ";
        }
        else if (invstatus == "Awaiting Payment") {
          coloring = "redicon";
          iconused = "credit-card";
          detailtext = Recipient + ` Has not payed for the order!`;
          var addDangerBtn = `<button type="button" class="btn btn-danger">Send Reminder</button>`;
        }
        else if (invstatus == "Void") {
          coloring = "redicon";
          iconused = "ban";
          detailtext = `Order has been canceled!`
        }

        if (invnummm == invNumber) {
          editModBody.innerHTML = `
            <p>Your are about to update the status for the above mentioned invoice number!</p>
            <p>if your are sure about your choice please proceed to change status in the selection below and press "update Status" button to complete.</p>
            <br>
            <h5 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar-days"></i> ${invDate}</h5>
            <p class="card-subtitle mb-2 text-muted"><i class="fa fa-user"></i>&nbsp;&nbsp; <b>${Recipient}</b></p>
            <p class="card-text">Address: <b>${RecipientAddress}</b></p>
            <hr></hr><p id="status-progress"></p>
            <br>
             `;

        }


      }


    })


}

function validateoption() {
  //var dselectVAl = document.getElementById("statusInMod").value;
  var selectedValue = document.querySelector('input[name="status"]:checked');

  var thatopt = document.getElementById("status-progress");
  if (selectedValue.value == "Paid") {
    thatopt.innerHTML = `The status of this order will change to: <br> <span class="green"><i class="fa fa-circle-check"></i>&nbsp;Paid</span>`;
  }
  else if (selectedValue.value == "Awaiting Payment") {
    thatopt.innerHTML = `The status of this order will change to: <br> <span class="redicon" ><i class="fa fa-credit-card"></i>&nbsp;Awaiting payment</span>`;
  }
  else if (selectedValue.value == "Void") {
    thatopt.innerHTML = `The status of this order will change to: <br> <span class="redicon" ><i class="fa fa-ban"></i>&nbsp;Void</span>`
  }
}
//populate modals
var modTitle = document.getElementById("ModalLongTitle");
var modBody = document.getElementById("modBody");
var modTotal = document.getElementById("modTotal");
var btnRemind = document.getElementById("btnDangerAl");

function detailstap(clicked) {

  modTitle.innerHTML = `Invoice number: ${clicked}`;

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

      for (let i = 0; i < invoiceArr.length; i++) {

        var invNumber = invoiceArr[i].c[0].v;
        var invDate = invoiceArr[i].c[1].f;
        var Recipient = invoiceArr[i].c[2].v;
        var RecipientAddress = invoiceArr[i].c[3].v;
        var Pricesused = invoiceArr[i].c[4].v;
        var ml330 = invoiceArr[i].c[5].v;
        var ml500 = invoiceArr[i].c[6].v;
        var ml750 = invoiceArr[i].c[7].v;
        var lt1 = invoiceArr[i].c[8].v;
        var lt5 = invoiceArr[i].c[9].v;
        var DiscountNotes = invoiceArr[i].c[10].v;
        var invoiceTotal = invoiceArr[i].c[11].v;
        var invstatus = invoiceArr[i].c[12].v;
        var invDeliveryStat = invoiceArr[i].c[13].v;

        var combineItems = `500ml cases: ${ml500}
            <br>750ml cases: ${ml750} 
            <br>1lt cases: ${lt1}
            <br>5lt cases: ${lt5}
            `;

        var coloring, iconused, detailtext;
        if (invstatus == "Paid") {
          coloring = "green";
          iconused = "circle-check";
          detailtext = "The order has been complete and payed for!"
          var addDangerBtn = " ";
        }
        else if (invstatus == "Awaiting Payment") {
          coloring = "redicon";
          iconused = "credit-card";
          detailtext = Recipient + ` Has not payed for the order!`;
          var addDangerBtn = `<button type="button" class="btn btn-danger">Send Reminder</button>`;
        }
        else if (invstatus == "Void") {
          coloring = "redicon";
          iconused = "ban";
          detailtext = `Order has been canceled!`
        }

        if (clicked == invNumber) {

          modBody.innerHTML = `
                <img src="img/Riverside_OG.png" width="20%" class="logorounded"/><br><br><br>
                <h5 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar-days"></i> ${invDate}</h5>
                <p class="card-subtitle mb-2 text-muted"><i class="fa fa-user"></i>&nbsp;&nbsp; <b>${Recipient}</b></p>
                <p class="card-text"><i class="fa fa-location-dot"></i>&nbsp;&nbsp; <b>${RecipientAddress}</b></h5>
                <hr>
                <h4><i class="fa fa-dolly"></i>&nbsp; Items:</h4><p class="card-text">${combineItems}</p>
                <hr>
                <p>${detailtext}</p>
                <p>Delivery Status: <b>${invDeliveryStat}</b></p>
                <hr>
                <span class="${coloring}"><i class="fa fa-${iconused}"></i>&nbsp; ${invstatus}</span>
                `;

          modTotal.innerHTML = "Total: R" + invoiceTotal;

          btnRemind.innerHTML = addDangerBtn;
        }

      }


    })
}

//Card${invNumber}

function scrollToItem() {
  var searchText = document.getElementById("SerachVal").value;

  try {
    const element = document.getElementById("Card" + searchText);
    element.scrollIntoView();

    element.style = `
    width: 35rem;
    height: 50rem;
    box-shadow:0px 0px 16px 6px #3586a6;
    transition: ease-in 0.3s;
    `;

    const myTimeout = setTimeout(removefocus, 4000);

    function removefocus() {
      element.style = " ";
    }
  }
  catch {
    if (searchText == ""){
      alert("Please enter something in the textbox")
    }
    else{
      alert("Please use only Capital letters, and Numbers in the text Box, Enter order numbers like this, e.g RH02001")
    }
    
  }

}

function findOrder() {
  var searchText = document.getElementById("SerachVal").value;
  var foundTablerow = document.getElementById("tr" + searchText);
  try {
    foundTablerow.scrollIntoView();
    foundTablerow.style = "background-color: gold";

    const endHighlight = setTimeout(myEndFunction, 30000);

    function myEndFunction() {
      foundTablerow.style = "background-color: none";
    }
  }
  catch {
    if (searchText == ""){
      alert("Please enter something in the textbox")
    }
    else{
      alert("Please use only Capital letters, and Numbers in the text Box, Enter order numbers like this, e.g RH02001")
    }
    
  }

}

function hideviewTable(z) {
  var btnid = z;

  var tablebtn = document.getElementById("vieTable");
  var cardsbtn = document.getElementById("viecards");
  var scrollbtn = document.getElementById("scroll-to-cards");
  var hilightbtn = document.getElementById("highlight-Row");


  var tableOdr = document.getElementById("tableOrders");
  var cardsOdr = document.getElementById("cardRows");


  if (btnid == "vieTable") {
    cardsOdr.style.display = "none";
    tableOdr.style.display = "block";
    cardsbtn.style.display = "block";
    tablebtn.style.display = "none";
    scrollbtn.style.display = "none";
    hilightbtn.style.display = "block";

  }
  else if (btnid == "viecards") {
    tableOdr.style.display = "none";
    cardsOdr.style.display = "block";
    tablebtn.style.display = "block";
    cardsbtn.style.display = "none";
    scrollbtn.style.display = "block";
    hilightbtn.style.display = "none";
  }
}

function hideviewTableUnpaid(z) {
  var btnid = z;

  var tablebtn = document.getElementById("vieTable");
  var cardsbtn = document.getElementById("viecards");
  var scrollbtn = document.getElementById("scroll-to-cards");
  var hilightbtn = document.getElementById("highlight-Row");

  var tableOdr = document.getElementById("tableOrders");
  var cardsOdr = document.getElementById("unPaidcardRows");


  if (btnid == "vieTable") {
    cardsOdr.style.display = "none";
    tableOdr.style.display = "block";
    cardsbtn.style.display = "block";
    tablebtn.style.display = "none";
    scrollbtn.style.display = "none";
    hilightbtn.style.display = "block";
  }
  else if (btnid == "viecards") {
    tableOdr.style.display = "none";
    cardsOdr.style.display = "block";
    tablebtn.style.display = "block";
    cardsbtn.style.display = "none";
    scrollbtn.style.display = "block";
    hilightbtn.style.display = "none";
  }
}
