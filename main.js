// import { parse } from "postcss";
import "./style.css";
import path from "path";
const form = document.getElementById("form");
const errorFields = form.querySelectorAll("[id]");

const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const term = document.getElementById("term");
const years = document.getElementById("years");
const interest = document.getElementById("interest");
const percentage = document.getElementById("percentage");
const errorAmount = document.getElementById("error-amount");
const errorTerm = document.getElementById("error-term");
const errorInterest = document.getElementById("error-interest");
const monthlyRepaymentDOM = document.getElementById("monthly-repayments");
const totalRepaymentDOM = document.getElementById("total-repayment");
const interestIsChecked = document.getElementById("rate");
const descriptionOfIMport = document.getElementById("description-of-import");

const pagePreview = document.getElementById("page-preview");
const pageResults = document.getElementById("page-results");
const btnClear = document.getElementById("btn-clear");
const btnCalculate = document.getElementById("btn-calculate");

amount.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\./g, "").replace(/\,/g, ".");
  if (!/^\d*\.?\,?\d*$/.test(value)) {
    e.target.value = e.target.value.slice(0, -1);
    return;
  }
  if (amount.value !== "") {
    e.target.value = parseFloat(value).toLocaleString("it-IT");
  }
});

term.addEventListener("input", (e) => {
  let value = e.target.value;
  if (!/^\d*$/.test(value) || value < 1) {
    e.target.value = e.target.value.slice(0, -1);
    return;
  }
});

interest.addEventListener("input", (e) => {
  let value = e.target.value;
  if (!/^\d*\.?\d*$/.test(value) || value < 0) {
    e.target.value = e.target.value.slice(0, -1);
    return;
  }
});

btnCalculate.addEventListener("click", () => {
  removeError();

  if (checkFields()) {
    return;
  }

  const amountValue = getCleanNumber(amount.value);
  console.log(amountValue);
  const termValue = parseFloat(term.value);
  const interestValue = parseFloat(interest.value);
  let monthlyrepayment = calcMonthlyRepayment(
    amountValue,
    termValue,
    interestValue
  );
  let totalRepayment = monthlyrepayment * term.value * 12;
  let totalInterest = totalRepayment - amountValue;
  monthlyRepaymentDOM.textContent = monthlyrepayment.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  if (interestIsChecked.checked) {
    descriptionOfIMport.textContent =
      "Total interest you will pay over the term";
    totalRepaymentDOM.textContent = totalInterest.toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR",
    });
  } else {
    totalRepaymentDOM.textContent = totalRepayment.toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR",
    });
  }

  pagePreview.classList.add("hidden");
  pagePreview.classList.remove("flex");
  pageResults.classList.remove("hidden");
});

btnClear.addEventListener("click", clearAll);

function calcMonthlyRepayment(amount, term, interest) {
  const monthlyInterest = interest / 100 / 12;
  const n = term * 12;
  const monthlyPayment =
    interest === 0
      ? amount / n
      : (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -n));

  return monthlyPayment;
}

function clearAll() {
  removeError();
  amount.value = "";
  term.value = "";
  interest.value = "";
  pageResults.classList.add("hidden");
  pagePreview.classList.add("flex");
  pagePreview.classList.remove("hidden");
}

function removeError() {
  for (const field of errorFields) {
    field.classList.remove("error");
    field.classList.remove("border-error");
    field.classList.remove("show-error");
  }
}

function checkFields() {
  let hasError = false;

  if (amount.value === "") {
    errorAmount.classList.add("show-error");
    amount.classList.add("border-error");
    currency.classList.add("error");
    hasError = true;
  }
  if (term.value === "") {
    errorTerm.classList.add("show-error");
    term.classList.add("border-error");
    years.classList.add("error");
    hasError = true;
  }
  if (interest.value === "") {
    errorInterest.classList.add("show-error");
    interest.classList.add("border-error");
    percentage.classList.add("error");
    hasError = true;
  }

  return hasError;
}

function getCleanNumber(value) {
  // Rimuovi eventuali virgole o separatori di migliaia
  return parseFloat(value.replace(/\./g, "").replace(/\,/g, "."));
}
