const buttonAdd = document.querySelectorAll(".add");
const buttonRemove = document.querySelectorAll(".remove");
let donutAmount = document.querySelectorAll(".donutCurrentAmount");
let donutCurrentPrice = document.querySelectorAll(".donutCurrentPrice");
let totalPrice = document.querySelector("#totalPriceAll");
let donutPrice = document.querySelectorAll(".donutPrice");
const rows = document.querySelectorAll(".row");



totalPrice.textContent = `Totalt: 0kr`;
let totalAll = 0;

//add donut & calculate total price
for (let i = 0; i < buttonAdd.length; i++) {
    buttonAdd[i].addEventListener('click', function() {
        donutAmount[i].value = Number(donutAmount[i].value) + 1;
        donutCurrentPrice[i].value = Number(donutPrice[i].textContent) * Number(donutAmount[i].value);
        totalAll += Number(donutPrice[i].textContent);
        totalPrice.textContent = `Totalt: ${Number(totalAll)}kr`;
    })
}


//remove donut & calculate total price
for (let i = 0; i < buttonRemove.length; i++) {
    buttonRemove[i].addEventListener('click', function() {
        if (donutAmount[i].value > 0) {
            donutAmount[i].value = Number(donutAmount[i].value) - 1;
        }
        donutCurrentPrice[i].value = Number(donutPrice[i].textContent) * Number(donutAmount[i].value);
        totalAll -= Number(donutPrice[i].textContent);
        totalPrice.textContent = `Totalt: ${Number(totalAll)}kr`;
    })
}


//Uppdatera totalen
// totalPrice.textContent = `Totalt: ${/*Här ska det vara en sammanställning av alla munkars priser adderade*/}kr`;


/*
//Test
class Donut {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

let strawberryDonut = new Donut("Jordgubb", 15);
let vanillaDonut = new Donut("Vanilj", 10);
let chocolateDonut = new Donut("Choklad", 15);


allDonuts = [strawberryDonut, vanillaDonut, chocolateDonut];


for(let i = 0; i < allDonuts.length; i++) {
    rows[i].donutCurrentPrice = allDonuts[i].price;
    console.log(donutCurrentPrice);
}
*/

/* Sort
- Få select värdet
- Loopa genom array av objekten
- Sortera med .sort()
*/


