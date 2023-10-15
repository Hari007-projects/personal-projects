// portfoliovali.js

// Function to validate the email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate the form
function validateForm() {
  const email = document.getElementById('email').value;
  const name = document.getElementById('companyname').value;
  const address = document.getElementById('location').value;

  let isValid = true;

  // Validate email
  if (!isValidEmail(email)) {
    document.getElementById('error1').innerHTML = 'Invalid email format';
    isValid = false;
  } else {
    document.getElementById('error1').innerHTML = '';
  }

  // Validate company name (name)
  if (name.trim() === '') {
    document.getElementById('error2').innerHTML = 'Company name is required';
    isValid = false;
  } else {
    document.getElementById('error2').innerHTML = '';
  }

  // Validate location (address)
  if (address.trim() === '') {
    document.getElementById('error3').innerHTML = 'Location is required';
    isValid = false;
  } else {
    document.getElementById('error3').innerHTML = '';
  }

  return isValid;
}

// Attach the form validation function to the form submission event
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  if (validateForm()) {
    // If validation is satisfied, send data to the PHP script
    const formData = new FormData(document.getElementById('form'));
    fetch('portvali.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(data => {
      // Handle the response from PHP (e.g., display a success message)
      document.write(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});
