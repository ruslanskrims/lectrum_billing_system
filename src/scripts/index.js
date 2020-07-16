import '../styles/index.scss';

const payments = [];
let payment = {};

const companies = document.getElementById('companies');
const meters = document.getElementById('meters');

companies.onclick = (event) => {
    const id = event.target.getAttribute('data-id');

    payment.id = id;
};

meters.onchange = (event) => {
    const { value } = event.target;
    payment.meterId = value;
};