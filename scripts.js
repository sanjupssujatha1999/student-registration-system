// Function to validate input fields
function validateStudentInputs(id, name, email, contact) {
    // Regular expression patterns for validation
    const idPattern = /^[0-9]+$/;
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactPattern = /^[0-9]+$/;

    // Validate Student ID
    if (!idPattern.test(id)) {
        alert('Student ID must be a number.');
        return false;
    }
    // Validate Student Name
    if (!namePattern.test(name)) {
        alert('Student Name must contain only letters and spaces.');
        return false;
    }
    // Validate Email ID
    if (!emailPattern.test(email)) {
        alert('Invalid Email ID.');
        return false;
    }
    // Validate Contact Number
    if (!contactPattern.test(contact)) {
        alert('Contact Number must be a number.');
        return false;
    }
    return true;
}

// Function to add a new student record
function addStudentRecord(id, name, email, contact) {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert new cells in the new row
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    // Set the text content of the new cells to the input values
    cell1.textContent = id;
    cell2.textContent = name;
    cell3.textContent = email;
    cell4.textContent = contact;
    cell5.innerHTML = '<button onclick="editStudentRecord(this)">Edit</button> <button onclick="deleteStudentRecord(this)">Delete</button>';

    // Save the updated student data to local storage
    saveStudentData();
}

// Function to edit an existing student record
function editStudentRecord(button) {
    const row = button.parentNode.parentNode;
    const id = row.cells[0].textContent;
    const name = row.cells[1].textContent;
    const email = row.cells[2].textContent;
    const contact = row.cells[3].textContent;

    // Populate the form fields with the existing data for editing
    document.getElementById('studentId').value = id;
    document.getElementById('studentName').value = name;
    document.getElementById('studentEmail').value = email;
    document.getElementById('studentContact').value = contact;

    // Delete the existing record from the table
    deleteStudentRecord(button);
}

// Function to delete a student record
function deleteStudentRecord(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    // Save the updated student data to local storage
    saveStudentData();
}

// Function to save student records to local storage
function saveStudentData() {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const students = [];

    // Iterate through the table rows and collect student data
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const student = {
            id: cells[0].textContent,
            name: cells[1].textContent,
            email: cells[2].textContent,
            contact: cells[3].textContent
        };
        students.push(student);
    }

    // Save the student data to local storage
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to load student records from local storage
function loadStudentData() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    for (const student of students) {
        addStudentRecord(student.id, student.name, student.email, student.contact);
    }
}

// Add an event listener to the registration form to handle form submission
document.getElementById('studentForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values from the input fields
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const contact = document.getElementById('studentContact').value;

    // Validate the input fields
    if (!validateStudentInputs(id, name, email, contact)) {
        return;
    }

    // Add the new student record
    addStudentRecord(id, name, email, contact);

    // Reset the form fields after submission
    document.getElementById('studentForm').reset();
    alert('Student registered successfully!');
});

// Load student records from local storage when the page loads
window.onload = loadStudentData;