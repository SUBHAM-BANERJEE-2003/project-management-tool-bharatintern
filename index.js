// Get references to the input, button, and dropdown elements
const addUsersInput = document.getElementById('addUsers');
const addBtn = document.getElementById('addbtn');
const userDropdown = document.getElementById('usrdrpdn');
const delBtn = document.getElementById('delbtn');
// Function to save the input to local storage and update the dropdown
function saveToLocalStorageAndPopulateDropdown() {
  // Get the input value
  const inputValue = addUsersInput.value.trim();

  // Check if the input is not empty
  if (inputValue !== '') {
    // Retrieve existing users from local storage or initialize an empty array
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    storedUsers.push(inputValue);

    // Save the updated array back to local storage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Clear the input field
    addUsersInput.value = '';

    // Populate the dropdown with the updated user list
    populateDropdown();
  }
}
// Function to remove a user from local storage and update the dropdown
function removeFromLocalStorageAndPopulateDropdown() {
  // Get the input value
  const inputValue = addUsersInput.value.trim();

  // Retrieve existing users from local storage or initialize an empty array
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if the input user exists in the array
  if (storedUsers.includes(inputValue)) {
    // Remove the user from the array
    const updatedUsers = storedUsers.filter((user) => user !== inputValue);

    // Save the updated array back to local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Clear the input field
    addUsersInput.value = '';

    // Populate the dropdown with the updated user list
    populateDropdown();
  } else {
    // If the user doesn't exist, call the saveToLocalStorageAndPopulateDropdown function to add it
    alert('The Entered User is not present!');
  }
}
// Add an event listener to the "DELETE USER" button to remove or add a user
delBtn.addEventListener('click', removeFromLocalStorageAndPopulateDropdown);


populateDropdown();

function populateDropdown() {
  
  userDropdown.innerHTML = '';


  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  storedUsers.forEach((user) => {
    const option = document.createElement('option');
    option.value = user;
    option.text = user;
    userDropdown.appendChild(option);
  });
}

// Add an event listener to the "ADD USERS" button to save and populate the dropdown
addBtn.addEventListener('click', saveToLocalStorageAndPopulateDropdown);

populateDropdown();

function stopTimer(td5) {
  const timerInterval = td5.dataset.timerInterval;
  
  if (timerInterval) {
    clearInterval(timerInterval); 
    delete td5.dataset.timerInterval;
    const elapsedTime = Date.now() - parseInt(td5.dataset.startTime, 10);
    td5.dataset.elapsedTime = elapsedTime;
  }
}

function startTimer(td5) {
  let startTime;
  let elapsedTime = 0;
  if (td5.dataset.startTime) {
    startTime = Date.now() - parseInt(td5.dataset.elapsedTime, 10);
    elapsedTime = parseInt(td5.dataset.elapsedTime, 10);
  } else {
    startTime = Date.now();
  }

  const timerInterval = setInterval(() => {
    const formattedTime = formatTime(elapsedTime);
    td5.textContent = formattedTime;
    elapsedTime += 1000;
  }, 1000); 
  td5.dataset.startTime = startTime;
  td5.dataset.elapsedTime = elapsedTime;
  td5.dataset.timerInterval = timerInterval;
}

// Function to format elapsed time in HH:MM:SS format
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function getTodaysdate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today
 }
