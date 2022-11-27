/* eslint-disable no-plusplus */

// **************************************************************************************************************
// ---------------------------------------------- DECLARE VARIABLES ---------------------------------------------
// **************************************************************************************************************

const buttonClear = document.querySelector('#clearOrder');
const cart = document.querySelector('#cart');
const donutContainer = document.querySelector('#donuts');
const discountCode = document.querySelector('#discountCode');
const sortBy = document.querySelector('#sortBy');
const confirmationWindow = document.querySelector('#confirmationWindow');
const paymentWindow = document.querySelector('#paymentWindow');
const paymentOptions = document.querySelectorAll('input[name="paymentOption"]');
const orderButton = document.querySelector('#orderButton');

// form validation variables
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const postalCode = document.querySelector('#postalCode');
const locality = document.querySelector('#locality');
const doorCode = document.querySelector('#doorCode');
const phoneNumber = document.querySelector('#phoneNumber');
const email = document.querySelector('#email');

const letters = /^[A-Za-zÅÄÖåäö]+$/;
let firstNameIsOk = false;
let lastNameIsOk = false;
let addressIsOk = false;
let postalCodeIsOk = false;
let localityIsOk = false;
let phoneNumberIsOk = false;
let emailIsOk = false;
let debitCardNumberIsOk = false;
let socialSecNumIsOk = false;
let selectedPaymentOption;

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

let orderedDonuts = [];

// **************************************************************************************************************
// ---------------------------------------------- DECLARE FUNCTIONS ---------------------------------------------
// **************************************************************************************************************

// render all donuts
function renderDonuts() {
  donutContainer.innerHTML = '';
  for (let i = 0; i < donuts.length; i++) {
    const filledStarIcon = '<i class="fa fa-star"></i>';
    const emptyStarIcon = '<i class="fa fa-star-o"></i>';
    const maxRating = 5;
    const drawFilledStar = filledStarIcon.repeat(donuts[i].rating);
    const drawHollowStar = emptyStarIcon.repeat(maxRating - donuts[i].rating);
    const total = donuts[i].amount * donuts[i].price;
    donutContainer.innerHTML += 
    `
      <article>
        <img src="/img/${donuts[i].name}.webp"
        alt="Bild på en ${donuts[i].name}munk."
        width="250"
        height="250"
        />
        <div class="donutContainer">
          <h3>${donuts[i].name} - ${donuts[i].price}kr</h3>
          <span class="amount">${donuts[i].amount} st</span><br>
          <span class="price">${total}kr</span>
          <button class="remove" data-id="${i}">-</button>
          <button class="add" data-id="${i}">+</button><br>
          <div class="rating">
            ${drawFilledStar}${drawHollowStar}
          </div>
        </div>
      </article>
    `;
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

  // add event listeners to each button
  document.querySelectorAll('.add').forEach((btn) => {
    btn.addEventListener('click', addDonut);
  });

  document.querySelectorAll('.remove').forEach((btn) => {
    btn.addEventListener('click', removeDonut);
  });

  renderCart();
}

// render cart
function renderCart() {
  cart.innerHTML = '';
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      cart.innerHTML += 
      `
        <span>${donuts[i].name}</span> 
        <span><button class="removeCart" data-id="${i}">-</button> ${donuts[i].amount} <button class="addCart" data-id="${i}">+</button></span> 
        <span>${donuts[i].price * donuts[i].amount}kr</span><br>
      `;
    }
  }
  // calculate sum of all ordered donuts
  const sum = donuts.reduce(
    (previousValue, donut) => (donut.amount * donut.price) + previousValue,
    0,
  );
  cart.innerHTML += 
  `
    <div id="sumContainer">
      <span id="sum">Totalt ${sum}kr</span>
    </div>
  `;

  // add donuts
  function addDonut(e) {
    const clickedDonut = e.currentTarget.dataset.id;
    donuts[clickedDonut].amount += 1;
    renderCart();
    renderDonuts();
  }

  // remove donuts
  function removeDonut(e) {
    const clickedDonut = e.currentTarget.dataset.id;
    if (donuts[clickedDonut].amount > 0) {
      donuts[clickedDonut].amount -= 1;
    }
    renderCart();
    renderDonuts();
  }

  // add event listeners to each button
  document.querySelectorAll('.addCart').forEach((btn) => {
    btn.addEventListener('click', addDonut);
  });

  document.querySelectorAll('.removeCart').forEach((btn) => {
    btn.addEventListener('click', removeDonut);
  });
}

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
  } else if (sortBy.value === 'ratingAsc') {
    donuts.sort((donut1, donut2) => donut1.rating - donut2.rating);
  } else if (sortBy.value === 'ratingDesc') {
    donuts.sort((donut1, donut2) => donut2.rating - donut1.rating);
  }
  renderDonuts();
}

