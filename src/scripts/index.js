// import '../styles/index.scss';

// import { tarifs } from './constants';

// let payments = [];
// let paymentsBackup = [];
// let payment = {};
// const totalSumValues = [];
// let companyNameGlobal;

// const companies = document.getElementById('companies');
// const centerTitle = document.getElementsByClassName('center__title')[0];
// const centerDesc = document.getElementsByClassName('center__desc')[0];
// const meters = document.getElementById('meters');
// const currentCounts = document.getElementById('current');
// const previousCounts = document.getElementById('previous');
// const currentOnDate = document.getElementById('payment');
// const buttonClear = document.getElementsByTagName('button')[0];
// const buttonSubmit = document.getElementsByTagName('button')[1];
// const buttonPay = document.getElementsByTagName('button')[2];
// const ul = document.querySelectorAll('.form__summary-list')[0];
// const forPaymentTitle = document.getElementsByClassName('form__summary-title')[0];
// const checkBoxesRow = document.getElementsByClassName('right__payments-field');
// const transactions = document.querySelectorAll('.transactions__list')[0];

// companies.onclick = (event) => {

//     const id = event.target.getAttribute('data-id');
//     const element = document.querySelector(`[data-id=${id}]`);

//     const companyChildren = companies.children;
//     for (const item of companyChildren) {
//         if (item.hasAttribute('style')) {
//             item.removeAttribute('style');
//         }
//     }
//     element.style = "background-color: #ccc;";

//     payment.id = id;

//     const companyName = element.textContent.trim();
//     centerTitle.innerHTML = companyName;
//     centerDesc.innerHTML = `Payment of ${companyName.toLowerCase()} supply`;
//     companyNameGlobal = companyName;
// };

// meters.onchange = (event) => {
//     const { value } = event.target;
//     payment.meterId = value;
// };

// currentCounts.oninput = (event) => {
//     const { value } = event.target;
//     payment.currentCount = value;
// };

// previousCounts.oninput = (event) => {
//     const { value } = event.target;
//     payment.previousCount = value;
// };

// currentOnDate.oninput = (event) => {
//     const { value } = event.target;
//     payment.currentOnDatePayment = value;
// };

// buttonSubmit.onclick = (event) => {
//     event.preventDefault();

//     ul.insertAdjacentHTML('afterbegin', `
//     <li class="list__item">
//         <p><span class="list__item-label">Select a meter</span>
//             <span class="price">$ <b>0</b></span>
//         </p>
//     </li>`);
//     const meterNumber = document.querySelectorAll('.list__item-label')[0];
//     meterNumber.innerHTML = (!payment.meterId) ? 'Select a meter' : payment.meterId;

//     const meterValue = document.querySelectorAll('.price')[0].lastChild;
//     payment.total = (!payment.currentCount && !payment.previousCount) 
//     ? 0 : (payment.currentCount - payment.previousCount) * tarifs[payment.id];

//     meterValue.innerHTML = payment.total * 10 / 10;

//     totalSumValues.push(payment.total * 10);

//     const totalSum = totalSumValues.reduce((accumulator, currentValue) => accumulator + currentValue);
//     const totalList = document.getElementsByClassName('list__total');
//     const totalId = totalList[0].getElementsByTagName('b');
//     totalId[0].innerHTML = totalSum / 10;

//     for (const row of checkBoxesRow) {
//         const checkInput = row.getElementsByTagName('input')[0];
//         const checkSpan = row.getElementsByTagName('span')[0].textContent;

//         if (checkSpan === companyNameGlobal) {
//             checkInput.checked = true;
//         }
//     }
     
//     payments.push(payment);
//     document.getElementById("form").reset();
// };

// buttonClear.onclick = () => {
//     paymentsBackup = payments;
//     payments = [];
//     ul.remove();
//     forPaymentTitle.insertAdjacentHTML('afterend', `
//     <ul class="form__summary-list">
//         <li class="list__item list__total">
//             <p><span class="list__item-label">Total</span>
//                 <span class="price">$ <b>0</b></span>
//             </p>
//         </li>
//     </ul>`);

//     for (const row of checkBoxesRow) {
//         const checkInput = row.getElementsByTagName('input')[0];
//         checkInput.checked = false;
//     }
// };

// buttonPay.onclick = (event) => {
//     event.preventDefault();

//     for (const row of checkBoxesRow) {
//         const checkInput = row.getElementsByTagName('input')[0];
//         const checkSpan = row.getElementsByTagName('span')[0].textContent;

//         if (checkInput.checked) {
//             console.log(`ID платежа: ${checkSpan}  оплачено`);
//             setTimeout(() => transactions.insertAdjacentHTML('afterbegin',
//             `<li class="list__item">${checkSpan}: Successful payment</li>`), 1000);
//         }
//     }
// };