// task table populate
document.addEventListener("DOMContentLoaded", function() {
  const userDropdown = document.getElementById('usrdrpdn');
  var taskcnt = 1

  const addButton = document.getElementById('add-button');
  const taskdet = document.getElementById('taskdet');
  const today = getTodaysdate()
  addButton.addEventListener('click', function() {
  
      var user = userDropdown.value;
      var task = taskdet.value;

      if (user.trim() === "" || task.trim() === "") {
          alert("please provide all details");
          return;
      }

      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      td1.className = 'px-4 py-3 text-ms font-semibold border'
      var td2 = document.createElement('td');
      td2.className = 'px-4 py-3 text-ms font-semibold border'
      var td3 = document.createElement('td');
      td2.className = 'px-4 py-3 text-ms font-semibold border'
      var td4 = document.createElement('td');
      td3.className = 'px-4 py-3 text-ms font-semibold border'
      td4.className = 'px-4 py-3 text-ms font-semibold border'
      var td5 = document.createElement('td');
      td5.className = 'timer px-4 py-3 text-ms font-semibold border';
      var td6 = document.createElement('td')
      td6.className = 'px-4 py-3 text-ms font-semibold border';
      var td7 = document.createElement('td')
      td7.className = 'px-4 py-3 text-ms font-semibold border';
var statdrpdn = document.createElement('select');
statdrpdn.className = 'mt-4 px-4 py-3 text-ms font-semibold border bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center inline-flex items-center';
var statbar = document.createElement("span");
statbar.className = "px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm";
var changestat = document.createElement('option');
changestat.value = 'changestat';
changestat.textContent = 'change stat';

var optionStart = document.createElement('option');
optionStart.value = 'start';
optionStart.textContent = 'Start';

var optionStop = document.createElement('option');
optionStop.value = 'stop';
optionStop.textContent = 'Stop';

var optionDelete = document.createElement('option');
optionDelete.value = 'delete';
optionDelete.textContent = 'Delete';

var optionMarkComplete = document.createElement('option');
optionMarkComplete.value = 'markComplete';
optionMarkComplete.textContent = 'Mark as Complete';

statdrpdn.appendChild(changestat);
statdrpdn.appendChild(optionStart);
statdrpdn.appendChild(optionStop);
statdrpdn.appendChild(optionDelete);
statdrpdn.appendChild(optionMarkComplete);

statdrpdn.addEventListener('change', handlestatChange);

function handlestatChange(event) {
    var selectedValue = event.target.value;
    alert("Are you sure?") 
    switch (selectedValue) {
        case 'start':
            startTimer(td5);
            statbar.className = "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm";
            statbar.textContent = "started";
            changestat.style.display = "none";
            optionStart.style.display = "none";
            var optionreStart = document.createElement('option');
            optionreStart.value = 're-start';
            optionreStart.textContent = 're-start';
            statdrpdn.appendChild(optionreStart);
            break;
        case 're-start':
          startTimer(td5);
          statbar.className = "px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-200 rounded-sm";
          statbar.textContent = "Pending";
          break;
        case 'stop':
            stopTimer(td5);
            statbar.className = "px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-200 rounded-sm";
            statbar.textContent = "Pending";
            break;
        case 'delete':
          const taskTable = document.getElementById('task-tbl');
          if (tr.parentNode) {
              tr.parentNode.removeChild(tr);
          }
          break;
        case 'markComplete':
            stopTimer(td5);
            statbar.className = "px-2 py-1 font-semibold leading-tight text-green-900 bg-green-600 rounded-sm";
            statbar.textContent = "Completed";
            break;
        default:
            alert('some problem occured')
            break;
    }
}


      td1.textContent = taskcnt;
      td2.textContent = task;
      td3.textContent = user;
      statbar.textContent = "Not Started";
      td5.textContent = "00:00:00";
      td6.textContent = today;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      td4.appendChild(statbar);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(statdrpdn);
      taskcnt++;
      // Add the new row to the table
      document.getElementById("task-tbl").getElementsByTagName('tbody')[0].appendChild(tr);
  });
});
// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get the user's name and message from the input fields
  const nameInput = document.getElementById('name-input');
  const messageInput = document.getElementById('message-input');

  const userName = nameInput.value.trim();
  const messageText = messageInput.value.trim();
  // Check if both the name and message are not empty
  if (userName !== '' && messageText !== '') {
    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message bg-green-500 text-white rounded-lg py-2 px-4 max-w-xs shadow-md mt-2 ml-4 mb-2';
    messageElement.innerHTML = `<strong>${userName}:</strong> ${messageText}`;

    // Append the new message to the chat-messages div
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.appendChild(messageElement);

    // Clear the message input field
    messageInput.value = '';
  }
}

// Add an event listener to the form to handle submissions
const chatForm = document.querySelector('.chat-form');
chatForm.addEventListener('submit', handleFormSubmit);
