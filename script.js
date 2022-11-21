/* eslint-disable no-plusplus */
const buttonClear = document.querySelector('#clearOrder');

const cart = document.querySelector('#cart');

const donutContainer = document.querySelector('#donuts');

// array of all donuts
const donuts = [
  {
    name: 'Jordgubb',
    price: 15,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Vanilj',
    price: 10,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Choklad',
    price: 15,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Äpple',
    price: 12,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Socker',
    price: 8,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Hallon',
    price: 13,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Blåbär',
    price: 14,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Banan',
    price: 12,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Oreo',
    price: 20,
    rating: 4,
    amount: 0,
  },
  {
    name: 'Lakrits',
    price: 5,
    rating: 4,
    amount: 0,
  },
];

// render all donuts
function renderDonuts() {
  donutContainer.innerHTML = '';
  for (let i = 0; i < donuts.length; i++) {
    const total = donuts[i].amount * donuts[i].price;
    donutContainer.innerHTML += `
    <article>
      <h3>${donuts[i].name} - <span class="price">${donuts[i].price}</span> kr</h3>
      Antal: ${donuts[i].amount} st <br>
      Totalt: ${total} kr
      <button class="add" data-id="${i}">+</button>
      <button class="remove" data-id="${i}">-</button>
    </article>
    `;
  }

  // add event listeners to each button
  document.querySelectorAll('.add').forEach((btn) => {
    btn.addEventListener('click', addDonut);
  });
  document.querySelectorAll('.remove').forEach((btn) => {
    btn.addEventListener('click', removeDonut);
  });
  renderCart();
}

// add donuts
function addDonut(e) {
  const clickedDonut = e.currentTarget.dataset.id;
  donuts[clickedDonut].amount += 1;
  renderDonuts();
}

// remove donuts
function removeDonut(e) {
  const clickedDonut = e.currentTarget.dataset.id;
  if (donuts[clickedDonut].amount > 0) {
    donuts[clickedDonut].amount -= 1;
  }
  renderDonuts();
}

renderDonuts();

function renderCart() {
  cart.innerHTML = '';
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      cart.innerHTML += `
        <span>${donuts[i].name}</span> <span>${donuts[i].amount}st</span> <span>${donuts[i].price * donuts[i].amount}kr</span><br>
      `;
    }
  }
  // calculate sum of all ordered donuts
  const sum = donuts.reduce(
    (previousValue, donut) => (donut.amount * donut.price) + previousValue,
    0,
  );
  cart.innerHTML += `Totalt ${sum} kr.`;
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
