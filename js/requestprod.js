//global var
var productDiv = document.getElementById("prod_List");

//https://docs.google.com/spreadsheets/d/1fpQMtNFWrPtuwMH2rtnfGCea7vmwl6CAwnGZXVcYrOU/edit?usp=sharing
const sheetId2 = '1fpQMtNFWrPtuwMH2rtnfGCea7vmwl6CAwnGZXVcYrOU';
const base2 = `https://docs.google.com/spreadsheets/d/${sheetId2}/gviz/tq?`;
const sheetName2 = 'Products - info';
const query2 = encodeURIComponent('Select *')
const url2 = `${base2}&sheet=${sheetName2}&tq=${query2}`

//DOM function lisatener
const client = []
document.addEventListener('DOMContentLoaded', init,popmodal)
 
/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
function init(){
    fetch(url2)
    .then(res => res.text())
    .then(rep => {
        //Remove additional text and extract only JSON:
        const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
        //rows of the data retrieved
        const prodArr = jsonData2.table.rows;
        //=============LOG TO CONSOLE========================//
        //console.log(jsonData2);
        //console.log(prodArr);

        let nw = [ ];

       

        for (let i = 1; i < prodArr.length; i++) {
      
          var Prd_Code = prodArr[i].c[0].v;
          var Product =	prodArr[i].c[1].v;
          var SellingP =	prodArr[i].c[2].v;
          var WaterpreneurP =	prodArr[i].c[3].v;
          var wholesaleP = prodArr[i].c[4].v;
          var packSize = prodArr[i].c[5].v;
          var PalletSize= prodArr[i].c[6].v;
          var imgUrl = prodArr[i].c[7].v;

          

          //contruction a proper structured array of the data
          nw.push({
                "Prd_Code":	Prd_Code,
                "Product": Product,	
                "Selling_Price": SellingP,	
                "Waterpreneur_Price": WaterpreneurP,	
                "wholesale_Price": wholesaleP,
                "Pack_Size": packSize,
                "Pallet_Size": PalletSize,
                "img_url": imgUrl
            });

            
            try{
            productDiv.innerHTML += `<div class="col-sm-6">
            <div class="card" style="width: 35rem; font-family:'Times New Roman', Times, serif;">
            <img src="${imgUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title"> ${Product}</h4>
                <hr>
                <h5 class="card-text"><b><i class="fa-solid fa-tags"></i> Prices:</b></h5>
                <p>Wholesale Price: <b>${wholesaleP}</b></p>
                <p>Retail Price: <b>${SellingP}</b></p>
                <p>Waterpreneur Price: <b>${WaterpreneurP}</b></p>
                <hr>
                <button type="button" id="${Prd_Code}" onclick="popmodal(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#prodCenter" >Details <i class="fa-solid fa-angles-right"></i></button>
            </div>
            </div></div>`;

            }
            catch{
                //
            }
        }

      

    })        
}

function popmodal(btnideclick){

    var idnum = btnideclick;

    fetch(url2)
    .then(res => res.text())
    .then(rep => {
        //Remove additional text and extract only JSON:
        const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
        //rows of the data retrieved
        const prodArr = jsonData2.table.rows;
        //=============LOG TO CONSOLE========================//
        //console.log(jsonData2);
        //console.log(prodArr);

        let nw = [ ];

         //check selected values in client add form /existing client
         var titprd = document.getElementById("mdtitprd");
         var mdetprd = document.getElementById("modprd");
         var ftdetprd = document.getElementById("footprd");
         

        for (let i = 1; i < prodArr.length; i++) {
      
          var Prd_Code = prodArr[i].c[0].v;
          var Product =	prodArr[i].c[1].v;
          var SellingP =	prodArr[i].c[2].v;
          var WaterpreneurP =	prodArr[i].c[3].v;
          var wholesaleP = prodArr[i].c[4].v;
          var packSize = prodArr[i].c[5].v;
          var PalletSize= prodArr[i].c[6].v;
          var imgUrl = prodArr[i].c[7].v;

          

          //contruction a proper structured array of the data
          nw.push({
                "Prd_Code":	Prd_Code,
                "Product": Product,	
                "Selling_Price": SellingP,	
                "Waterpreneur_Price": WaterpreneurP,	
                "wholesale_Price": wholesaleP,
                "Pack_Size": packSize,
                "Pallet_Size": PalletSize,
                "img_url": imgUrl
            });

           if(idnum == Prd_Code){
            titprd.innerHTML = `${Product}`;
           }
            
        }

      

    })        
}