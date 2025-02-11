import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, saveBudget } from "./localstorage.js";

// Id Section
const availableFunds = document.getElementById("availableFunds");

const itemName = document.getElementById("itemName");
const expense = document.getElementById("expense");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const budgetAmount = document.getElementById("budgetAmount");
const setBudgetBtn = document.getElementById("setBudgetBtn");
const manageBtn = document.getElementById("manageBtn");

const currentExpensesList = document.getElementById("currentExpensesList");

const expensesDisplay = document.getElementById("expensesDisplay");

// Variables
let initialBudget = 0;
let totalMoney = 0;
let totalExpenses = 0;


// Functions

function onAppLoad()
{
    let savedBudget = localStorage.getItem('InitialBudget');
    availableFunds.innerText = `$${savedBudget.slice(1, savedBudget.length -1)}`;
}

function calculateAvailableFunds()
{
    totalMoney = initialBudget - totalExpenses;
    availableFunds.innerText = totalMoney;
}

function createExpensesList() {
    let expensesList = getFromLocalStorage();
    console.log(expensesList);
    currentExpensesList.innerHTML = "";

    expensesList.map((spendingItem) => {

        console.log(expensesList);
            
            let pill = document.createElement('div');
            pill.className = "w-full flex justify-between place-items-center bg-linear-180 from-cyan-300 to-slate-500 rounded-full py-3";
            
            
            let title = document.createElement('h1');
            title.className = "ml-4 text-2xl max-w-[45%] overflow-x-scroll";
            title.innerText = spendingItem.nameOfItem;
            
            let deleteItemBtn = document.createElement('button');
            deleteItemBtn.className = "mr-4 w-8";

            let deleteIcon = document.createElement('img');
            deleteIcon.src = "./assets/delete.png";
            deleteIcon.alt = "Remove item from list";
            
            deleteItemBtn.addEventListener('click', function () {
                removeFromLocalStorage(title.innerText);
                pill.remove();
            });
    
            currentExpensesList.appendChild(pill);
    
            pill.appendChild(title);
            pill.appendChild(deleteItemBtn);
    
            deleteItemBtn.appendChild(deleteIcon);
        }
    )
    // }
}


// Event Listeners

setBudgetBtn.addEventListener("click", () => {
    initialBudget = saveBudget(budgetAmount.value);
    console.log(initialBudget);
    totalMoney = initialBudget - totalExpenses;
    console.log(totalMoney);
    availableFunds.innerText =  `$${totalMoney}`;
});

addExpenseBtn.addEventListener("click", () => {
    const expenseItem = {
        nameOfItem: itemName.value, 
        costOfItem: expense.value
    };
    totalExpenses += Number(expense.value);
    calculateAvailableFunds();
    console.log(totalExpenses);
    saveToLocalStorage(expenseItem);
    createExpensesList();
});


manageBtn.addEventListener("click", () => {
    createExpensesList();
});

onAppLoad();