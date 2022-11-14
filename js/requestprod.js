//global var
var productDiv = document.getElementById("prod_List");
var apiBase = "https://sheets.googleapis.com";

//https://docs.google.com/spreadsheets/d/1fpQMtNFWrPtuwMH2rtnfGCea7vmwl6CAwnGZXVcYrOU/edit?usp=sharing
const sheetid2 = '1fpQMtNFWrPtuwMH2rtnfGCea7vmwl6CAwnGZXVcYrOU';
const Base2 = `https://docs.google.com/spreadsheets/d/${sheetid2}/gviz/tq?`;
const SheetName2 = 'Products - info';
const Query2 = encodeURIComponent('Select *')
const Url2 = `${Base2}&sheet=${SheetName2}&tq=${Query2}`

//DOM function lisatener
const products = []
document.addEventListener('DOMContentLoaded', init, popmodal, findprdToDel, calculatetot)

/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
function init() {
    fetch(Url2)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
            //rows of the data retrieved
            const prodArr = jsonData2.table.rows;
            //=============LOG TO CONSOLE========================//
            //console.log(jsonData2);
            //console.log(prodArr);

            let nw = [];



            for (let i = 0; i < prodArr.length; i++) {

                var Prd_Code = prodArr[i].c[0].v;
                var Product = prodArr[i].c[1].v;
                var SellingP = prodArr[i].c[2].v;
                var WaterpreneurP = prodArr[i].c[3].v;
                var wholesaleP = prodArr[i].c[4].v;
                var packSize = prodArr[i].c[5].v;
                var PalletSize = prodArr[i].c[6].v;
                var imgUrl = prodArr[i].c[7].v;
                var stockLevel = prodArr[i].c[8].v;



                //contruction a proper structured array of the data
                nw.push({
                    "Prd_Code": Prd_Code,
                    "Product": Product,
                    "Selling_Price": SellingP,
                    "Waterpreneur_Price": WaterpreneurP,
                    "wholesale_Price": wholesaleP,
                    "Pack_Size": packSize,
                    "Pallet_Size": PalletSize,
                    "img_url": imgUrl,
                    "StockLevel": stockLevel
                });


                try {
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
                <h4> Units in Stock: <b>${stockLevel}</b></h4>
                <hr>
                <button type="button" id="${Prd_Code}" onclick="popmodal(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#prodCenter" >Details <i class="fa-solid fa-angles-right"></i></button>
                <button type="button" id="De${Prd_Code}" onclick="findprdToDel(this.id)" class="btn btn-danger" data-toggle="modal" data-target="#prodDelCenter" >Delete Product <i class="fa-solid fa-trash-can"></i></button>
            </div>
            </div></div>`;

                }
                catch {
                    //
                }

                try {
                    var stkdiv = document.getElementById("Stock");
                    stkdiv.innerHTML += `<p>${Product.replace('Designer Alkaline water', ' ')}: <span class="alnright"><b style="font-size: 18px">${stockLevel}</b></p><span`;
                }
                catch {
                    //
                }
            }



        })
}

function popmodal(btnideclick) {

    var idnum = btnideclick;

    fetch(Url2)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
            //rows of the data retrieved
            const prodArr = jsonData2.table.rows;
            //=============LOG TO CONSOLE========================//
            //console.log(jsonData2);
            //console.log(prodArr);

            let nw = [];

            //check selected values in client add form /existing client
            var titprd = document.getElementById("mdtitprd");
            var mdetprd = document.getElementById("modprd");
            var ftdetprd = document.getElementById("footprd");


            for (let i = 0; i < prodArr.length; i++) {

                var Prd_Code = prodArr[i].c[0].v;
                var Product = prodArr[i].c[1].v;
                var SellingP = prodArr[i].c[2].v;
                var WaterpreneurP = prodArr[i].c[3].v;
                var wholesaleP = prodArr[i].c[4].v;
                var packSize = prodArr[i].c[5].v;
                var PalletSize = prodArr[i].c[6].v;
                var imgUrl = prodArr[i].c[7].v;
                var stockLevel = prodArr[i].c[8].v;



                //contruction a proper structured array of the data
                nw.push({
                    "Prd_Code": Prd_Code,
                    "Product": Product,
                    "Selling_Price": SellingP,
                    "Waterpreneur_Price": WaterpreneurP,
                    "wholesale_Price": wholesaleP,
                    "Pack_Size": packSize,
                    "Pallet_Size": PalletSize,
                    "img_url": imgUrl,
                    "StockLevel": stockLevel
                });

                try {
                    if (idnum == Prd_Code) {
                        titprd.innerHTML = `${Product}`;
                        mdetprd.innerHTML = `
                <h4 class="card-text"><b><i class="fa-solid fa-tags redicon"></i> Prices:</b> (per case)</h4>
                    <p>Wholesale Price: <b>${wholesaleP}</b></p>
                    <p>Retail Price: <b>${SellingP}</b></p>
                    <p>Waterpreneur Price: <b>${WaterpreneurP}</b></p>
                    <hr>
                    <h4 class="card-text"><b><i class="fa-solid fa-box-archive goldenicon"></i> Packages</b></h4>
                    <p><i class="fa-solid fa-boxes-stacked"></i> Case/Box Qty: <b>${packSize}</b></p>
                    <p><i class="fa-solid fa-box"></i> Pallet Size: <b>${PalletSize}</b></p>
                    <hr>
                    <h4 class="card-text"><b><i class="fa-solid fa-warehouse"></i> Units in Stock</b></h4>
                    <p><i class="fa-solid fa-boxes-stacked"></i> Units: <b>${stockLevel}</b></p>`;
                    }
                } catch {

                }

                try {
                    var xitm = document.getElementById("StkLevels");
                    xitm.innerHTML += `<option>${Product}</option>`;

                } catch {

                }
            }
        })
}



function findprdToDel(idOfPrd) {
    let clickedprd = idOfPrd.replace('De', '');

    var modTItle = document.getElementById("prdDelTitle");
    //var prdToDel =document.getElementById("").innerHTML;
    var bodyprd = document.getElementById("modprdDel");


    fetch(Url2)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
            //rows of the data retrieved
            const prodArr = jsonData2.table.rows;
            //=============LOG TO CONSOLE========================//
            //console.log(jsonData2);
            //console.log(prodArr);

            let nw = [];

            //check selected values in client add form /existing client



            for (let i = 1; i < prodArr.length; i++) {
                var Prd_Code = prodArr[i].c[0].v;
                var Product = prodArr[i].c[1].v;
                var SellingP = prodArr[i].c[2].v;
                var WaterpreneurP = prodArr[i].c[3].v;
                var wholesaleP = prodArr[i].c[4].v;
                var packSize = prodArr[i].c[5].v;
                var PalletSize = prodArr[i].c[6].v;
                var imgUrl = prodArr[i].c[7].v;
                var stockLevel = prodArr[i].c[8].v;

                //contruction a proper structured array of the data
                nw.push({
                    "Prd_Code": Prd_Code,
                    "Product": Product,
                    "Selling_Price": SellingP,
                    "Waterpreneur_Price": WaterpreneurP,
                    "wholesale_Price": wholesaleP,
                    "Pack_Size": packSize,
                    "Pallet_Size": PalletSize,
                    "img_url": imgUrl,
                    "StockLevel": stockLevel
                });

                if (clickedprd == Prd_Code) {
                    modTItle.innerHTML = `<h4 id="prodNameDel">${Product}</h4>` + `<span><i class="fa-solid fa-barcode"></i><p id="prodthatDel">${Prd_Code}</p></span>`;
                    bodyprd.innerHTML = `<p>Are you sure you want to delete this product?</p>`;

                }
            }


        })
}

function Deleteprd() {

    var prdtoDel = document.getElementById("prodthatDel").innerHTML;
    //console.log(prdtoDel);

    //https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}
    //https://docs.google.com/spreadsheets/d/1fpQMtNFWrPtuwMH2rtnfGCea7vmwl6CAwnGZXVcYrOU/edit?usp=sharing

    var sheetid = "1fpQMtNFWrPtuwMH2rtnfGCea7vmwl6CAwnGZXVcYrOU";
    var sheetname = "Products - info";
    var range = `${sheetname}!A8:I8`;
    var method = `/v4/spreadsheets/${sheetid}/values/${range}:clear`;
    var finURL = apiBase + method;
    console.log(finURL);


    /*fetch(finURL)
      .then(res=>{
        if (res.status === 200){
          // SUCCESS
        }
        else{
          // ERROR
        }
      });*/

    //oaderDelprd();
}

function loaderDelprd() {
    var prdBodyd = document.getElementById("modprdDel");
    var fotprdd = document.getElementById("footprdDel");
    var headerprdd = document.getElementById("prdDelTitle");
    var prddelcode = document.getElementById("prodNameDel").innerHTML;

    prdBodyd.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`;
    headerprdd.innerHTML = `<i class="fa-solid fa-trash-can"></i> &nbsp; Deleting... `;

    const timo = setTimeout(loadcircle, 2000);

    function loadcircle() {
        //after updatig the status, success message is shown on the modal body outterModBodyIn
        prdBodyd.innerHTML = `<h4 class="text-center">Client: ${prddelcode} Has been Deleted!<br><br><center><i class="fa-solid fa-trash-can redicon"></center></h4>`
        fotprdd.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
        headerprdd.innerHTML = `Product Deleted. &nbsp;<i class="fa-solid fa-trash-can redicon"></i>`;
    };
}

//add new product
//https://script.google.com/macros/s/AKfycby-NKu0EPly8XfUKY9YBU_f8XZC0h5ydE_AA8kPkVFnQuB67S7pFe5UdHTh86PUsZAz/exec
try {
    const sURL = 'https://script.google.com/macros/s/AKfycby-NKu0EPly8XfUKY9YBU_f8XZC0h5ydE_AA8kPkVFnQuB67S7pFe5UdHTh86PUsZAz/exec'
    const form = document.forms['submitPrd']

    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(sURL, { method: 'POST', body: new FormData(form) })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))

        addprdfn();
    })
}
catch {
    //your error code here
}

