/* eslint-disable no-plusplus */
const buttonClear = document.querySelector('#clearOrder');
const cart = document.querySelector('#cart');
const donutContainer = document.querySelector('#donuts');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const postalCode = document.querySelector('#postalCode');
const locality = document.querySelector('#locality');
const doorCode = document.querySelector('#doorCode');
const phoneNumber = document.querySelector('#phoneNumber');
const email = document.querySelector('#email');
const discountCode = document.querySelector('#discountCode');
const sortBy = document.querySelector('#sortBy');

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
    rating: 5,
    amount: 0,
  },
  {
    name: 'Choklad',
    price: 15,
    rating: 5,
    amount: 0,
  },
  {
    name: 'Äpple',
    price: 12,
    rating: 2,
    amount: 0,
  },
  {
    name: 'Socker',
    price: 8,
    rating: 3,
    amount: 0,
  },
  {
    name: 'Hallon',
    price: 13,
    rating: 3,
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
    rating: 3,
    amount: 0,
  },
  {
    name: 'Oreo',
    price: 20,
    rating: 5,
    amount: 0,
  },
  {
    name: 'Lakrits',
    price: 5,
    rating: 1,
    amount: 0,
  },
];

// sort donuts
function sortDonuts() {
  if (sortBy.value === 'nameDonut') {
    donuts.sort((donut1, donut2) => {
      if (donut1.name < donut2.name) {
        return -1;
      }
    });
  } else if (sortBy.value === 'priceAsc') {
    donuts.sort((donut1, donut2) => donut1.price - donut2.price);
  } else if (sortBy.value === 'priceDesc') {
    donuts.sort((donut1, donut2) => donut2.price - donut1.price);
  }
  renderDonuts();
}

sortBy.addEventListener('click', sortDonuts);

// render all donuts
function renderDonuts() {
  donutContainer.innerHTML = '';
  for (let i = 0; i < donuts.length; i++) {
    const filledStarIcon = '<i class="fa fa-star" style="font-size: 1.5rem;"></i>';
    const emptyStarIcon = '<i class="fa fa-star-o" style="font-size: 1.5rem;"></i>';
    const maxRating = 5;
    const drawFilledStar = filledStarIcon.repeat(donuts[i].rating);
    const drawHollowStar = emptyStarIcon.repeat(maxRating - donuts[i].rating);
    const total = donuts[i].amount * donuts[i].price;
    donutContainer.innerHTML += `
    <article>
      <h3>${donuts[i].name} - <span class="price">${donuts[i].price}</span> kr</h3>
      Antal: ${donuts[i].amount} st <br>
      Totalt: ${total} kr
      ${drawFilledStar}${drawHollowStar}
      <button class="add" data-id="${i}">+</button>
      <button class="remove" data-id="${i}">-</button>
    </article>
    `;
  }

  console.log('hej' * 4);

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
  cart.innerHTML += `
  <div id="sumContainer">
    <span id="sum">Totalt ${sum}kr</span>
  </div>
  `;
}

// form input checks
const letters = /^[A-Za-zÅÄÖåäö]+$/;

let firstNameIsOk = false;
let lastNameIsOk = false;
let addressIsOk = false;
let postalCodeIsOk = false;
let localityIsOk = false;
let phoneNumberIsOk = false;
let emailIsOk = false;

// activate submit button
function activateSubmitButton() {
  if (firstNameIsOk
    && lastNameIsOk
    && addressIsOk
    && postalCodeIsOk
    && localityIsOk
    && phoneNumberIsOk
    && emailIsOk) {
    document.querySelector('#orderButton').removeAttribute('disabled');
  } else {
    document.querySelector('#orderButton').setAttribute('disabled', '');
  }
}

// first name
function checkFirstName() {
  if (firstName.value.match(letters)) {
    firstName.style.border = 'solid 3px blue';
    firstNameIsOk = true;
  } else {
    firstName.style.border = 'solid 3px red';
    alert('Invalid first name.');
    firstNameIsOk = false;
  }
  activateSubmitButton();
}

firstName.addEventListener('change', checkFirstName);

// last name
function checkLastName() {
  if (lastName.value.match(letters)) {
    lastName.style.border = 'solid 3px blue';
    lastNameIsOk = true;
  } else {
    lastName.style.border = 'solid 3px red';
    alert('Invalid last name.');
    lastNameIsOk = false;
  }
  activateSubmitButton();
}

lastName.addEventListener('change', checkLastName);

// address
function checkAddress() {
  const lettersNum = /^[A-Za-zÅÄÖåäö\s0-9]+$/;
  if (address.value.match(lettersNum)) {
    address.style.border = 'solid 3px blue';
    addressIsOk = true;
  } else {
    address.style.border = 'solid 3px red';
    alert('Invalid address.');
    addressIsOk = false;
  }
  activateSubmitButton();
}

address.addEventListener('change', checkAddress);

// postal code
function checkPostalCode() {
  const numSpace = /^[0-9\s]+$/;
  if (postalCode.value.match(numSpace) && postalCode.value.length == 5) {
    postalCode.style.border = 'solid 3px blue';
    postalCodeIsOk = true;
  } else {
    postalCode.style.border = 'solid 3px red';
    postalCodeIsOk = false;
  }
  activateSubmitButton();
}

postalCode.addEventListener('change', checkPostalCode);

// locality
function checkLocality() {
  const lettersSpace = /^[A-Za-zÅÄÖåäö\s]+$/;
  if (locality.value.match(lettersSpace)) {
    locality.style.border = 'solid 3px blue';
    localityIsOk = true;
  } else {
    locality.style.border = 'solid 3px red';
    localityIsOk = false;
  }
  activateSubmitButton();
}

locality.addEventListener('change', checkLocality);

// phone number
function checkPhoneNumber() {
  const numSpaceHy = /^[0-9-]+$/;
  if (phoneNumber.value.match(numSpaceHy) && phoneNumber.value.length == 10) {
    phoneNumber.style.border = 'solid 3px blue';
    phoneNumberIsOk = true;
  } else {
    phoneNumber.style.border = 'solid 3px red';
    phoneNumberIsOk = false;
  }
  activateSubmitButton();
}

phoneNumber.addEventListener('change', checkPhoneNumber);

// email
function checkEmail() {
  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(emailCheck)) {
    email.style.border = 'solid 3px blue';
    emailIsOk = true;
  } else {
    email.style.border = 'solid 3px red';
    emailIsOk = false;
  }
  activateSubmitButton();
}

email.addEventListener('change', checkEmail);

// // clear checkout form
// function clearOrder() {
//   const checkoutForm = document.querySelector('#checkoutForm');
//   // also add items in shopping cart here
//   // also clear items from shopping cart here

//   checkoutForm.reset();
// }

// // add click function to clear form button
// buttonClear.addEventListener('click', clearOrder);
