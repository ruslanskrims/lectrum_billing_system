import "../styles/index.scss";

import { tarifs } from "./constants";

let payments = [];
let payment = {};

const companies = document.getElementById("companies");
const companyItems = document.querySelectorAll(".left__company");
const meters = document.getElementById("meters");
let mainTitle = document.getElementsByClassName("center__title")[0];
let mainDescription = document.getElementsByClassName("center__desc")[0];
const centerForm = document.getElementById("center__form");
let centerFormFields = centerForm.getElementsByTagName("input");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const form = document.getElementById("center__form");
const formParent = document.getElementById("form__summary-list");
const totalValueField = document
  .getElementById("total__field")
  .getElementsByTagName("b")[0];

//---TASK 1
companies.onclick = (event) => {
  const id = event.target.getAttribute("data-id");
  const chosenElement = document.querySelector(`[data-id=${id}]`);

  //toggle style solution
  companyItems.forEach((chosenElement) => {
    chosenElement.className = "left__company";
  });

  chosenElement.className = "left__company clicked";

  const main = (mainTitle.innerHTML = chosenElement.textContent);
  mainDescription.innerHTML = `Payment of the ${main} supply`;
  payment.id = id;

  saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const previousValue = payment.previous;
    const currentValue = payment.current;

    payment.total =
      !previousValue && !currentValue
        ? 0
        : (currentValue - previousValue) * tarifs[payment.id];

    console.log(payment);

    const newLi = `<li class="list__item">
                    <p>
                  <span class="list__item-label" id=${payment.meterId}>${
      payment.meterId
    }</span>
                  <span class="price"><b>$ ${payment.total.toFixed(
                    2
                  )}</b></span>
                </p>
              </li>`;
    const item = document.querySelectorAll("#form__summary-list")[0];
    item.insertAdjacentHTML("afterbegin", newLi);

    totalValueField.innerHTML = payment.total.toFixed(2);
    payment = {};
    console.log(payment);
    form.reset();
  });
};
///-----
///-----TASK 2

meters.onchange = (event) => {
  const { value } = event.target;
  payment.meterId = value;
  console.log(value);
};

centerFormFields.forEach((element) => {
  element.oninput = (event) => {
    const { value } = event.target;
    const fieldId = event.target.getAttribute("id");

    switch (fieldId) {
      case "previous":
        payment.previous = Number(value);
        break;
      case "current":
        payment.current = Number(value);
        break;
      case "payment":
        payment.currentOnDate = Number(value);
        break;
      default:
        null;
        break;
    }
  };
});

resetBtn.onclick = (event) => {
  event.preventDefault();
  payments = [];
  console.log(payments);
};
