// In home.js
function toggleCart(name, imageSrc, price, button) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if item already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.name === name);

    if (existingItemIndex === -1) {
        // Add to cart if not already present
        cartItems.push({
            name: name,
            imageSrc: imageSrc,
            price: price,
            quantity: 1
        });
        button.textContent = 'Cancel';
        button.classList.add('cancel');
    } else {
        // Remove from cart if already present
        cartItems.splice(existingItemIndex, 1);
        button.textContent = 'Add to Cart';
        button.classList.remove('cancel');
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.length;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

window.onload = initializeCartButtons;

function initializeCartButtons() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const buttons = document.querySelectorAll('.cart-btn');

    buttons.forEach(button => {
        const name = button.closest('.food-card').querySelector('h3').textContent;
        const isInCart = cartItems.some(item => item.name === name);
        if (isInCart) {
            button.textContent = 'Cancel';
            button.classList.add('cancel');
        }
    });

    updateCartCount();
}



// Call this when the page loads
window.onload = initializeCartButtons;

