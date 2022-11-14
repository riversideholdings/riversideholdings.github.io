//https://script.google.com/macros/s/AKfycbzyAdWjoYajoqHFzwezNfqLAKbFA_DNxfkKDFZl8cDKz2iN8aDk21XHg_ViOlZ6EyUG/exec

const scriptURL = 'https://script.google.com/macros/s/AKfycbzyAdWjoYajoqHFzwezNfqLAKbFA_DNxfkKDFZl8cDKz2iN8aDk21XHg_ViOlZ6EyUG/exec'
    const form = document.forms['submit-new-order']
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      setprintdetails()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))

        document.getElementById("orderForm").reset();   
        cicr(); 
    })

function clearForm(){
    document.getElementById("orderForm").reset();
    document.getElementsByClassName("itm-lable").value = "0";
}

function cicr(){
    var outterBody = document.getElementById("moddBody")
    var footMod = document.getElementById("mdofoot");
    var inv = document.getElementById("order-num-new").innerHTML;

    const timerout = setTimeout(loadercircle, 2000);

    //after updatig the status, success message is shown on the modal body outterModBodyIn
    outterBody.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`
    
    function loadercircle(){
        //after updatig the status, success message is shown on the modal body outterModBodyIn
        outterBody.innerHTML = `<h4 class="text-center">Invoice Number: ${inv} Has been added to orders</h4>
        <br><center><span class="green"><i class="fa fa-square-check"></i></span></center>
        <br>
        <h4 class="text-center">Please ensure you download and save the <b>.pdf</b> invoice below. 
        <br><br><i class="fa-regular fa-file-pdf redicon"></i></h4>
        <hr>
        <div id="My invoice">
            <h1 class="text-center">
            The invoice download option will not work at the moment, it is still under development. 
            <br><br>
            <i class="fa-solid fa-code"></i>
            </h1>
        </div>`;

        footMod.innerHTML = `
        <button type="button" onclick="printToPdf()" class="btn btn-success">Download .pdf <i class="fa-solid fa-file-arrow-down"></i></i></button>&nbsp;
        <button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
     };
}

function setprintdetails(){
    var invNum = document.getElementById("Invoice_num").value;
    var invDte = document.getElementById("Invoice_Date").value;
    var invRecipient = document.getElementById("exiRecipient").value;
    var invAddress = document.getElementById("Recipient Address").value;
    var invTotal = document.getElementById("Invoice Total").value;
    var invNewRecip = document.getElementById("newRecipient").value;
    var recipientinv = "";

    if (invRecipient != ""){
        recipientinv = invRecipient; 
    }
    else{
        recipientinv = invNewRecip;
    };

    //products
    var inv300mlQty = document.getElementById("300mlinput").value;
    var inv500mlQty = document.getElementById("500mlinput").value;
    var inv750mlQty = document.getElementById("750mlinput").value;
    var inv1lQty = document.getElementById("1linput").value;
    var inv5lQty = document.getElementById("5linput").value;

    const items = {
        itm300ml: inv300mlQty,
        itm500ml: inv500mlQty,
        itm750ml: inv750mlQty,
        itm1lt: inv1lQty,
        itm5lt: inv5lQty
    };

    const invoicedet = {
        invNumber: invNum,
        Date: invDte,
        Recipient: recipientinv,
        Address: invAddress,
        newRecp: invNewRecip,
        Total: invTotal,
        itm: items
    };

    const invoice = JSON.stringify(invoicedet);

    localStorage.setItem("InvoiceDetail", invoice);

    console.log(invoicedet)
}