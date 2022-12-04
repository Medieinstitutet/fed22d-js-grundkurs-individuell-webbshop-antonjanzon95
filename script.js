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
const countDownEl = document.querySelector('#countdown');
const cartFooter = document.querySelector('#cartFooter');
const donutsWrapper = document.querySelector('main');
const toggleCartBtn = document.querySelector('#toggleCartBtn');
const cartContainer = document.querySelector('#cartContainer');
const invoiceCheckBox = document.querySelector('#invoice');

// form validation variables
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const postalCode = document.querySelector('#postalCode');
const locality = document.querySelector('#locality');
const doorCode = document.querySelector('#doorCode');
const phoneNumber = document.querySelector('#phoneNumber');
const email = document.querySelector('#email');

const errorFirstName = document.querySelector('#errorFirstName');
const errorLastName = document.querySelector('#errorLastName');
const errorAddress = document.querySelector('#errorAddress');
const errorPostalCode = document.querySelector('#errorPostalCode');
const errorLocality = document.querySelector('#errorLocality');
const errorPhoneNumber = document.querySelector('#errorPhoneNumber');
const errorEmail = document.querySelector('#errorEmail');

const nameRegEx = /^[A-Za-zÅÄÖåäö-]+$/;
const addressRegEx = /^[A-Za-zÅÄÖåäö\s0-9]+$/;
const postalCodeRegEx = /\b\d{5}\b/g;
const localityRegEx = /^[A-Za-zÅÄÖåäö\s]+$/;
const phoneNumberRegEx = /^07([0-9][ -]*){7}[0-9]$/;
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const socSecRegEx = /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/g;

let firstNameIsOk = false;
let lastNameIsOk = false;
let addressIsOk = false;
let postalCodeIsOk = false;
let localityIsOk = false;
let phoneNumberIsOk = false;
let emailIsOk = false;
let socialSecNumIsOk = false;
let selectedPaymentOption;

// dates
const currentDate = new Date();
let day = currentDate.getDay();
let hour = currentDate.getHours();

// timer
const startingMinutes = 15;
let time = startingMinutes * 60;
const timerInterval = setInterval(countTimer, 1000);

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

    // create elements
    const articleEl = document.createElement('article');
    const imageEl = document.createElement('img');
    const infoEl = document.createElement('div');

    imageEl.setAttribute('src', `img/${donuts[i].name}.webp`);
    imageEl.setAttribute('alt', `Bild på en ${donuts[i].name}munk.`)
    imageEl.setAttribute('height', '250');
    imageEl.setAttribute('width', '250');

    infoEl.className = 'donutContainer';
    infoEl.innerHTML = 
    `
      <h3>${donuts[i].name} - ${donuts[i].price}kr</h3>
      <span class="amount">${donuts[i].amount} st</span><br>
      <span class="price">${total}kr</span>
      <button class="remove" data-id="${i}" aria-label="Ta bort munk">-</button>
      <button class="add" data-id="${i}" aria-label="Lägg till munk">+</button><br>
      <div class="rating">
        ${drawFilledStar}${drawHollowStar}
      </div>
    `

    // append elements
    donutContainer.appendChild(articleEl);
    articleEl.appendChild(imageEl);
    articleEl.appendChild(infoEl);
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

  // shipping cost
  let shipping = 25 + sum / 10;

  // total sum and donut amount
  let totalSum;
  let totalDonutsAmount = 0;

  cartFooter.innerHTML = 
  `
    <button id="backBtn" aria-label="Gå tillbaka till föregående sida">Tillbaka</button>
    <button id="checkoutBtn" aria-label="Gå till kassan">Till kassan</button>
    <span id="sum">Totalt 0kr</span>
  `;

  // sum after shipping and special rules are added
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {

      // increment total donuts with each added donut
      totalDonutsAmount += donuts[i].amount;

      if (totalDonutsAmount >= 15) {
        shipping = 0;
      }

      totalSum = sum + shipping;

      // special rules for days
      switch(true) {
        // if monday 3 o'clock or before (2 rules apply)
        case (day === 1 && hour <= 3):
          totalSum = totalSum * 1.15 * 0.9;
          break;
        // if monday and before 10 o'clock (10% discount)
        case (day === 1 && hour < 10):
          totalSum = totalSum * 0.9;
          break;
        // if friday after 15:00 - sunday (increase price on each donut by 15% (first rule also includes monday night <= 3 o'clock))
        case ((day === 5 && hour > 15) || (day === 6) || (day === 0)):
          totalSum = (sum * 1.15) + shipping;
          break;
      }
      
      // render cart
      cart.innerHTML += 
      `
        <span class="cartItem">${donuts[i].name}</span> 
        <span class="cartItem"><button class="removeCart" data-id="${i}" aria-label="Ta bort en ${donuts[i].name}-munk">-</button> 
        ${donuts[i].amount} 
        <button class="addCart" data-id="${i}" aria-label="Lägg till en ${donuts[i].name}-munk">+</button></span> 
        <span class="cartItem">${donuts[i].price * donuts[i].amount}kr</span><br>
      `;

      cartFooter.innerHTML = 
      `
        <button id="backBtn" aria-label="Gå tillbaka">Tillbaka</button>
        <button id="checkoutBtn" aria-label="Gå till kassan">Till kassan</button>
        <span id="shipping">Frakt: ${Math.floor(shipping)}kr</span>
        <span id="sum">Totalt: ${Math.floor(totalSum)}kr</span>
      `;

      if (day === 1 && hour > 10) {
        cartFooter.innerHTML += `<span id="discount">Måndagsrabatt: 10 % på hela beställningen!</span>`;
      }
    }
  }

  // disable invoice payment choice if total sum is more than 800
  if (totalSum > 800) {
    invoiceCheckBox.setAttribute('disabled', '');
  } else {
      invoiceCheckBox.removeAttribute('disabled');
  }

  // add event listeners to each button
  document.querySelectorAll('.addCart').forEach((btn) => {
    btn.addEventListener('click', addDonut);
  });

  document.querySelectorAll('.removeCart').forEach((btn) => {
    btn.addEventListener('click', removeDonut);
  });

  document.querySelector('#backBtn').style.display = 'none';
  document.querySelector('#backBtn').addEventListener('click', showDonuts);
  document.querySelector('#checkoutBtn').addEventListener('click', showCheckout);

  startTimer();
}

