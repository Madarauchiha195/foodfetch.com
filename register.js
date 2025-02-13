document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const collegeID = document.getElementById('collegeID').value;
    const collegePassword = document.getElementById('collegePassword').value;

    // Save user data to local storage
    const user = {
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        collegeID: collegeID,
        collegePassword: collegePassword
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful! Please log in.');
    window.location.href = 'login.html'; // Redirect to login page
});

