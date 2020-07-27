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
const formSummaryList = document.getElementById("form__summary-list");
const resetBtn = document.getElementById("reset__btn");

const totalValueField = document
  .getElementById("total__field")
  .getElementsByTagName("b")[0];

const insertNewLi = (payment) => {
  const li = `<li class="list__item item">
            <p>
                <span class="list__item-label" >${payment.meterId}</span>
                  <span class="price">$<b>${payment.total}</b></span>
            </p>
    </li>`;
  formSummaryList.insertAdjacentHTML("afterBegin", li);
};

const setTotalValue = (total) => {
  let sum = Number(totalValueField.innerHTML);
  sum = sum + total;
  totalValueField.innerHTML = Number(sum.toFixed(2));
};

const savePayment = () => {
  const { previous, current, id } = payment;
  payment.total = !previous && !current ? 0 : (current - previous) * tarifs[id];
  payments.push(payment);
  insertNewLi(payment);
};

centerForm.onsubmit = (event) => {
  event.preventDefault();
  centerForm.reset();
  savePayment();
  setTotalValue(payment.total);
};

const resetForm = () => {
  payments = [];
  //   document.querySelector(".right__payments-fields").remove();
  companyItems.forEach((chosenElement) => {
    chosenElement.className = "left__company";
  });
  totalValueField.innerHTML = 0;
  const element = Array.from(formSummaryList.children);
  element.forEach((item) => {
    if (!item.id) {
      item.remove();
    }
  });
};

companies.onclick = (event) => {
  const id = event.target.getAttribute("data-id");
  const chosenElement = document.querySelector(`[data-id=${id}]`);
  companyItems.forEach((chosenElement) => {
    chosenElement.className = "left__company";
  });
  chosenElement.className = "left__company clicked";

  const main = (mainTitle.innerHTML = chosenElement.textContent);
  mainDescription.innerHTML = `Payment of the ${main} supply`;
  payment.id = id;
};

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
    console.log(payment);
  };
});

resetBtn.onclick = (event) => {
  event.preventDefault();
  resetForm();
};
