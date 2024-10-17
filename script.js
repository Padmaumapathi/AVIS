// Mobile Navbar Toggle
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Product Data
const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 999, img: "path/to/laptop.png" },
    { id: 2, name: "Smartphone", category: "electronics", price: 699, img: "path/to/smartphone.png" },
    { id: 3, name: "T-shirt", category: "clothing", price: 19.99, img: "path/to/tshirt.png" },
    { id: 4, name: "Novel", category: "books", price: 9.99, img: "path/to/novel.png" },
    // Add more products as needed
];

let currentPage = 1;
const itemsPerPage = 4;
const productGrid = document.querySelector('.product-grid');
let currentCategory = "all"; // Default category
let sortCriteria = "name"; // Default sorting
let wishlist = [];
let cartData = [];
let discountCode = "DISCOUNT10";

function renderProducts() {
    productGrid.innerHTML = ''; // Clear the product grid
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    // Filter products based on the current category
    let filteredProducts = currentCategory === "all" ? products : products.filter(product => product.category === currentCategory);

    // Sort products based on the selected criteria
    filteredProducts.sort((a, b) => {
        if (sortCriteria === "name") return a.name.localeCompare(b.name);
        if (sortCriteria === "price-asc") return a.price - b.price;
        if (sortCriteria === "price-desc") return b.price - a.price;
    });

    // Paginate products
    const paginatedProducts = filteredProducts.slice(start, end);
    paginatedProducts.forEach(product => {
        const productCard = `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                    <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });

    updatePaginationControls(filteredProducts.length);
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !wishlist.includes(product)) {
        wishlist.push(product);
        alert(`${product.name} has been added to your wishlist!`);
    } else {
        alert(`${product.name} is already in your wishlist!`);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cartData.push(product);
        alert(`${product.name} has been added to your cart!`);
    }
}

function updatePaginationControls(totalProducts) {
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage * itemsPerPage >= totalProducts;
}

// Pagination buttons
document.getElementById('nextBtn').addEventListener('click', () => {
    const filteredProducts = currentCategory === "all" ? products : products.filter(product => product.category === currentCategory);
    if (currentPage * itemsPerPage < filteredProducts.length) {
        currentPage++;
        renderProducts();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
});

// Category button click event
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.getAttribute('data-category');
        currentPage = 1; // Reset to first page
        renderProducts();
    });
});

// Sort options change event
const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', () => {
    sortCriteria = sortSelect.value; // Get selected sorting option
    currentPage = 1; // Reset to first page
    renderProducts();
});

// Initial Product Load
renderProducts();

// Form Validation (Contact Page)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Your message has been sent!');
    });
}

// Live Chat Functionality
document.querySelector('.live-chat button').addEventListener('click', function () {
    const message = document.querySelector('.live-chat textarea').value;
    if (message.trim() !== '') {
        alert(`Your message: "${message}" has been sent to our support team!`);
        document.querySelector('.live-chat textarea').value = ''; // Clear input
    } else {
        alert('Please type a message before sending.');
    }
});

// Login and Registration Form Handling
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect after successful login
    } else {
        alert('Login failed: ' + result.message);
    }
});

document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html'; // Redirect to the login page
    } else {
        alert('Registration failed: ' + result.message);
    }
});

// Discount Application
document.getElementById("applyDiscount").addEventListener("click", function() {
    const discountInput = document.getElementById("discountCode").value;
    const discountMessage = document.getElementById("discount-message");

    if (discountInput === discountCode) {
        const cartTotalDisplay = document.getElementById("cart-total");
        const total = parseFloat(cartTotalDisplay.textContent);
        const discountedTotal = total * 0.9;  // 10% discount
        cartTotalDisplay.textContent = discountedTotal.toFixed(2);
        discountMessage.textContent = "Discount applied!";
    } else {
        discountMessage.textContent = "Invalid discount code.";
    }
});

// Checkout Simulation
document.getElementById("checkout-btn").addEventListener("click", function() {
    alert("Proceeding to payment gateway (simulated).");
});

// Continue Shopping
document.getElementById("continue-shopping").addEventListener("click", function() {
    window.location.href = "shop.html";
});

// Initialize cart on load
document.addEventListener("DOMContentLoaded", function() {
    renderProducts();
});


// Function to add product to cart
function addToCart(product) {
    // Get the existing cart items from local storage or initialize an empty array if none exists
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        // Update quantity if product already exists
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Add new product to the cart
        cart.push(product);
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Inform user that the product is added
    alert(`${product.name} has been added to your cart!`);
}

// Function to load cart items from local storage and display them in the cart page
function loadCart() {
    // Get the cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    // Clear any existing items displayed in the cart
    cartItemsContainer.innerHTML = '';

    // Loop through the cart and display each item
    cart.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });

    // Call function to update the cart total
    updateCartTotal(cart);

    // Add event listeners to remove buttons
    setupRemoveButtons();
}

// Function to update the total price of the cart
function updateCartTotal(cart) {
    const totalDisplay = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalDisplay.textContent = `$${total.toFixed(2)}`;
}

// Function to set up event listeners for removing items from the cart
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out the item that matches the productId
    cart = cart.filter(item => item.id !== productId);

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart to reflect changes
    loadCart();
}

// Example of a product object you would pass to addToCart function
const sampleProduct = {
    id: '1',  // Unique ID for the product
    name: 'Product 1',
    price: 25.00,
    quantity: 1
}


window.onload = loadCart;  



function filterProducts() {
    const categorySelect = document.getElementById("categorySelect");
    const selectedCategory = categorySelect.value; // Get selected category
    const products = document.querySelectorAll(".product"); // Select all products

    products.forEach(product => {
        // Show product if it matches the selected category, otherwise hide it
        if (selectedCategory === "all" || product.dataset.category === selectedCategory) {
            product.style.display = "block";  // Show the product
        } else {
            product.style.display = "none";  // Hide the product
        }
    });
}

