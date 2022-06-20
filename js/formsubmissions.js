//https://script.google.com/macros/s/AKfycbzyAdWjoYajoqHFzwezNfqLAKbFA_DNxfkKDFZl8cDKz2iN8aDk21XHg_ViOlZ6EyUG/exec

const scriptURL = 'https://script.google.com/macros/s/AKfycbzyAdWjoYajoqHFzwezNfqLAKbFA_DNxfkKDFZl8cDKz2iN8aDk21XHg_ViOlZ6EyUG/exec'
    const form = document.forms['submit-new-order']
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))

        document.getElementById("orderForm").reset();    
    })

function clearForm(){
    document.getElementById("orderForm").reset();
    document.getElementsByClassName("itm-lable").value = "0";
}

function closemodal(){
    $("#newOrderFormCenter").modal('hide');
}