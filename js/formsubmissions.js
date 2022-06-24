//https://script.google.com/macros/s/AKfycbzyAdWjoYajoqHFzwezNfqLAKbFA_DNxfkKDFZl8cDKz2iN8aDk21XHg_ViOlZ6EyUG/exec

const scriptURL = 'https://script.google.com/macros/s/AKfycbzyAdWjoYajoqHFzwezNfqLAKbFA_DNxfkKDFZl8cDKz2iN8aDk21XHg_ViOlZ6EyUG/exec'
    const form = document.forms['submit-new-order']
  
    form.addEventListener('submit', e => {
      e.preventDefault()
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
        <br><span class="green"><i class="fa fa-square-check"></i></span>`;
        footMod.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
     };
}