// hide donuts and go to checkout
function showCheckout() {
  donutsWrapper.style.display = 'none';
  cartContainer.style.display = 'none';
  checkoutForm.style.display = 'block';

  document.querySelector('#backBtn').style.display = 'block';
  document.querySelector('#checkoutBtn').style.display = 'none';
}

// hide checkout and show donuts
function showDonuts() {
  donutsWrapper.style.display = 'block';
  cartContainer.style.display = 'none';
  checkoutForm.style.display = 'none';

  document.querySelector('#checkoutBtn').style.display = 'block';
  document.querySelector('#backBtn').style.display = 'none';
}

// toggle cart 
function toggleCart () {
  if (cartContainer.style.display === 'none') {
    cartContainer.style.display = 'block';
  } else {
    cartContainer.style.display = 'none';
  }
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
  animateSum();
}

// start timer from 15 minutes every time a donut is added to cart
function startTimer() {
  time = startingMinutes * 60;
  countTimer();
}

// count down the timer and reset form and cart if more than 15 minutes passed
function countTimer() {
  countDownEl.style.color = 'inherit';
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  countDownEl.innerHTML = `${minutes}:${seconds}`;

  time--;

  // set timer to red color when 1 minute is remaining
  if (time < 60) {
    countDownEl.style.color = 'red';
  } else if (time < 0) {
    clearOrder();
    clearInterval(timerInterval);
  }
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
  startTimer();

  if (firstNameIsOk
    && lastNameIsOk
    && addressIsOk
    && postalCodeIsOk
    && localityIsOk
    && phoneNumberIsOk
    && emailIsOk
    && (socialSecNumIsOk || selectedPaymentOption === 'debitCard')) 
    {
      orderButton.style.opacity = '1';
      orderButton.removeAttribute('disabled');
  } else {
      orderButton.setAttribute('disabled', '');
      orderButton.style.opacity = '0.5';
  }
}

/* 
  Jag fick aldrig till detta, du får gärna förklara om du har tid någon gång! Jag lyckas få inputIsOk till true,
  men sen när jag anropar funktionen i "handleInputChange" så är den false igen. 
  Måste jag göra något annat för att göra den dynamisk som du pratade om?
  Har testat gjort den till siffror, och testat använda return, men ändå vill den inte stanna som true efter "checkInput"-funktionen... 
*/

