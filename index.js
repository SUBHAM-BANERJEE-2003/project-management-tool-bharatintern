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

// Populate the dropdown when the page loads
populateDropdown();
// Function to populate the dropdown with values from local storage
function populateDropdown() {
  // Clear the current options in the dropdown
  userDropdown.innerHTML = '';

  // Retrieve users from local storage
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Add each user as an option in the dropdown
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
 
 // index.js

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
