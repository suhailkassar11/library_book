function saveFormData() {
  // Get the form element using its ID
  var form = document.getElementById('myForm');

  // Retrieve existing data from LocalStorage or create an empty object
  var allData = JSON.parse(localStorage.getItem('allData')) || {};

  // Create an object to store the form data
  var formData = {
    book:form.book.value,
    author: form.author.value,
    pages: form.pages.value,
    // Add more fields here if needed
  };

  // Generate a unique key for each form submission
  var formKey = 'formData_' + Date.now();

  // Add the new data to the object using the unique key
  allData[formKey] = formData;

  // Store the object in LocalStorage after converting to a JSON string
  localStorage.setItem('allData', JSON.stringify(allData));

  // Optionally, you can display a message to the user after saving the data
  alert('Form data saved successfully!');
  console.log("this is the for data",allData )
  // Render the data in the table
  renderTable();
}

function deleteFormData(formKey) {
  // Retrieve existing data from LocalStorage or create an empty object
  var allData = JSON.parse(localStorage.getItem('allData')) || {};

  // Remove the data associated with the formKey
  delete allData[formKey];

  // Store the updated object in LocalStorage after converting to a JSON string
  localStorage.setItem('allData', JSON.stringify(allData));

  // Render the updated data in the table
  renderTable();
}

// Function to render the saved data in the table
function renderTable() {
  // Get the table body element
  var tableBody = document.querySelector('#dataTable tbody');

  // Clear the table body before rendering new data
  tableBody.innerHTML = '';

  // Retrieve the data from LocalStorage or create an empty object
  var allData = JSON.parse(localStorage.getItem('allData')) || {};
  var sequenceNumber=0
  // Loop through the data and create rows in the table
  for (var key in allData) {
    if (allData.hasOwnProperty(key)) {
      var formData = allData[key];
      var newRow = tableBody.insertRow();

      var sequenceCell = newRow.insertCell(0);
          sequenceCell.textContent = sequenceNumber;

      // Add the data to the new row
      var cell1 = newRow.insertCell(1);
      var cell2 = newRow.insertCell(2);
      var cell3 = newRow.insertCell(3);
      var cell4 = newRow.insertCell(4);
      var cell5 = newRow.insertCell(5);
      cell1.innerHTML = formData.book;
      cell2.innerHTML = formData.author;
      cell3.innerHTML = formData.pages;
      var readButton=document.createElement('button')
      readButton.textContent='READ'
      readButton.className="read"
      readButton.onclick=function(){
        if(readButton.textContent=='READ'){
          readButton.textContent='UNREAD'
          readButton.classList.remove('read')
          readButton.classList.add('unread')
        }
        else{
          readButton.textContent='READ'
          readButton.classList.remove('unread')
          readButton.classList.add('read')
        }
      }
      cell4.appendChild(readButton)
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'DELETE';
      deleteButton.className = 'button'
      deleteButton.onclick = (function (formKey) {
        return function () {
          deleteFormData(formKey);
        };
      })(key);
      cell5.appendChild(deleteButton);
    }
  }
}

// Call the renderTable function when the page loads to show existing data
window.addEventListener('load', renderTable);