import '../styles/index.scss';

import { tarifs } from './constants';

let payments = [];
let paymentsBackup = [];
let payment = {};
const totalSumValues = [];
let serviceNameGlobal;

const companies = document.getElementById('companies');
const paymentTitleCenter = document.getElementsByClassName('center__title')[0];
const centerDesc = document.getElementsByClassName('center__desc')[0];
const meters = document.getElementById('meters');
const currentCounts = document.getElementById('current');
const previousCounts = document.getElementById('previous');
const currentOnDate = document.getElementById('payment');

const buttonClear = document.getElementsByTagName('button')[0];
const submitBtn = document.getElementsByTagName('button')[1];
const buttonPay = document.getElementsByTagName('button')[2];
const ul = document.querySelectorAll('.form__summary-list')[0];
const forPaymentTitle = document.getElementsByClassName('form__summary-title')[0];
const checkBoxesRow = document.getElementsByClassName('right__payments-field');
const transactions = document.querySelectorAll('.transactions__list')[0];


companies.onclick = (event) => {

    const id = event.target.getAttribute('data-id');
    const element = document.querySelector(`[data-id=${id}]`);

    for (const item of companies.children) {
        if (item.hasAttribute('style')) {
            item.removeAttribute('style');
        }
    }
    element.style.backgroundColor = "#ccc";

    payment.id = id;

    const serviceTitle = element.textContent.trim();
    paymentTitleCenter.innerHTML = serviceTitle;
    centerDesc.innerHTML = `Payment of ${serviceTitle.toLowerCase()} supply`;
    serviceNameGlobal = serviceTitle;
};

meters.onchange = (event) => {
    const { value } = event.target;
    payment.meterId = value;
};

currentCounts.oninput = (event) => {
    const { value } = event.target;
    payment.currentCount = value;
};

previousCounts.oninput = (event) => {
    const { value } = event.target;
    payment.previousCount = value;
};

currentOnDate.oninput = (event) => {
    const { value } = event.target;
    payment.currentOnDatePayment = value;
};
//ПОНЯТНО
submitBtn.onclick = (event) => {
    event.preventDefault();
    ul.insertAdjacentHTML('afterbegin', `
    <li class="list__item">
        <p><span class="list__item-label">Select a meter</span>
            <span class="price">$ <b>0</b></span>
        </p>
    </li>`);
    const meterNumber = document.querySelectorAll('.list__item-label')[0];
    meterNumber.innerHTML = (!payment.meterId) ? 'Select a meter' : payment.meterId;

    const meterValue = document.querySelectorAll('.price')[0].lastChild;
    payment.total = (!payment.currentCount && !payment.previousCount) 
    ? 0 : (payment.currentCount - payment.previousCount) * tarifs[payment.id];

    meterValue.innerHTML = payment.total * 10 / 10;

    totalSumValues.push(payment.total * 10);

    const totalSum = totalSumValues.reduce((accumulator, currentValue) => accumulator + currentValue);
    const totalList = document.getElementsByClassName('list__total');
    const totalId = totalList[0].getElementsByTagName('b');
    totalId[0].innerHTML = totalSum / 10;

    for (const row of checkBoxesRow) {
        const checkInput = row.getElementsByTagName('input')[0];
        const checkSpan = row.getElementsByTagName('span')[0].textContent;

        if (checkSpan === serviceNameGlobal) {
            checkInput.checked = true;
        }
    }
     
    payments.push(payment);
    document.getElementById("form").reset();
};

// buttonClear.onclick = () => {
//     paymentsBackup = payments;
//     payments = [];
//     ul.remove();
//     forPaymentTitle.insertAdjacentHTML('afterend', `
//     <ul class="form__summary-list">
//         <li class="list__item list__total">
//             <p><span class="list__item-label">Total</span>
//                 <span class="price">$ <b>0</b></span>
//             </p>
//         </li>
//     </ul>`);

//     for (const row of checkBoxesRow) {
//         const checkInput = row.getElementsByTagName('input')[0];
//         checkInput.checked = false;
//     }
// };

// buttonPay.onclick = (event) => {
//     event.preventDefault();

//     for (const row of checkBoxesRow) {
//         const checkInput = row.getElementsByTagName('input')[0];
//         const checkSpan = row.getElementsByTagName('span')[0].textContent;

//         if (checkInput.checked) {
//             console.log(`ID of the payment: ${checkSpan} is paid`);
//             setTimeout(() => transactions.insertAdjacentHTML('afterbegin',
//             `<li class="list__item">${checkSpan}: Successful payment</li>`), 1000);
//         }
//     }
// };