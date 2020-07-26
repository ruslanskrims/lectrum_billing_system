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
const totalValueField = document
  .getElementById("total__field")
  .getElementsByTagName("b")[0];
const payContainer = document.getElementsByClassName("right__payments-fields");

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

    totalValueField.innerHTML = payment.total;
    payments.push(payment);
    const idCapitalized =
      payment.id.charAt(0).toUpperCase() + payment.id.slice(1);
    const newCheckbox = `<p class="right__payments-field">
              <label>
                <input type="checkbox" checked />
                <span>${idCapitalized}</span>
              </label>
            </p>`;
    document
      .querySelector(".right__payments-fields")
      .insertAdjacentHTML("beforeend", newCheckbox);

    payment = {};

    centerForm.reset();
  });
};
///-----
///-----TASK 2

meters.onchange = (event) => {
  const { value } = event.target;
  payment.meterId = value;
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
