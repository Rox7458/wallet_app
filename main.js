//? SELECTORS

// EXPENSE FORM
const expenseForm = document.getElementById("expense-form");
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const spendingAreaInput = document.getElementById("spending-area");

// EXPENSE TABLE
const expenseBody = document.getElementById("expense-body");

// ADD INCOME FORM
const delBtn = document.getElementById("del-btn");
const addBtn = document.getElementById("add-btn");
const incomeInput = document.getElementById("income-input");
const addForm = document.getElementById("add-form");

// INCOME-EXPENSE (RESULT) TABLE
const revenueTable = document.getElementById("revenue");
const expenseTable = document.getElementById("expense");
const restTable = document.getElementById("rest");

//? VARIABLES
let expenseList = JSON.parse(localStorage.getItem("expenseListLocal")) || [];
let incomes = Number(localStorage.getItem("incomesLocal")) || 0;

//^*******************************************************************************

//! expenditure form process
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    date: dateInput.value,
    amount: amountInput.value,
    spendingArea: spendingAreaInput.value,
  };

  expenseList.push(newExpense);

  // saved to the local
  localStorage.setItem("expenseListLocal", JSON.stringify(expenseList));

  expenseForm.reset();
  pushSpendingDom(newExpense);
  calculateUpdate();
});

//! push spending to the DOM

const pushSpendingDom = ({ id, date, amount, spendingArea }) => {
  expenseBody.innerHTML += `
  <tr>
    <td class="bg-warning">${date}</td>
    <td class="bg-warning">${spendingArea}</td>
    <td class="bg-warning">${amount}</td>
    <td class="bg-warning">
    <i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
  </tr>
  `;

  //! delete from both dom and page
  document.querySelectorAll(".fa-trash-can").forEach((del) => {
    del.onclick = () => {
      del.parentElement.parentElement.remove();

      expenseList = expenseList.filter((exp) => exp.id != del.id);
      calculateUpdate();

      localStorage.setItem("expenseListLocal", JSON.stringify(expenseList));
    };
  });
};

//! revenue add form

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  incomes = incomes + Number(incomeInput.value);
  revenueTable.textContent = incomes;

  localStorage.setItem("incomesLocal", incomes);

  addForm.reset();
  calculateUpdate();
});

//! delete the revenue from everywhere
delBtn.addEventListener("click", () => {
  localStorage.removeItem("incomesLocal");
  localStorage.removeItem("expenseListLocal");
  // calculateUpdate();
});

//! calculate everything then update the last output table
const calculateUpdate = () => {
  const allExpenses = expenseList.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  expenseTable.textContent = allExpenses;
  restTable.textContent = incomes - allExpenses;
};

expenseList.forEach((exp) => {
  pushSpendingDom(exp);
});

revenueTable.textContent = incomes;
calculateUpdate();
