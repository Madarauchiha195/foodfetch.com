document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if user exists and credentials match
    if (user && user.collegeID === username && user.collegePassword === password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify({ firstName: user.firstName, lastName: user.lastName }));
        window.location.href = 'profile.html'; // Redirect to profile page
    } else {
        alert('Invalid username or password. Please try again.');
    }
});
