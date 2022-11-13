const buttonAdd = document.querySelectorAll(".add");
const buttonRemove = document.querySelectorAll(".remove");


//increase donut amount by 1
function increaseDonutAmount(e) {
    const amountEl = e.currentTarget.parentElement.querySelector(".donutAmount");

    let amount = Number(amountEl.textContent);

    amountEl.textContent = amount + 1;

    updateSumCurrent(e.currentTarget.parentElement);
    updateSumAll(e.currentTarget.parentElement);
}

//decrease donut amount by 1
function decreaseDonutAmount(e) {
    const amountEl = e.currentTarget.parentElement.querySelector(".donutAmount");

    let amount = Number(amountEl.textContent);

    if(amount < 1) {
        return;
    }

    amountEl.textContent = amount - 1;

    updateSumCurrent(e.currentTarget.parentElement);
    updateSumAll(e.currentTarget.parentElement);
}

//calculate sum of current donut
function updateSumCurrent (e) {
    const donutPrice = e.querySelector(".donutPrice").textContent;
    const donutAmount = e.querySelector(".donutAmount").textContent;

    const sum = donutAmount * donutPrice;

    e.querySelector(".donutSumPrice").textContent = sum;
}

//calculate sum of all donuts
function updateSumAll () {
    const donutRows = document.querySelectorAll(".row");
    let total = 0;

    for (let i = 0; i < donutRows.length; i++) {
        const currentDonutTotal = Number(donutRows[i].querySelector(".donutSumPrice").textContent);

        total = total + currentDonutTotal;
    }
    document.querySelector("#sumPriceAll").textContent = "Totalt: " + total + "kr."
}

//add click functions to buttons +/-
for (let i = 0; i < buttonAdd.length; i++) {
    buttonAdd[i].addEventListener('click', increaseDonutAmount);
    buttonRemove[i].addEventListener('click', decreaseDonutAmount);
}

