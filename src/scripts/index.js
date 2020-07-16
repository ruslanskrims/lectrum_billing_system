import '../styles/index.scss';

import { tarifs } from './constants';

let payments = [];
let payment = {};

const companies = document.getElementById('companies');
const meters = document.getElementById('meters');

companies.onclick = (event) => {
    const id = event.target.getAttribute('data-id');
    const element = document.querySelector(`[data-id=${id}]`);
    element.style = "background-color: #ccc;";

    payment.id = id;
};

meters.onchange = (event) => {
    const { value } = event.target;
    payment.meterId = value;
};