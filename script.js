const buttonAdd = document.querySelector("#add");
const buttonRemove = document.querySelector("#remove");
let donutAmount = document.querySelector("#donutCurrentAmount");
let donutPrice = document.querySelector("#donutCurrentPrice");

//add donut
buttonAdd.addEventListener('click', function() {
    donutAmount.value = Number(donutAmount.value) + 1;
});

//remove donut
buttonRemove.addEventListener('click', function() {
    if(donutAmount.value > 0) {
        donutAmount.value = Number(donutAmount.value) - 1;
    }
});
