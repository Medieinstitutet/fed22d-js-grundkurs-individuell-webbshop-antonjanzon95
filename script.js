const buttonAdd = document.querySelector("#add");
const buttonRemove = document.querySelector("#remove");
let donutAmount = document.querySelector("#donutCurrentAmount");
let donutPrice = document.querySelector("#donutCurrentPrice");
let totalPrice = document.querySelector("#totalPriceAll")
const rows = document.querySelectorAll(".row")



totalPrice.textContent = 'Totalt: 0kr';


let strawberryPrice = 15;


//add donut & calculate total
buttonAdd.addEventListener('click', function() {
    donutAmount.value = Number(donutAmount.value) + 1;
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
    rows[i].donutPrice = allDonuts[i].price;
    console.log(donutPrice);
}


/* Sort
- Få select värdet
- Loopa genom array av objekten
- Sortera med .sort()
*/


