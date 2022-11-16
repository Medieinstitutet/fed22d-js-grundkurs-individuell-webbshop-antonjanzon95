const buttonAdd = document.querySelectorAll('.add');

const buttonRemove = document.querySelectorAll('.remove');

const buttonClear = document.querySelector('#clearOrder');

const donutRows = document.querySelectorAll('.row');

const myCart = document.querySelector('#myCart');

// let shoppingCart = [];

// const allDonutsArray = [
//   {
//     id: 0,
//     name: "Strawberry Donut",
//     price: 15,
//   },
//   {
//     id: 1,
//     name: "Vanilla Donut",
//     price: 10,
//   },
//   {
//     id: 2,
//     name: "Chocolate Donut",
//     price: 15,
//   },
//   {
//     id: 3,
//     name: "Apple Donut",
//     price: 12,
//   },
//   {
//     id: 4,
//     name: "Sugar Donut",
//     price: 8,
//   },
//   {
//     id: 5,
//     name: "Raspberry Donut",
//     price: 13,
//   },
//   {
//     id: 6,
//     name: "Blueberry Donut",
//     price: 14,
//   },
//   {
//     id: 7,
//     name: "Banana Donut",
//     price: 12,
//   },
//   {
//     id: 8,
//     name: "Oreo Donut",
//     price: 20,
//   },
//   {
//     id: 9,
//     name: "Licorice Donut",
//     price: 5,
//   },
// ];

// calculate sum of current donut
function updateSumCurrent(e) {
  const donutPrice = e.querySelector('.donutPrice').textContent;
  const donutAmount = e.querySelector('.donutAmount').textContent;

  const sum = donutAmount * donutPrice;

  e.querySelector('.donutSumPrice').textContent = sum;
}

// calculate sum of all donuts
function updateSumAll() {
  let total = 0;

  for (let i = 0; i < donutRows.length; i++) {
    const currentDonutTotal = Number(
      donutRows[i].querySelector('.donutSumPrice').textContent,
    );

    total += currentDonutTotal;
  }
  document.querySelector('#sumPriceAll').textContent = `Totalt: ${total} kr.`;
}

// add donut to cart
function updateCart() {
  let shoppingCart = [];

  for (let i = 0; i < donutRows.length; i++) {
    const donutCartName = donutRows[i].querySelector('.donutName').textContent;

    const donutCartAmount = Number(
      donutRows[i].querySelector('.donutAmount').textContent,
    );

    const donutCartPrice = Number(
      donutRows[i].querySelector('.donutSumPrice').textContent,
    );

    const donutObject = {donutCartName, donutCartAmount, donutCartPrice};

    if (donutCartAmount > 0) {
      shoppingCart.push(donutObject);
    } else if (donutCartAmount > 1) {
      shoppingCart.donutCartAmount += 1;
      shoppingCart.donutCartPrice += shoppingCart.donutCartPrice;
    }
  }

  //print cart
  myCart.innerHTML = '';

  for (i = 0; i < shoppingCart.length; i++) {
    const donutName = shoppingCart[i].donutCartName;
    const donutAmount = shoppingCart[i].donutCartAmount;
    const donutTotal = shoppingCart[i].donutCartPrice;
    const donutNode = document.createElement('li');
    const donutTextNode = document.createTextNode(donutName);
    const donutAmountNode = document.createTextNode(donutAmount);
    const donutTotalNode = document.createTextNode(donutTotal);

    const trashIcon = document.createElement('button');
    trashIcon.setAttribute('data-name', donutName);
    const trashIconText = document.createTextNode('delete');
    trashIcon.appendChild(trashIconText);

    donutNode.appendChild(donutTextNode);
    donutNode.appendChild(donutAmountNode);
    donutNode.appendChild(donutTotalNode);
    donutNode.appendChild(trashIcon);


    myCart.appendChild(donutNode);

    const donuts = Array.from(document.querySelectorAll('li button'));
    donuts.forEach((item) => {
      item.addEventListener('click', (e) => {
        const clickedDonut = e.target.dataset.name;
        const donut = shoppingCart.find(donutObject => donutObject.name === clickedDonut);
      
        console.log(donut);
      });
    });
  
  }
}

// // remove donut from cart
// function removeFromCart(e) {

// }

// increase donut amount by 1
function increaseDonutAmount(e) {
  const amountEl = e.currentTarget.parentElement.querySelector('.donutAmount');

  const amount = Number(amountEl.textContent);

  amountEl.textContent = amount + 1;

  updateSumCurrent(e.currentTarget.parentElement);
  updateSumAll(e.currentTarget.parentElement);
  updateCart(e.currentTarget.parentElement);
}

// decrease donut amount by 1
function decreaseDonutAmount(e) {
  const amountEl = e.currentTarget.parentElement.querySelector('.donutAmount');

  const amount = Number(amountEl.textContent);

  if (amount < 1) {
    return;
  }

  amountEl.textContent = amount - 1;

  updateSumCurrent(e.currentTarget.parentElement);
  updateSumAll(e.currentTarget.parentElement);
  updateCart(e.currentTarget.parentElement);
}

// add click functions to buttons +/-
for (let i = 0; i < buttonAdd.length; i++) {
  buttonAdd[i].addEventListener('click', increaseDonutAmount);
  buttonRemove[i].addEventListener('click', decreaseDonutAmount);
}

// clear checkout form
function clearOrder() {
  const checkoutForm = document.querySelector('#checkoutForm');
  // also add items in shopping cart here
  // also clear items from shopping cart here

  checkoutForm.reset();
}

// add click function to clear form button
buttonClear.addEventListener('click', clearOrder);


// // print cart
// function printCart() {
//   myCart.innerHTML = '';

//   for (i = 0; i < shoppingCart.length; i++) {
//     const donutName = shoppingCart[i].donutCartName;
//     const donutAmount = shoppingCart[i].donutCartAmount;
//     const donutTotal = shoppingCart[i].donutCartPrice;
//     const donutNode = document.createElement('li');
//     const donutTextNode = document.createTextNode(donutName);
//     const donutAmountNode = document.createTextNode(donutAmount);
//     const donutTotalNode = document.createTextNode(donutTotal);

//     const trashIcon = document.createElement('button');
//     trashIcon.setAttribute('data-name', donutName);
//     const trashIconText = document.createTextNode('delete');
//     trashIcon.appendChild(trashIconText);

//     donutNode.appendChild(donutTextNode);
//     donutNode.appendChild(donutAmountNode);
//     donutNode.appendChild(donutTotalNode);
//     donutNode.appendChild(trashIcon);


//     myCart.appendChild(donutNode);
//   }


// // activate submit button
// function activateSubmit() {

// }

//   // for (let i = 0; i < donutRows.length; i++) {
//   //   let cartName = '';
//   //   let cartAmount = 0;
//   //   let cartPrice = 0;

//   //   const donutCartName = donutRows[i].querySelector('.donutName').textContent;

//   //   const donutCartAmount = Number(
//   //     donutRows[i].querySelector('.donutAmount').textContent,
//   //   );

//   //   const donutCartPrice = Number(
//   //     donutRows[i].querySelector('.donutSumPrice').textContent,
//   //   );

//   //   cartName += donutCartName;

//   //   cartAmount += donutCartAmount;

//   //   cartPrice += donutCartPrice;

//   //   if (cartAmount > 0) {
//   //       cartEl.innerHTML += `${cartAmount}st ${cartName} - Totalt ${cartPrice}kr.<br>`;
//   //     }
//   // }
// }
