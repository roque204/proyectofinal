const form = document.getElementById("transactionForm");

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js');
} else {
    alert.innerText = 'El navegador no soporta Service Worker';
}

document.addEventListener("DOMContentLoaded", function(event) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData")) || [];
    let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

    transactionObjArr.forEach(function(arrayElement) {
        insertRowInTransactionTable(arrayElement);
        console.log("Se inserta elemento");
    });

    updateTotalAmount(totalAmount);
});

document.getElementById("botonDeEnvio2").addEventListener("click", function(event) {
    event.preventDefault();

    let transactionFormData = new FormData(form);
    let transactionObj = convertFormDataToTransactionObj(transactionFormData);
    saveTransactionObj(transactionObj);
    insertRowInTransactionTable(transactionObj);

    let transactionType = document.querySelector('input[name="transactionType"]:checked').value;
    let transactionAmount = parseFloat(document.getElementById("transactionAmount").value);

    if (isNaN(transactionAmount)) {
        alert("Please enter a valid transaction amount.");
        return;
    }

    if (transactionType === "Ingreso") {
        addIncome(transactionAmount);
    } else if (transactionType === "Egreso") {
        subtractExpense(transactionAmount);
    }

    let totalAmount = transactions.reduce(function(sum, transaction) {
        return sum + transaction.amount;
    }, 0);

    updateTotalAmount(totalAmount);

    // Guardar el totalAmount en el almacenamiento local
    localStorage.setItem("totalAmount", totalAmount.toFixed(2));

    form.reset();
});

function convertFormDataToTransactionObj(transactionFormData) {
    return {
        "transactionType": transactionFormData.get("transactionType"),
        "transactionDescription": transactionFormData.get("transactionDescription"),
        "transactionAmount": parseFloat(transactionFormData.get("transactionAmount")),
        "transactionCategory": transactionFormData.get("transactionCategory")
    };
}

function insertRowInTransactionTable(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable");
    let newTransactionRowRef = transactionTableRef.insertRow(-1);

    for (let key in transactionObj) {
        let newTypeCellRef = newTransactionRowRef.insertCell();
        newTypeCellRef.textContent = transactionObj[key];
    }
}

function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj);
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    localStorage.setItem("transactionData", transactionArrayJSON);
}

let transactions = [];

function addIncome(amount) {
    transactions.push({
        type: "Ingreso",
        amount: amount
    });
}

function subtractExpense(amount) {
    transactions.push({
        type: "Egreso",
        amount: -amount 
    });
}

function updateTotalAmount(totalAmount) {
    let totalAmountElement = document.getElementById("totalAmount");

    totalAmountElement.textContent = totalAmount.toFixed(2);

    if (totalAmount < 10000) {
        totalAmountElement.style.color = 'red';
    } else {
        totalAmountElement.style.color = ''; 
    }
}


// caches.open('cache-v1').then( ( cache) => {
//     cache.addAll([
//         'index.html',

//     ])
// })






