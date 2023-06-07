/*
Website Currency Calculator
 */

let version: string = "1.0";

// global variables
let inputArr: number[] = [];
let outputArr: number[] = [];
let currency1: string;
let currency2: string;
let exRate: number;

function start(event) {
    // create array for table contents
    let toAdd: number = 1.00;
    for (let i: number = 0; i < 28; i++) {
        if (toAdd < 10) {
            inputArr[i] = toAdd;
            toAdd++;
        } else if (toAdd >= 10 && toAdd < 100) {
            inputArr[i] = toAdd;
            toAdd += 10;
        } else {
            inputArr[i] = toAdd;
            toAdd += 100;
        }
    }
    console.log(document.getElementById("currency_calculator").innerText
        + " ver. " + version + " gestartet.");
}


function calculate(event) {
    event.preventDefault();

    // reset text
    document.getElementById("table_text").innerHTML = "";

    // local variables
    let infoString: string;
    let button_id: string = event.submitter.id;

    if (button_id === "calc") {
        scanInput();
        // calculate results in array
        for (let i: number = 0; i < inputArr.length; i++) {
            outputArr[i] = inputArr[i] * exRate;
        }

    } else if (button_id === "swap") {

        // only if swap is clicked first
        if (currency1 === undefined && currency2 === undefined && exRate === undefined) {
            scanInput();
        }

        // swap currency names
        let memory = currency1;
        currency1 = currency2;
        currency2 = memory;

        // invert exRate
        exRate = 1 / exRate;

        // calculate results in array
        for (let i: number = 0; i < inputArr.length; i++) {
            outputArr[i] = inputArr[i] * exRate;
        }

    }

    console.log("Input: ", currency1, " ", currency2, " ", exRate.toFixed(4));

    // Information Output
    infoString = "Exchange rate from " + currency1 + " to " + currency2 + " is " + exRate.toFixed(4);
    document.getElementById("info").innerText = infoString;

    // create table
    document.getElementById("table_box").innerHTML =
        "<table>" +
            "<thead>" +
                "<tr>" +
                    "<th id='currency1'></th>" +
                    "<th id='currency2'></th>" +
                "</tr>" +
            "</thead>" +
            "<tbody id='tablecontent'></tbody>" +
        "</table>";

    // add currency names to table
    document.getElementById("currency1").innerText = currency1;
    document.getElementById("currency2").innerText = currency2;

    // create table contents
    let counter1: number = 1; // for different table parts
    let counter2: number = 1; // for changing color
    for (let i: number = 0; i < inputArr.length; i++) {
        document.getElementById("tablecontent").innerHTML +=
            "<tr class='table_part-" + counter1 + "-" + counter2 + "'><td>" + inputArr[i].toFixed(2)
            + "</td><td>" + outputArr[i].toFixed(2) + "</td></tr>";
        if (i === 8 || i === 17) {
            counter1++;
        }
        if (counter2 === 1) {
            counter2++;
        } else {
            counter2--;
        }
    }

    // Table text
    document.getElementById("table_text").innerHTML += "<p>Currency Table</p>";
}

// set currency names and exchange rate
function scanInput() {
    currency1 = String((document.getElementById('string1') as HTMLInputElement).value);
    currency2 = String((document.getElementById('string2') as HTMLInputElement).value);
    exRate = Number((document.getElementById('exValue') as HTMLInputElement).value);
}


// event handler
document.addEventListener("DOMContentLoaded", (event) => {
    start(event);
    document.getElementById("form_input").addEventListener("submit", (event) => {
        calculate(event);
    })
})