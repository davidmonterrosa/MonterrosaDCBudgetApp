// Functions
function saveToLocalStorage(itemName) {
    let expensesArr = getFromLocalStorage();

    if (!expensesArr.includes(itemName)) {
        expensesArr.push(itemName);
    }

    localStorage.setItem('Expenses', JSON.stringify(expensesArr));
}

function saveBudget(amount)
{
    let currentBudget = localStorage.getItem('InitialBudget');
    if(amount != currentBudget) {
        localStorage.setItem('InitialBudget', JSON.stringify(amount))
    }
    return amount;
}

function getFromLocalStorage() {
    let localStorageData = localStorage.getItem('Expenses');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(itemName) {
    let localStorageData = getFromLocalStorage();

    let idToRemove = localStorageData.indexOf(itemName);

    localStorageData.splice(idToRemove, 1);

    localStorage.setItem('Expenses', JSON.stringify(localStorageData));
}

export {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, saveBudget}