
//my data 
const myquery = encodeURIComponent('Select *')
const mySheeturl = `https://docs.google.com/spreadsheets/d/1wfscnlJw7PPJshIdxVhW596dnbgNTG_EsZUdC707St4/gviz/tq?&sheet=All-Payments&tq=${myquery}`;

const Pdata = []

document.addEventListener('DOMContentLoaded', init)


function init() {
    fetch(mySheeturl)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            //rows of the data retrieved
            const payArr = jsonData.table.rows;
            //console.log(jsonData);

            let PArr = [];
            var pDate, pDescr, pAmount, pClientID;




            for (let i = 0; i < payArr.length; i++) {

                pDate = payArr[i].c[0].f;
                pDescr = payArr[i].c[1].v;
                pAmount = payArr[i].c[2].v;
                pClientID = payArr[i].c[3].v;

                PArr.push({
                    "Date": pDate,
                    "Description": pDescr,
                    "Amount": pAmount,
                    "Client_ID": pClientID
                });
            }

                var clId = localStorage.getItem("ClientID");
                var TotalPaidTb = document.getElementById("totPaid");

                //find only the clients payments
                var findClsPayments = PArr.filter(function (paymentP, index) {
                    if (paymentP.Client_ID == clId)
                        return true;
                });

                //add all the clients payments
                const clsPayments = findClsPayments.reduce((accumulator, object) => {
                    return accumulator + object.Amount;
                }, 0);

                localStorage.setItem("ClientsPayment", clsPayments)
               
                TotalPaidTb.innerHTML = "R " + clsPayments.toFixed(2);
            

        })
        
}
