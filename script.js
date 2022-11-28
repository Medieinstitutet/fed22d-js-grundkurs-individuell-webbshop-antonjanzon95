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
const checkoutForm = document.querySelector('#checkoutForm');
const addedMessage = document.querySelector('#addedMessage');

// form validation variables
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const postalCode = document.querySelector('#postalCode');
const locality = document.querySelector('#locality');
const doorCode = document.querySelector('#doorCode');
const phoneNumber = document.querySelector('#phoneNumber');
const email = document.querySelector('#email');

const letters = /^[A-Za-zÅÄÖåäö-]+$/;
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
        <img src="/img/${donuts[i].name}.jpg"
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
    showAddedMessage();
    animateSum();
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
  // calculate sum of all ordered donuts
  const sum = donuts.reduce(
    (previousValue, donut) => (donut.amount * donut.price) + previousValue,
    0,
);
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
    showAddedMessage();
    animateSum();
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

// animate sum when updated
function animateSum() {
  sum.style.color = 'blue';
  sum.style.scale = '1.05'
  setTimeout(removeAnimation, 200);
}

function removeAnimation() {
  sum.style.color = 'inherit';
  sum.style.scale = '1.0';
}

// show message for 2 seconds when donut is added to cart
function showAddedMessage() {
  addedMessage.style.display = 'block';
  setTimeout(clearMessage, 2000);
}