// form input checks
// activate submit button
function activateSubmitButton() {
  if (firstNameIsOk
    && lastNameIsOk
    && addressIsOk
    && postalCodeIsOk
    && localityIsOk
    && phoneNumberIsOk
    && emailIsOk
    && (socialSecNumIsOk || selectedPaymentOption == 'debitCard')) {
    orderButton.removeAttribute('disabled');
  } else {
    orderButton.setAttribute('disabled', '');
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

// phone number
function checkPhoneNumber() {
  const phoneRegEx = /^07([0-9][ -]*){7}[0-9]$/;
  if (phoneNumber.value.match(phoneRegEx)) {
    phoneNumber.style.border = 'solid 3px blue';
    phoneNumberIsOk = true;
  } else {
    phoneNumber.style.border = 'solid 3px red';
    phoneNumberIsOk = false;
  }
  activateSubmitButton();
}

// email
function checkEmail() {
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(emailRegEx)) {
    email.style.border = 'solid 3px blue';
    emailIsOk = true;
  } else {
    email.style.border = 'solid 3px red';
    emailIsOk = false;
  }
  activateSubmitButton();
}

// render payment window
function renderPaymentWindow() {
  paymentWindow.innerHTML = '';
  paymentOptions.forEach((option) => {
    if (option.checked) {
      selectedPaymentOption = option.value;
    }
  });
  if (selectedPaymentOption == 'debitCard') {
    paymentWindow.innerHTML = 
    `
      <label>
        Kortnummer<br />
        <input type="number" id="debitCardNumber">
      </label><br />
      <label>
        Utgångsdatum<br />
        <select id="debitCardExpMonth">
        <option selected disabled="">Månad</option>
        <option value="m01">01</option>
        <option value="m02">02</option>
        <option value="m03">03</option>
        <option value="m04">04</option>
        <option value="m05">05</option>
        <option value="m06">06</option>
        <option value="m07">07</option>
        <option value="m08">08</option>
        <option value="m09">09</option>
        <option value="m10">10</option>
        <option value="m11">11</option>
        <option value="m12">12</option>
        </select>
        /
        <select id="debitCardExpYear">
        <option selected disabled="">År</option>
        <option value="y22">22</option>
        <option value="y23">23</option>
        <option value="y24">24</option>
        <option value="y25">25</option>
        <option value="y26">26</option>
        <option value="y27">27</option>
        <option value="y28">28</option>
        <option value="y29">29</option>
        </select>
      </label><br>
      <label>
        CVV<br />
        <input type="number" id="debitCardCVV"> 
      </label>
    `;
  } else if (selectedPaymentOption == 'invoice') {
    paymentWindow.innerHTML = 
    `
      <label>
        Personnummer:
        <input type="number" id="socialSecNum">
      </label>
    `;
    const socialSecNum = document.querySelector('#socialSecNum');
    // check social security number
    function checkSocSecNum() {
      const socSecRegEx = /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/g;
      if (socialSecNum.value.match(socSecRegEx)) {
        socialSecNum.style.border = 'solid 3px blue';
        socialSecNumIsOk = true;
      } else {
        socialSecNum.style.border = 'solid 3px red';
        socialSecNumIsOk = false;
      }
    }
    socialSecNum.addEventListener('change', checkSocSecNum);
  }
  activateSubmitButton();
}



// render confirmation window
function renderConfirmationWindow() {
  confirmationWindow.innerHTML = 
  `
    Du har beställt:
    <ul>
  `;
  let orderedDonuts = [];
  
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      orderedDonuts.push(donuts[i]);
    }
  }

  for (let i = 0; i < orderedDonuts.length; i++) {
    confirmationWindow.innerHTML += `<li>${orderedDonuts[i].amount}st ${orderedDonuts[i].name}</li>`;
  }

  confirmationWindow.innerHTML += `</ul>`;
}

// // clear checkout form
// function clearOrder() {
//   const checkoutForm = document.querySelector('#checkoutForm');
//   // also add items in shopping cart here
//   // also clear items from shopping cart here

//   checkoutForm.reset();
// }

// // add click function to clear form button
// buttonClear.addEventListener('click', clearOrder);


// **************************************************************************************************************
// ---------------------------------------------- PROGRAM LOGIC -------------------------------------------------
// **************************************************************************************************************

// form validation
firstName.addEventListener('change', checkFirstName);
lastName.addEventListener('change', checkLastName);
address.addEventListener('change', checkAddress);
postalCode.addEventListener('change', checkPostalCode);
locality.addEventListener('change', checkLocality);
phoneNumber.addEventListener('change', checkPhoneNumber);
email.addEventListener('change', checkEmail);


// render payment window
paymentOptions.forEach((checkbox) => {
  checkbox.addEventListener('click', renderPaymentWindow);
});

// render confirmation window
orderButton.addEventListener('click', renderConfirmationWindow);
  
// sort donuts
sortBy.addEventListener('click', sortDonuts);

renderDonuts();
