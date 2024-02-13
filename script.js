// Event listener for toggling the add employee popup
document.getElementById("togglePopup").addEventListener("click", function () {
    togglePopup("addEmployeePopup");
});

// Event listener for viewing employees
document.getElementById("viewEmployees").addEventListener("click", function () {
    viewEmployees();
});

// Event listener for toggling any popup (Assuming generic toggle)
document.getElementById("togglePopup").addEventListener("click", function () {
    togglePopup();
});

// Event listener for adding an employee
document.getElementById("addEmployee").addEventListener("click", function () {
    addEmployee();
});

// Event listener for toggling the add employee popup
document.getElementById("AddTogglePopup").addEventListener("click", function () {
    togglePopup("addEmployeePopup");
});

// Event listener for toggling the edit employee popup
document.getElementById("EditEmployeePopup").addEventListener("click", function () {
    togglePopup('editEmployeePopup');
});

// Event listener for saving edited employee details
document.getElementById("saveEditedEmployee").addEventListener("click", function () {
    saveEditedEmployee();
});

// Event listener for toggling the view employee popup
document.getElementById("EditTogglePopup").addEventListener("click", function () {
    togglePopup("viewEmployeePopup");
});

// Event listener for overlay click to close popups
document.getElementById("overlayPopup").addEventListener("click", function () {
    closePopups();
});


// Define the Employee class
class Employee {
    // Constructor function to initialize properties of the Employee object
    constructor(name, address, employeeId, designation) {
        this.name = name; // Name of the employee
        this.address = address; // Address of the employee
        this.employeeId = employeeId; // Unique ID of the employee
        this.designation = designation; // Job designation of the employee
    }
}

let employees = []; // Array to store employee objects
let editingIndex = null; // Keep track of the index of the employee being edited

//handle Edgecase separately
function handleEdge(name, address, employeeId, designation) {
    if (
        name === "" ||
        address === "" ||
        employeeId === "" ||
        designation === ""
    ) {
        showToast("Fill all details");
        return false;
    } else if (/\d/.test(name)) {
        showToast("Invalid Name: Name should not contain digits");
        return false;
    } else if (!isNaN(designation)) {
        showToast("Invalid Designation: Designation should not be a number");
        return false;
    } else if (isNaN(employeeId)) {
        showToast("Invalid EmployeeID: Employee ID should be a number");
        return false;
    }
    return true;
}

// Function to add employee details
function addEmployee() {
    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let employeeId = document.getElementById("employeeId").value.trim();
    let designation = document.getElementById("designation").value.trim();

    //handle Edge-Case
    if (handleEdge(name, address, employeeId, designation) == false) return;

    // Check if employeeId already exists
    let isUniqueId = employees.every(
        (employee) => employee.employeeId !== employeeId
    );
    if (!isUniqueId) {
        showToast("Employee ID already exists! Please enter a unique ID.", "red");
        return;
    }

    let employee = new Employee(name, address, employeeId, designation);
    employees.push(employee);

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("employeeId").value = "";
    document.getElementById("designation").value = "";

    showToast("Employee added successfully!", "green");
    togglePopup("addEmployeePopup");
}

// Function to edit employee details
function editEmployee(index) {
    let employee = employees[index];

    // Set input fields with existing employee details
    document.getElementById("editName").value = employee.name;
    document.getElementById("editAddress").value = employee.address;
    document.getElementById("editEmployeeId").value = employee.employeeId;
    document.getElementById("editDesignation").value = employee.designation;

    closePopups(); // Close all other popups
    togglePopup("editEmployeePopup"); // Display edit popup
    editingIndex = index; // Save the index of the employee being edited
}

// Function to save edited employee details
function saveEditedEmployee() {
    let name = document.getElementById("editName").value.trim();
    let address = document.getElementById("editAddress").value.trim();
    let employeeId = document.getElementById("editEmployeeId").value.trim();
    let designation = document.getElementById("editDesignation").value.trim();

    if (handleEdge(name, address, employeeId, designation) == false) return; //handle Edge-Case

    let isUniqueId = !employees.some((employee, index) => {
        //handle duplicates employee ID
        // Exclude the current employee being edited from the check
        if (index !== editingIndex) {
            return employee.employeeId === employeeId;
        }
        return false; // Skip the current employee being edited
    });
    if (!isUniqueId) {
        showToast("Employee ID already exists! Please enter a unique ID.", "red");
        return;
    }

    // Update employee details
    employees[editingIndex].name = name;
    employees[editingIndex].address = address;
    employees[editingIndex].employeeId = employeeId;
    employees[editingIndex].designation = designation;

    togglePopup("editEmployeePopup"); // Close edit popup
    showToast("Employee details updated successfully!", "green"); //Toast popup
}

// Function to toggle popups
function togglePopup(popupId) {
    let popup = document.getElementById(popupId);
    popup.style.display = popup.style.display === "block" ? "none" : "block";
    document.querySelector(".overlay").style.display =
        popup.style.display === "block" ? "block" : "none";
}

// Function to close all popups
function closePopups() {
    document
        .querySelectorAll(".popup")
        .forEach((popup) => (popup.style.display = "none"));
    document.querySelector(".overlay").style.display = "none";
}

// Function to view all employee details
function viewEmployees() {
    let employeeList = document.getElementById("employeeList");
    employeeList.innerHTML = ""; // Clear previous list
    employees.forEach((employee, index) => {
        let p = document.createElement("p");
        p.innerHTML = `NAME: ${employee.name}, ADDRESS: ${employee.address}, EMPLOYEE ID: ${employee.employeeId}, DESIGNATION: ${employee.designation} <button onclick="editEmployee(${index})">Edit</button>`;
        employeeList.appendChild(p);
    });
    togglePopup("viewEmployeePopup");
}

// Display toast messages
function showToast(message, color = "red") {
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    toast.style.backgroundColor = color;

    setTimeout(() => {
        // Hide toast message after 3s
        toast.className = toast.className.replace("show", "");
    }, 3000);
} 