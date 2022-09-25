
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

            var salaries = document.getElementById("tbody-Salaries")
            var expenses = document.getElementById("tbody-Stock")



            let arrex = [];


            for (let i = 0; i < expenseArr.length; i++) {


                var Date = expenseArr[i].c[0].v;
                var desc = expenseArr[i].c[1].v;
                var amnt = expenseArr[i].c[2].v;
                var classification = expenseArr[i].c[3].v;


                //contruction a proper structured array of the data

                arrex.push({
                    "Date": Date,
                    "Desc": desc,
                    "Amount": amnt,
                    "classification": classification,
                });

                if (classification == "salary") {

                    salaries.innerHTML += `
                    <tr>
                        <td>${Date}</td>
                        <td>${desc}</td>
                        <td>R ${amnt.toFixed(2)}</td>
                    </tr>`

                }

                if (classification == "expense") {

                    expenses.innerHTML += `
                    <tr>
                        <td>${Date}</td>
                        <td>${desc}</td>
                        <td>R ${amnt.toFixed(2)}</td>
                    </tr>`

                }


            }

        })

}