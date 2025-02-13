// Back button function
function goBack() {
    window.history.back();
}

// Sample data for previous orders
const orders = [
    { id: 12345, amount: 250 },
    { id: 12346, amount: 120 },
    { id: 12347, amount: 300 },
];

// Function to load orders into the list
function loadOrders() {
    const orderList = document.getElementById('orderList');
    orders.forEach(order => {
        const orderItem = document.createElement('p');
        orderItem.className = 'order-item';
        orderItem.textContent = `Order #${order.id} - ₹${order.amount}`;
        orderList.appendChild(orderItem);
    });
}

// Toggle visibility of the orders list
document.getElementById('toggleOrders').onclick = function() {
    const orderList = document.getElementById('orderList');
    orderList.classList.toggle('hidden');
};

// Load orders on page load

document.addEventListener('DOMContentLoaded', loadOrders);




document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.querySelector('.profile-name').textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    } else {
        alert('No user is logged in. Please log in first.');
        window.location.href = 'login.html'; // Redirect to login page
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        document.querySelector('.profile-name').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('phoneNo').textContent = user.phoneNo;
        document.getElementById('collegeID').textContent = user.collegeID;
    } else {
        alert('No user is logged in. Please log in first.');
        window.location.href = 'login.html'; // Redirect to login page
    }

    loadOrders(); // Function to load orders if implemented
});