function addprdfn() {
    var prdBody = document.getElementById("modprdAdd");
    var fotprd = document.getElementById("footprdAdd");
    var headerprd = document.getElementById("prdaddTitle");
    var prdAdded = document.getElementById("prdctName").value;
    //after updatig the status, success message is shown on the modal body outterModBodyIn

    prdBody.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`;
    headerprd.innerHTML = `<i class="fa fa-plus"></i> &nbsp; Adding... `;

    const tim = setTimeout(loadcircle, 2000);

    function loadcircle() {
        //after updatig the status, success message is shown on the modal body outterModBodyIn
        prdBody.innerHTML = `<h4 class="text-center">Client: ${prdAdded} Has been Added!<br><br><center><i class="fa-solid fa-file-circle-plus"></i></center></h4>`
        fotprd.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
        headerprd.innerHTML = `Product added. &nbsp;<i class="fa-solid fa-file-circle-plus"></i>`;
    };
}



function calculatetot() {
    //calculatin totals for adding a product
    var InvoiceTotal = document.getElementById("Invoice Total");
    var ml300input = document.getElementById("300mlinput").value;
    var ml500input = document.getElementById("500mlinput").value;
    var ml750input = document.getElementById("750mlinput").value;
    var Ltr1input = document.getElementById("1linput").value;
    var Ltr5input = document.getElementById("5linput").value;
    var priceused = document.getElementById("Prices used").value;

    fetch(Url2)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
            //rows of the data retrieved
            const prodArr = jsonData2.table.rows;
            //=============LOG TO CONSOLE========================//
            //console.log(jsonData2);
            //console.log(prodArr);
            let nw = [];
            let priceArr = [];

            for (let i = 0; i < prodArr.length; i++) {
                var Prd_Code = prodArr[i].c[0].v;
                var Product = prodArr[i].c[1].v;
                var SellingP = prodArr[i].c[2].v;
                var WaterpreneurP = prodArr[i].c[3].v;
                var wholesaleP = prodArr[i].c[4].v;
                var packSize = prodArr[i].c[5].v;
                var PalletSize = prodArr[i].c[6].v;
                var imgUrl = prodArr[i].c[7].v;
                var stockLevel = prodArr[i].c[8].v;

                //contruction a proper structured array of the data
                nw.push({
                    "Prd_Code": Prd_Code,
                    "Product": Product,
                    "Selling_Price": SellingP,
                    "Waterpreneur_Price": WaterpreneurP,
                    "wholesale_Price": wholesaleP,
                    "Pack_Size": packSize,
                    "Pallet_Size": PalletSize,
                    "img_url": imgUrl,
                    "StockLevel": stockLevel
                });



                if (priceused == "Selling Price") {
                    var n = Number(SellingP.replace('R', ' '));

                    priceArr.push(
                        {
                            "Price": n.toFixed(2)
                        });
                }
                else if (priceused == "Wholesale Price") {
                    var n = Number(wholesaleP.replace('R', ' '));

                    priceArr.push(
                        {
                            "Price": n.toFixed(2)
                        });
                }
                else if (priceused == "Waterpreneur Price") {
                    var n = Number(WaterpreneurP.replace('R', ' '));


                    priceArr.push(
                        {
                            "Price": n.toFixed(2)
                        });
                }
                else if (priceused == "Registration") {
                    console.log("this is registration")
                }

            }

            //console.log(priceArr);


            try {
                //do final calculation
                var p = ml300input * priceArr[0].Price;
                var q = ml500input * priceArr[1].Price;
                var r = ml750input * priceArr[2].Price;
                var s = Ltr1input * priceArr[4].Price;
                var t = Ltr5input * priceArr[5].Price;
            }
            catch {
                //erro here
            }

            var totalPrice = p + q + r + s + t;
            //console.log(totalPrice.toFixed(2));

            InvoiceTotal.value = totalPrice.toFixed(2);

        })
}

try {
    document.getElementById("Prices used").addEventListener('change', function () {
        calculatetot();
    });
}
catch {
    //
}