// // check if input is valid
// function checkInput(input, inputRegEx, errorInput) {
//   let inputIsOk = false;
//   if (input.value.match(inputRegEx)) {
//     errorInput.innerHTML = ``;
//     input.style.border = 'solid 2px green';
//     return true;
//   } else {
//     errorInput.innerHTML = `Vänligen kontrollera fältet.`;
//     input.style.border = 'solid 1px red';
//     return false;
//   }
// }

// // check all input cases
// function handleInputChange(e) {
//   switch (e.currentTarget.id) {
//     case 'firstName':
//       // test
//       let firstNameIsOk = checkInput(firstName, nameRegEx, errorFirstName);
//       break;
//     case 'lastName':
//       checkInput(lastName, nameRegEx, lastNameIsOk, errorLastName);
//       break;
//     case 'address':
//       checkInput(address, addressRegEx, addressIsOk, errorAddress);
//       break;
//     case 'postalCode':
//       checkInput(postalCode, postalCodeRegEx, postalCodeIsOk, errorPostalCode);
//       break;
//     case 'locality':
//       checkInput(locality, localityRegEx, localityIsOk, errorLocality);
//       break;
//     case 'phoneNumber':
//       checkInput(phoneNumber, phoneNumberRegEx, phoneNumberIsOk, errorPhoneNumber);
//       break;
//     case 'email':
//       checkInput(email, emailRegEx, emailIsOk, errorEmail);
//       break;
//     default:
//       console.error('Unknown input field ID.');
//   }
//   activateSubmitButton();
// }

// first name
function checkFirstName() {
  if (firstName.value.match(nameRegEx)) {
    document.querySelector('#errorFirstName').innerHTML = ``;
    firstName.style.border = 'solid 1px black';
    firstNameIsOk = true;
  } else {
    document.querySelector('#errorFirstName').innerHTML = `Vänligen fyll i ett giltigt förnamn.`;
    firstName.style.border = 'solid 1px red';
    firstNameIsOk = false;
  }
  activateSubmitButton();
}

// last name
function checkLastName() {
  if (lastName.value.match(nameRegEx)) {
    document.querySelector('#errorLastName').innerHTML = ``;
    lastName.style.border = 'solid 1px black';
    lastNameIsOk = true;
  } else {
    document.querySelector('#errorLastName').innerHTML = `Vänligen fyll i ett giltigt efternamn.`;
    lastName.style.border = 'solid 1px red';
    lastNameIsOk = false;
  }
  activateSubmitButton();
}

// address
function checkAddress() {
  if (address.value.match(addressRegEx)) {
    document.querySelector('#errorAddress').innerHTML = ``;
    address.style.border = 'solid 1px black';
    addressIsOk = true;
  } else {
    document.querySelector('#errorAddress').innerHTML = `Vänligen fyll i en giltig adress.`;
    address.style.border = 'solid 1px red';
    addressIsOk = false;
  }
  activateSubmitButton();
}

// postal code
function checkPostalCode() {
  if (postalCode.value.match(postalCodeRegEx)) {
    document.querySelector('#errorPostalCode').innerHTML = ``;
    postalCode.style.border = 'solid 1px black';
    postalCodeIsOk = true;
  } else {
    document.querySelector('#errorPostalCode').innerHTML = `Vänligen fyll i ett giltigt postnummer (5 siffror).`;
    postalCode.style.border = 'solid 1px red';
    postalCodeIsOk = false;
  }
  activateSubmitButton();
}

// locality
function checkLocality() {
  if (locality.value.match(localityRegEx)) {
    document.querySelector('#errorLocality').innerHTML = ``;
    locality.style.border = 'solid 1px black';
    localityIsOk = true;
  } else {
    document.querySelector('#errorLocality').innerHTML = `Vänligen fyll i en giltig ort. (Endast bokstäver)`;
    locality.style.border = 'solid 1px red';
    localityIsOk = false;
  }
  activateSubmitButton();
}

// phone number
function checkPhoneNumber() {
  if (phoneNumber.value.match(phoneNumberRegEx)) {
    document.querySelector('#errorPhoneNumber').innerHTML = ``;
    phoneNumber.style.border = 'solid 1px black';
    phoneNumberIsOk = true;
  } else {
    document.querySelector('#errorPhoneNumber').innerHTML = `Vänligen fyll i ett giltigt mobiltelefonnummer. (10 siffror)`;
    phoneNumber.style.border = 'solid 1px red';
    phoneNumberIsOk = false;
  }
  activateSubmitButton();
}

