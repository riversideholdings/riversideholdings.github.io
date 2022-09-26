
//==============get expenses=================================//
//https://docs.google.com/spreadsheets/d/1HM06cmnOAP4VaRQCVYKlFhiuOZN05ho7ADGOjUZ0eTM/edit?usp=sharing
const sheetId3 = '1HM06cmnOAP4VaRQCVYKlFhiuOZN05ho7ADGOjUZ0eTM';
const base3 = `https://docs.google.com/spreadsheets/d/${sheetId3}/gviz/tq?`;
const sheetName3 = 'Expenses';
const query3 = encodeURIComponent('Select *')
const url3 = `${base3}&sheet=${sheetName3}&tq=${query3}`

//DOM function lisatener
const data3 = []
document.addEventListener('DOMContentLoaded', init)

/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
function init() {
    fetch(url3)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            //rows of the data retrieved
            const expenseArr = jsonData.table.rows;
            //=============LOG TO CONSOLE========================//
            //console.log(jsonData);
            //console.log(expenseArr);

            var salaries = document.getElementById("tbody-Salaries");
            var expenses = document.getElementById("tbody-Stock");
            var expTotal = document.getElementById("total-col");
            var expTotal2 = document.getElementById("total-col2");
            var Allep = document.getElementById("allExpTotal");
            var Allepblk = document.getElementById("allExpTotal-blk");
            var xval = parseFloat(localStorage.getItem("income"));
            var Tunpaid = parseFloat(localStorage.getItem("unpaidAmnts"))
            var totalincome = document.getElementById("totalin");
            var totalprofits = document.getElementById("fprofits");
            var esimatedProfits = document.getElementById("estProfit");

            let arrex = [];
            var totalcol = 0;

            for (let i = 0; i < expenseArr.length; i++) {


                var Date = expenseArr[i].c[0].v;
                var desc = expenseArr[i].c[1].v;
                var amnt = expenseArr[i].c[2].v;
                var classification = expenseArr[i].c[3].v;


                //contruction a proper structured array of the data

                arrex.push({
                    "Date": Date,
                    "Desc": desc,
                    "Amount": parseFloat(amnt.toFixed(2)),
                    "classification": classification,
                });

                if (classification == "salary") {

                    salaries.innerHTML += `
                    <tr>
                        <td>${Date}</td>
                        <td>${desc}</td>
                        <td>R ${amnt.toFixed(2)}</td>
                    </tr>`
                    totalcol = amnt++;

                }

                if (classification == "expense") {

                    expenses.innerHTML += `
                    <tr>
                        <td>${Date}</td>
                        <td>${desc}</td>
                        <td>R ${amnt.toFixed(2)}</td>
                    </tr>`
                    totalcol = amnt++;
                }

            }

            

            var x,y;

                //december
                x = arrex.filter(function (expense, index) {
                    if (expense.classification == "salary")
                    return true;
                });
                const sal = x.reduce((accumulator, object) => {
                    return accumulator + object.Amount;
                }, 0);

                //december
                y = arrex.filter(function (expense, index) {
                    if (expense.classification == "expense")
                    return true;
                });
                const expn = y.reduce((accumulator, object) => {
                    return accumulator + object.Amount;
                }, 0);

         
            expTotal.innerHTML = "R " +expn.toFixed(2);
            expTotal2.innerHTML = "R " +sal.toFixed(2);
            var a = expn+sal;
            Allep.innerText = "Total Expenses: R " + a.toFixed(2);
            Allepblk.innerHTML = `Total Expenses: <b>R ${a.toFixed(2)}</b>`;
            var calulate = xval.toFixed(2)-a.toFixed(2);
            totalprofits.innerHTML = `Total Realtime Profits: <b>R ${calulate.toFixed(2)}</b>`;
            
            var estCalculate = calulate + Tunpaid;
            esimatedProfits.innerHTML = `Est. Profit: <b>R ${estCalculate.toFixed(2)}</b>
            `;
            
            if(xval = NaN){
                window.location.reload(true);
            }

            if(estCalculate = NaN){
                window.location.reload(true);
            }

        })

}