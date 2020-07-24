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

//---TASK 1
companies.children.forEach((element) => {
  element.addEventListener("click", (event) => {
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

      for (const key in tarifs) {
        if (id === key) {
          payment.total = (currentValue - previousValue) * tarifs[key];
        }
      }
      payments.push(payment);
      payment = {};
    });
  });
});

///-----

///-----TASK 2

meters.onchange = (event) => {
  const { value } = event.target;
  payment.meterId = value;
};

centerFormFields.forEach((element) => {
  element.onchange = (event) => {
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