// email
function checkEmail() {
  if (email.value.match(emailRegEx)) {
    document.querySelector('#errorEmail').innerHTML = ``;
    email.style.border = 'solid 1px black';
    emailIsOk = true;
  } else {
    document.querySelector('#errorEmail').innerHTML = `Vänligen fyll i en giltig e-postadress.`;
    email.style.border = 'solid 1px red';
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
        <span>Kortnummer</span>
        <input type="number" id="debitCardNumber">
      </label>
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
      </label>
      <label>
        <span>CVV</span>
        <input type="number" id="debitCardCVV">
      </label>
      <label>
        <span>Namn på kortinnehavare:</span>
        <input type="text" id="debitCardOwner">
      </label>
    `;
  } else if (selectedPaymentOption == 'invoice') {
    paymentWindow.innerHTML = 
    `
      <label>
        Personnummer:<br />
        <span id="errorSocSecNum"></span>
        <input type="number" id="socialSecNum">
      </label>
    `;

    const socialSecNum = document.querySelector('#socialSecNum');

    // check social security number
    function checkSocSecNum() {
      if (socialSecNum.value.match(socSecRegEx)) {
        document.querySelector('#errorSocSecNum').innerHTML = ``;
        socialSecNum.style.border = 'solid 1px black';
        socialSecNumIsOk = true;
      } else {
        document.querySelector('#errorSocSecNum').innerHTML = `Vänligen fyll i ett giltigt personnummer. (10 eller 12 siffror)`;
        socialSecNum.style.border = 'solid 1px red';
        socialSecNumIsOk = false;
      }
    }

    socialSecNum.addEventListener('change', checkSocSecNum);
  }

  activateSubmitButton();
}

// render confirmation window
function renderConfirmationWindow() {
  orderButton.setAttribute('disabled', '');
  confirmationWindow.style.display = 'block';

  let orderedDonuts = [];

  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      orderedDonuts.push(donuts[i]);
    }
  }

  // create elements
  const buttonEl = document.createElement('button');
  buttonEl.setAttribute('id', 'closeWindow');
  buttonEl.setAttribute('aria-label', 'Stäng fönstret');
  buttonEl.innerHTML = '<i class="fa fa-close"></i>';

  const h2El = document.createElement('h2');
  h2El.innerHTML = 'Din beställning';

  const ulEl = document.createElement('ul');

  // append elements
  confirmationWindow.appendChild(buttonEl);
  confirmationWindow.appendChild(h2El);
  confirmationWindow.appendChild(ulEl);

  let shippingTime = 1;

  // create and append list of ordered donuts
  for (let i = 0; i < orderedDonuts.length; i++) {
    const liEl = document.createElement('li');
    if (orderedDonuts[i].amount == 1) {
      liEl.innerHTML = `${orderedDonuts[i].amount}st ${orderedDonuts[i].name}-munk.`;
    } else if (orderedDonuts[i].amount > 1) {
      liEl.innerHTML = `${orderedDonuts[i].amount}st ${orderedDonuts[i].name}-munkar.`;
    }
    ulEl.appendChild(liEl);
  }

  // shipping time
  const spanEl = document.createElement('span');

  // if more than 10 donuts of one kind is ordered, shipping time is 2 days
  orderedDonuts.forEach((donut) => {
    if (donut.amount < 10) {
      shippingTime = 2;
    }
  });

  console.log(shippingTime)

  // grammar
  if (Math.floor(shippingTime) == 1) {
    spanEl.innerHTML = `Uppskattad leveranstid: ${Math.floor(shippingTime)} dag.`;
  } else if (Math.floor(shippingTime) > 1) {
    spanEl.innerHTML = `Uppskattad leveranstid: ${Math.floor(shippingTime)} dagar.`;
  }

  confirmationWindow.appendChild(spanEl);

  // function for close window button
  function closeConfirmationWindow() {
    confirmationWindow.style.display = 'none';
    confirmationWindow.innerHTML = '';
    orderButton.removeAttribute('disabled');
  }

  // event listener for close window button
  document.querySelector('#closeWindow').addEventListener('click', closeConfirmationWindow);
}

// clear checkout form
function clearOrder() {
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].amount = 0;
  }
    renderDonuts();
    renderCart();
    showDonuts();
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

// toggle cart
toggleCartBtn.addEventListener('click', toggleCart);

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