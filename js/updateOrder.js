//This code is used to update details on form
function updateOrderStatus(){
    var ie = document.getElementById("InTitelMod").innerHTML;
    var outBody = document.getElementById("outterModBodyIn");
    var invNumToUpdate = ie.replace("Invoice number: ",'');
    var statusSelected = document.querySelector('input[name="status"]:checked').value;
   
    //console.log(ie);
    console.log(invNumToUpdate);
    console.log(statusSelected);

    /* document.getElementById("alerterlbl").innerHTML = `<i class="fa fa-spinner"></i> 
    Change order status: <p style="color:red;">please select an option</p>`; */


    /*fetch("https://api.apispreadsheets.com/data/7WmZbgR1ICrqvHzJ/", {
    method: "POST",
    body: JSON.stringify(
        {"data":
        {"status":statusSelected,},
        //this determines whch row to update
        "query": "select*from26852whereInvoice_Num=" + invNumToUpdate}),
    
    }).then(res =>{
    if (res.status === 201){
        // SUCCESS
    }
    else{
        // ERROR
    }
    })*/

    function loadercircle(){
        //after updatig the status, success message is shown on the modal body outterModBodyIn
    outBody.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`
    }
    
  }
  
  function formclearer(){
    document.getElementById("formupdateValue").reset();
  }