const buttonAdd = document.querySelector("#add");
const buttonRemove = document.querySelector("#remove");
let donutAmount = document.querySelector("#donutCurrentAmount");
let donutPrice = document.querySelector("#donutCurrentPrice");
let totalPrice = document.querySelector("#totalPriceAll")

const strawberryPrice = 15;

//add donut
buttonAdd.addEventListener('click', function() {
    donutAmount.value = Number(donutAmount.value) + 1;
    donutPrice.value = Number(donutPrice.value) + strawberryPrice;
});

//remove donut
buttonRemove.addEventListener('click', function() {
    if(donutAmount.value > 0) {
        donutAmount.value = Number(donutAmount.value) - 1;
        donutPrice.value = Number(donutPrice.value) - strawberryPrice;
    }
});
