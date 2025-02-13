// In script.js (for cart.html)
window.onload = function() {
    loadCartItems();
};

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        let newCartItem = document.createElement('div');
        newCartItem.classList.add('cart-item');
        newCartItem.setAttribute('data-price', item.price.toFixed(2));

        newCartItem.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.name}" class="food-image">
            <div class="food-details">
                <h2>${item.name}</h2>
                <div class="quantity">
                    <button class="qty-btn" onclick="decreaseQuantity(this)">-</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="increaseQuantity(this)">+</button>
                </div>
            </div>
            <div class="food-pricing">
                <p class="food-subtotal">₹${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" onclick="removeItem(this)">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(newCartItem);
    });

    updateTotal();
}

function updateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = `₹${totalPrice.toFixed(2)}`;
}

function increaseQuantity(button) {
    const cartItem = button.closest('.cart-item');
    const name = cartItem.querySelector('h2').textContent;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }
}

function decreaseQuantity(button) {
    const cartItem = button.closest('.cart-item');
    const name = cartItem.querySelector('h2').textContent;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.name === name);

    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    } else if (itemIndex !== -1) {
        // Remove the item entirely if quantity is 1 and the user clicks "-"
        cartItems.splice(itemIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }
}

function removeItem(button) {
    const cartItem = button.closest('.cart-item');
    const name = cartItem.querySelector('h2').textContent;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.name !== name);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}


// Function to increase quantity
function increaseQuantity(btn) {
    let qtyInput = btn.previousElementSibling;
    let currentQty = parseInt(qtyInput.value);
    qtyInput.value = currentQty + 1;
    updateSubtotal(btn, currentQty + 1);
}

// Function to decrease quantity
function decreaseQuantity(btn) {
    let qtyInput = btn.nextElementSibling;
    let currentQty = parseInt(qtyInput.value);
    if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
        updateSubtotal(btn, currentQty - 1);
    }
}

// Function to update subtotal for a single cart item
function updateSubtotal(btn, newQty) {
    let foodItem = btn.closest('.cart-item');
    let pricePerItem = parseFloat(foodItem.getAttribute('data-price')) || 100.00; // Default price if not set
    let subtotalElement = foodItem.querySelector('.food-subtotal');
    subtotalElement.innerHTML = `₹${(pricePerItem * newQty).toFixed(2)}`;
    updateTotal();
}

// Function to update total price
function updateTotal() {
    let total = 0;
    let subtotals = document.querySelectorAll('.food-subtotal');
    subtotals.forEach((subtotal) => {
        total += parseFloat(subtotal.innerHTML.replace('₹', ''));
    });
    document.getElementById('total-price').innerHTML = `₹${total.toFixed(2)}`;
}

// Function to open the modal
function openModal() {
    document.getElementById('addMoreModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('addMoreModal').style.display = 'none';
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    let modal = document.getElementById('addMoreModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Function to add item to cart
function addItemToCart(name, imageSrc, price) {
    closeModal();

    // Check if item already exists in cart
    let cartItemsContainer = document.getElementById('cart-items');
    let existingItem = Array.from(cartItemsContainer.getElementsByClassName('cart-item')).find(item => {
        return item.querySelector('.food-details h2').innerText === name;
    });

    if (existingItem) {
        // If item exists, increase the quantity
        let qtyInput = existingItem.querySelector('.qty-input');
        let currentQty = parseInt(qtyInput.value);
        qtyInput.value = currentQty + 1;
        updateSubtotal(existingItem.querySelector('.qty-btn'), currentQty + 1);
    } else {
        // If item does not exist, create a new cart item
        let newCartItem = document.createElement('div');
        newCartItem.classList.add('cart-item');
        newCartItem.setAttribute('data-price', price.toFixed(2)); // Store price per item

        newCartItem.innerHTML = `
            <img src="${imageSrc}" alt="${name}" class="food-image">
            <div class="food-details">
                <h2>${name}</h2>
                <div class="customization">
                    <label><input type="checkbox" class="extra-option"> Extra Cheese</label>
                    <label><input type="checkbox" class="extra-option"> Sauce</label>
                    <label><input type="checkbox" class="extra-option"> Mayo</label>
                </div>
                <div class="quantity">
                    <button class="qty-btn" onclick="decreaseQuantity(this)">-</button>
                    <input type="text" class="qty-input" value="1" readonly>
                    <button class="qty-btn" onclick="increaseQuantity(this)">+</button>
                </div>
            </div>
            <div class="food-pricing">
                <p class="food-subtotal">₹${price.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeItem(this)">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(newCartItem);
        updateTotal();
    }

    alert(`${name} has been added to your cart.`);
}

// Function to remove item from cart
function removeItem(btn) {
    if (confirm("Are you sure you want to remove this item from your cart?")) {
        let cartItem = btn.closest('.cart-item');
        cartItem.remove();
        updateTotal();
    }
}

function placeOrder() {
    const total = document.getElementById('total-price').textContent;

    // Retrieve all cart items and store them in localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    localStorage.setItem('orderDetails', JSON.stringify(cartItems)); // Save order details
    localStorage.setItem('totalAmount', total); // Save total amount

    // Redirect to the payment page
    window.location.href = 'payment.html';
}

