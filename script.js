const buttonAdd = document.querySelector("#add");
const buttonRemove = document.querySelector("#remove");
let donutAmount = document.querySelector("#donutCurrentAmount");
let donutPrice = document.querySelector("#donutCurrentPrice");
let totalPrice = document.querySelector("#totalPriceAll")

const strawberryPrice = 15;

totalPrice.textContent = 'Totalt: 0kr';

//add donut & calculate total
buttonAdd.addEventListener('click', function() {
    donutAmount.value = Number(donutAmount.value) + 1;
    //Detta bör appendas till en array där man kan räkna ut totalen för alla munkar ifrån?
    donutPrice.value = Number(donutPrice.value) + strawberryPrice;
    totalPrice.textContent = `Totalt: ${donutPrice.value}kr`;
});

//remove donut & calculate total
buttonRemove.addEventListener('click', function() {
    if (donutAmount.value > 0) {
        donutAmount.value = Number(donutAmount.value) - 1;
        //Detta bör appendas till en array där man kan räkna ut totalen för alla munkar ifrån?
        donutPrice.value = Number(donutPrice.value) - strawberryPrice;
        totalPrice.textContent = `Totalt: ${donutPrice.value}kr`;
    }
});
