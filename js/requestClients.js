//https://docs.google.com/spreadsheets/d/12zyVnZiBhBMcUBVq1VKuMJEj9z8P7TA4-3cX3b__lKQ/edit?usp=sharing

const sheetId2 = '12zyVnZiBhBMcUBVq1VKuMJEj9z8P7TA4-3cX3b__lKQ';
const base2 = `https://docs.google.com/spreadsheets/d/${sheetId2}/gviz/tq?`;
const sheetName2 = 'Client-information';
const query2 = encodeURIComponent('Select *')
const url2 = `${base2}&sheet=${sheetName2}&tq=${query2}`

//DOM function lisatener
const client = []
document.addEventListener('DOMContentLoaded', init)
 
/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
function init() {
  fetch(url2)
      .then(res => res.text())
      .then(rep => {
          //Remove additional text and extract only JSON:
          const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
          //rows of the data retrieved
          const adminArr = jsonData2.table.rows;
          //=============LOG TO CONSOLE========================//
          //console.log(jsonData2);
          //console.log(adminArr);

          var popcards = document.getElementById("cl_list");

          let nw = [ ];
          let awaitPaymentArr = [ ];

          for (let i = 0; i < adminArr.length; i++) {
        
            var Client_Num = adminArr[i].c[0].v;
            var Name =	adminArr[i].c[1].v;
            var Phone =	adminArr[i].c[2].v;
            var Email =	adminArr[i].c[3].v;
            var Address = adminArr[i].c[4].v;
            var ContactP = adminArr[i].c[5].v;

            //contruction a proper structured array of the data
            nw.push({
                "Client_Num": Client_Num,	
                "Name":	Name,
                "Phone": Phone,	
                "Email": Email,	
                "Address": Address,
                "Contact_Person": ContactP
              });

              popcards.innerHTML += `<div class="col-sm-6">
              <div class="card" style="width: 36rem;">
              <div class="card-header">
                <b>${Client_Num}</b> <br><i class="fa fa-user"></i> Client Name: <b>${Name}</b>
              </div>
              <div class="card-body">
                <h5 class="card-title"><i class="fa-solid fa-phone"></i> <a href="tel:+${Phone}" style="text-decoration:none;">+${Phone}</a>&nbsp;&nbsp;&nbsp; <i class="fa-solid fa-envelope"></i> ${Email}</h5>
                <p class="card-text"><i class="fa-solid fa-location-dot"></i>&nbsp;  ${Address}</p>
                <button type="button" class="btn btn-primary">Details</button>
                <button type="button" class="btn btn-info">Edit <i class="fa fa-pencil"></i></button>
                <button type="button" class="btn btn-danger">Remove client <i class="fa-solid fa-user-slash"></i></button>
              </div>
            </div><div>`;
          } 
         
          
      
      })        
}
