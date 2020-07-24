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

//---TASK 1
companyItems.forEach((element) => {
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
  });
});

console.log(payment);
///-----

///-----TASK 2

meters.onchange = (event) => {
  const { value } = event.target;
  payment.meterId = value;
  console.log(payment);
};

centerFormFields.forEach((element) => {
  element.onchange = (event) => {
    const { value } = event.target;
    const id = event.target.getAttribute("id");

    switch (id) {
      case "previous":
        payment.previous = value;
        break;
      case "current":
        payment.current = value;
        break;
      case "payment":
        payment.currentOnDate = value;
        break;
      default:
        null;
        break;
    }
    console.log(id);
    console.log(value);
    console.log(payment);
  };
});
