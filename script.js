let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;
let chart;

// Selecting elements
const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

function displayExpenses() {

    list.innerHTML = "";
    total = 0;

    

    expenses.forEach(function(expense, index) {

        const li = document.createElement("li");
        li.textContent = expense.description + " - ₹" + expense.amount;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.type = "button";
        editBtn.classList.add("edit-btn");

    editBtn.onclick = function() { 
        
        const newDescription = prompt("Edit Description", expense.description);
        const newAmount = prompt("Edit amount", expense.amount);

        if(newDescription != null && newAmount != null){
            expenses[index].description = newDescription;
            expenses[index].amount = Number(newAmount);

            localStorage.setItem("expenses", JSON.stringify(expenses));

            displayExpenses();
        }
    };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = function () {
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            displayExpenses();
        };

        const buttonGrp = document.createElement("div");

        buttonGrp.appendChild(editBtn);
        buttonGrp.appendChild(deleteBtn);

        li.appendChild(buttonGrp);
        list.appendChild(li);

        total += expense.amount;
    });

    totalDisplay.textContent = total;
}

function updateChart() {

    const labels = expenses.map(exp => exp.description);
    const data = expenses.map(exp => exp.amount);

    const ctx = document.getElementById("expenseChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Expenses",
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Load expenses when page opens
displayExpenses();

// Add new expense
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);

    const expense = {
        description: description,
        amount: amount
    };
    

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    form.reset();
});