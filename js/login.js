//https://docs.google.com/spreadsheets/d/1Wmg91Aqj8Fvf4Qgx_zBc64OtytV9Z4tKXNuFCEPhPEc/edit?usp=sharing
//==============get invoices=================================//
//google spreedsheet data
//1Wmg91Aqj8Fvf4Qgx_zBc64OtytV9Z4tKXNuFCEPhPEc
const sheetId = '1Wmg91Aqj8Fvf4Qgx_zBc64OtytV9Z4tKXNuFCEPhPEc';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'admin';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`

//DOM function lisatener
const data = []
document.addEventListener('DOMContentLoaded', init, submitformP)
 
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
          const adminArr = jsonData.table.rows;
          //=============LOG TO CONSOLE========================//
          //console.log(jsonData);
          //console.log(adminArr);

          
          let structuredArr = [ ];
          let awaitPaymentArr = [ ];

          var populateCards = document.getElementById("cardRows");
          var populateUnpaid = document.getElementById("unPaidcardRows")
          
          for (let i = 1; i < adminArr.length; i++) {
        
            var User_Id = adminArr[i].c[0].v;
            var Name =	adminArr[i].c[1].v;
            var Surname = adminArr[i].c[2].v;	
            var Email =	adminArr[i].c[3].v;
            var Phone =	adminArr[i].c[4].v;
            var Password = adminArr[i].c[5].v;

            //contruction a proper structured array of the data
            structuredArr.push({
                "User_Id": User_Id,	
                "Name":	Name,
                "Surname": Surname,	
                "Email": Email,	
                "Phone": Phone,	
                "Password":Password
              });

           
          }  
          
      
      })        
}

function submitformP(){
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            //rows of the data retrieved
            const arrTest = jsonData.table.rows;
            //this fgor loop sorts out the valuer of the array and presents them to us
           

            var fEmail = document.getElementById("Email-user").value;
            var fPass = document.getElementById("user-password-field").value;
            var err = document.getElementById("errorMess");

            //COMPARE DATABSE PASSWORDS
            if(fEmail == "" && fPass == "")
              {
                err.innerHTML = "Please fill in all fields!";
                $("#Email").focus();
              }
              else if (fPass == "")
              {
                err.innerHTML = "Please fill in all fields!";
                $("#password-field").focus();
              }
              else if(fEmail != "" && fPass != "")
              {
                for (let i = 1; i < arrTest.length; i++)
                {
                  
                  var d2Email = arrTest[i].c[3].v;
                  var d2Pass = arrTest[i].c[5].v

                  if(fEmail == d2Email)
                  {
                    if(fPass == d2Pass)
                    {
                        window.open('home.html', '_self');
                      
                    }
                    else if(fPass != d2Pass)
                    {
                      err.innerHTML = "Incorrect Password / Email!";
                    }
                  }
                }
              }

  })
}

function timeoutLogin()
{
    console.log("body clicked")
    const timerout = setTimeout(backtoLogin, 10000);

    function backtoLogin(){
        window.open('login.html', '_self');
    }
}

function showPass() {
    var x = document.getElementById("user-password-field");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function showPass2() {
var x = document.getElementById("password-field");
if (x.type === "password") {
    x.type = "text";
} else {
    x.type = "password";
}
}

function resetfrm()
{
    document.getElementById("resetform")
}

function resetpass()
{
    var fTEmail = document.getElementById("Email").value;
    var passto = document.getElementById("password-field").value;
    var outBody = document.getElementById("modbod2");
    var fott = document.getElementById("modfoot");

    fetch("https://api.apispreadsheets.com/data/Sb6UWXEOdNLn1GLv/", {
	method: "POST",
	body: JSON.stringify({"data": 
    {"Password": passto},
    //this determines whch row to update
     "query": `select*from26945whereEmail='${fTEmail}'`}),

    }).then(res =>{
	if (res.status === 201){
		// SUCCESS
	}
	else{
		// ERROR
	}
    })
    
    console.log(fTEmail);
    console.log(passto);

    //after updatig the status, success message is shown on the modal body outterModBodyIn
    outBody.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`

    const timerout = setTimeout(loadercircle, 2000);
    
    function loadercircle(){
        //after updatig the status, success message is shown on the modal body outterModBodyIn
        outBody.innerHTML = `<h1 class="text-center">Password has been changed! <br><i class="fa-solid fa-key"></i></h1>`
        fott.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
     };    

}