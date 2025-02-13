// payment.js

// Flag to track if the bill has been downloaded
let billDownloaded = false;

// Function to display total amount from localStorage
function displayTotalAmount() {
    const totalAmount = localStorage.getItem('totalAmount') || '₹0.00';
    document.getElementById('total-amount').textContent = totalAmount;
}

// Function to go back to cart
function goBackToOrder() {
    window.location.href = 'cart.html';
}

// Function to generate and download a bill as PDF
function downloadBill() {
    // Retrieve user and order information from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = `${user.firstName} ${user.lastName}`;
    const userPhone = user.phoneNo;
    const userEmail = user.collegeID;
    // Retrieve cart items (order details) from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
    let orderItemsHtml = orderDetails.map(item => `
        <p>${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</p>
    `).join('');
    const totalAmount = localStorage.getItem('totalAmount') || '₹0.00';
    

    // HTML structure for the bill content
    const billContent = `
        <div id="bill-content" style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f4f9; color: #333;">
            <h2 style="color: #4CAF50; text-align: center;">Payment Successful</h2>
            <div style="line-height: 1.6; margin: 20px;">
                <p><strong>Name:</strong> ${userName}</p>
                <p><strong>Phone:</strong> ${userPhone}</p>
                <p><strong>Email:</strong> ${userEmail}</p>
                <p><strong>Order Details:</strong> ${orderItemsHtml}</p>
                <p><strong>Total Amount Paid:</strong> ${totalAmount}</p>
            </div>
            <p style="text-align: center;">Thank you for your purchase!</p>
        </div>
    `;

    // Create a temporary container for the bill content
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = billContent;
    document.body.appendChild(tempContainer);

    // Use html2pdf.js to generate and download the PDF
    html2pdf(tempContainer, {
        margin: 1,
        filename: 'FoodFetch_Bill.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }).then(() => {
        // Remove the temporary container after generating the PDF
        document.body.removeChild(tempContainer);

        // Mark bill as downloaded and show a toast
        billDownloaded = true;
        showToast("Bill downloaded successfully.");
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000); // Toast visible for 3 seconds
}

// Redirect to home page only if the bill has been downloaded
function goBackTohome() {
    if (billDownloaded) {
        window.location.href = 'home.html';
    } else {
        showToast("Please download the bill before proceeding.");
    }
}

// Ensure bill download prompt on page load
window.onload = function () {
    displayTotalAmount();
    showToast("Please scan the QR code to proceed with payment.");
};

// Function to share the bill via email
function shareBill() {
    // Retrieve user and order information from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = `${user.firstName} ${user.lastName}`;
    const userPhone = user.phoneNo;
    const userEmail = user.collegeID;
        // Retrieve order details
        const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
        const orderItemsText = orderDetails.map(item => `
            ${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}
        `).join('\n');
    const totalAmount = localStorage.getItem('totalAmount') || '₹0.00';

    // Format the bill content for the email body
    const emailBody = `
        Payment Successful
        Name: ${userName}
        Phone: ${userPhone}
        Email: ${userEmail}
        Order Details: ${orderItemsText}
        Total Amount Paid: ${totalAmount}
    `;

    // URL encode the content and create a mailto link
    const mailtoLink = `mailto:purnankjadhav195@gmail.com?subject=Your%20Payment%20Bill&body=${encodeURIComponent(emailBody)}`;

    // Open the user's default email client with the pre-filled bill content
    window.location.href = mailtoLink;
}

// Attach event listeners
document.querySelector('.download-bill').addEventListener('click', downloadBill);
document.querySelector('.done').addEventListener('click', goBackTohome);
document.querySelector('.share-bill').addEventListener('click', shareBill);
