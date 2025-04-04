document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.querySelector("button");
    const makeInput = document.getElementById("make");
    const modelInput = document.getElementById("model");
    const yearInput = document.getElementById("year");
    const mileageInput = document.getElementById("mileage");
    const tableContainer = document.querySelector(".table-side");

    function createTable() {
        tableContainer.innerHTML = `
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Current Mileage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        loadData();
    }
    createTable();

    saveButton.addEventListener("click", function () {
        const make = makeInput.value;
        const model = modelInput.value;
        const year = yearInput.value;
        const mileage = mileageInput.value;

        // Validations
        if (!make || !model || !year) {
            alert("Please fill in all required fields.");
            return;
        }

        if (isNaN(year) || year < 1950) {
            alert("Year should be a number greater than 1950.");
            return;
        }

        if (isNaN(mileage) || mileage < 5000 || mileage > 10000) {
            alert("Current Mileage must be between 5000 and 10000.");
            return;
        }

        addRow(make, model, year, mileage);
        saveData();
    });

    function addRow(make, model, year, mileage) {
        const tableBody = document.querySelector("tbody");
        const rowCount = tableBody.rows.length + 1;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${rowCount}</td>
            <td>${make}</td>
            <td>${model}</td>
            <td>${year}</td>
            <td>${mileage}</td>
            <td>
                <button onclick="editRow(this)">Edit</button>
                <button onclick="deleteRow(this)">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }

    function saveData() {
        const rows = document.querySelectorAll("tbody tr");
        let data = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            data.push({
                id: cells[0].innerText,
                make: cells[1].innerText,
                model: cells[2].innerText,
                year: cells[3].innerText,
                mileage: cells[4].innerText
            });
        });
        localStorage.setItem("carData", JSON.stringify(data));
    }

    function loadData() {
        const tableBody = document.querySelector("tbody");
        const savedData = JSON.parse(localStorage.getItem("carData")) || [];
        savedData.forEach(item => {
            addRow(item.make, item.model, item.year, item.mileage);
        });
    }
});

function editRow(button) {
    const row = button.parentElement.parentElement;
    const cells = row.querySelectorAll("td");

    const newMake = prompt("Enter new Make", cells[1].innerText);
    const newModel = prompt("Enter new Model", cells[2].innerText);
    const newYear = prompt("Enter new Year", cells[3].innerText);
    const newMileage = prompt("Enter new Mileage", cells[4].innerText);

    if (newMake) cells[1].innerText = newMake;
    if (newModel) cells[2].innerText = newModel;
    if (newYear && !isNaN(newYear) && newYear > 1900) cells[3].innerText = newYear;
    if (newMileage && !isNaN(newMileage) && newMileage >= 5000 && newMileage <= 10000) cells[4].innerText = newMileage;

    localStorage.setItem("carData", JSON.stringify(getTableData()));
}

function deleteRow(button) {
    if (confirm("Are you sure you want to delete this row?")) {
        button.parentElement.parentElement.remove();
        localStorage.setItem("carData", JSON.stringify(getTableData()));
    }
}

function getTableData() {
    const rows = document.querySelectorAll("tbody tr");
    let data = [];
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll("td");
        data.push({
            id: index + 1,
            make: cells[1].innerText,
            model: cells[2].innerText,
            year: cells[3].innerText,
            mileage: cells[4].innerText
        });
    });
    return data;
}