// clear the "added-message"
function clearMessage() {
  addedMessage.style.display = 'none';
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

//////******************** form input checks **********************///////

// activate submit button
function activateSubmitButton() {
  if (firstNameIsOk
    && lastNameIsOk
    && addressIsOk
    && postalCodeIsOk
    && localityIsOk
    && phoneNumberIsOk
    && emailIsOk
    && (socialSecNumIsOk || selectedPaymentOption === 'debitCard')) {
    orderButton.removeAttribute('disabled');
  } else {
    orderButton.setAttribute('disabled', '');
  }
}

// first name
function checkFirstName() {
  if (firstName.value.match(letters)) {
    document.querySelector('#errorFirstName').innerHTML = ``;
    firstName.style.border = 'solid 3px blue';
    firstNameIsOk = true;
  } else {
    document.querySelector('#errorFirstName').innerHTML = `Vänligen fyll i ett giltigt förnamn.`;
    firstName.style.border = 'solid 3px red';
    firstNameIsOk = false;
  }
  activateSubmitButton();
}

// last name
function checkLastName() {
  if (lastName.value.match(letters)) {
    document.querySelector('#errorLastName').innerHTML = ``;
    lastName.style.border = 'solid 3px blue';
    lastNameIsOk = true;
  } else {
    document.querySelector('#errorLastName').innerHTML = `Vänligen fyll i ett giltigt efternamn.`;
    lastName.style.border = 'solid 3px red';
    lastNameIsOk = false;
  }
  activateSubmitButton();
}

// address
function checkAddress() {
  const addressRegEx = /^[A-Za-zÅÄÖåäö\s0-9]+$/;
  if (address.value.match(addressRegEx)) {
    document.querySelector('#errorAddress').innerHTML = ``;
    address.style.border = 'solid 3px blue';
    addressIsOk = true;
  } else {
    document.querySelector('#errorAddress').innerHTML = `Vänligen fyll i en giltig adress.`;
    address.style.border = 'solid 3px red';
    addressIsOk = false;
  }
  activateSubmitButton();
}

// postal code
function checkPostalCode() {
  const postalCodeRegEx = /^[0-9\s-]+$/;
  if (postalCode.value.match(postalCodeRegEx) && postalCode.value.length == 5) {
    document.querySelector('#errorPostalCode').innerHTML = ``;
    postalCode.style.border = 'solid 3px blue';
    postalCodeIsOk = true;
  } else {
    document.querySelector('#errorPostalCode').innerHTML = `Vänligen fyll i ett giltigt postnummer (5 siffror).`;
    postalCode.style.border = 'solid 3px red';
    postalCodeIsOk = false;
  }
  activateSubmitButton();
}

// locality
function checkLocality() {
  const lettersSpace = /^[A-Za-zÅÄÖåäö\s]+$/;
  if (locality.value.match(lettersSpace)) {
    document.querySelector('#errorLocality').innerHTML = ``;
    locality.style.border = 'solid 3px blue';
    localityIsOk = true;
  } else {
    document.querySelector('#errorLocality').innerHTML = `Vänligen fyll i en giltig ort. (Endast bokstäver)`;
    locality.style.border = 'solid 3px red';
    localityIsOk = false;
  }
  activateSubmitButton();
}

// phone number
function checkPhoneNumber() {
  const phoneRegEx = /^07([0-9][ -]*){7}[0-9]$/;
  if (phoneNumber.value.match(phoneRegEx)) {
    document.querySelector('#errorPhoneNumber').innerHTML = ``;
    phoneNumber.style.border = 'solid 3px blue';
    phoneNumberIsOk = true;
  } else {
    document.querySelector('#errorPhoneNumber').innerHTML = `Vänligen fyll i ett giltigt mobiltelefonnummer. (10 siffror)`;
    phoneNumber.style.border = 'solid 3px red';
    phoneNumberIsOk = false;
  }
  activateSubmitButton();
}

// email
function checkEmail() {
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(emailRegEx)) {
    document.querySelector('#errorEmail').innerHTML = ``;
    email.style.border = 'solid 3px blue';
    emailIsOk = true;
  } else {
    document.querySelector('#errorEmail').innerHTML = `Vänligen fyll i en giltig e-postadress.`;
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
        <span id="errorSocSecNum"></span>
        <input type="number" id="socialSecNum">
      </label>
    `;

    const socialSecNum = document.querySelector('#socialSecNum');

    // check social security number
    function checkSocSecNum() {
      const socSecRegEx = /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/g;
      if (socialSecNum.value.match(socSecRegEx)) {
        document.querySelector('#errorSocSecNum').innerHTML = ``;
        socialSecNum.style.border = 'solid 3px blue';
        socialSecNumIsOk = true;
      } else {
        document.querySelector('#errorSocSecNum').innerHTML = `Vänligen fyll i ett giltigt personnummer. (10 eller 12 siffror)`;
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
  confirmationWindow.style.display = 'block';
  confirmationWindow.innerHTML = 
  `
    <button id="closeWindow"><i class='fa fa-close'></i></button>
    <h2>Din beställning</h2>
    <ul>
  `;
  
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      orderedDonuts.push(donuts[i]);
    }
  }

  for (let i = 0; i < orderedDonuts.length; i++) {
    if (orderedDonuts[i].amount === 1) {
      confirmationWindow.innerHTML += `<li>${orderedDonuts[i].amount}st ${orderedDonuts[i].name}-munk.</li>`;
    } else if (orderedDonuts[i].amount > 1) {
      confirmationWindow.innerHTML += `<li>${orderedDonuts[i].amount}st ${orderedDonuts[i].name}-munkar.</li>`;
    }
  }

  confirmationWindow.innerHTML += 
  `
    </ul>

    Uppskattad leveranstid: 2 dagar.
  `;

  function closeConfirmationWindow() {
    confirmationWindow.style.display = 'none';
  }

  document.querySelector('#closeWindow').addEventListener('click', closeConfirmationWindow);
}

// clear checkout form
function clearOrder() {
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].amount = 0;
  }
  renderDonuts();
  renderCart();
}


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

// clear order button
buttonClear.addEventListener('click', clearOrder);

// render payment window
paymentOptions.forEach((checkbox) => {
  checkbox.addEventListener('click', renderPaymentWindow);
});

// render confirmation window
orderButton.addEventListener('click', renderConfirmationWindow);
  
// sort donuts
sortBy.addEventListener('click', sortDonuts);

renderDonuts();
