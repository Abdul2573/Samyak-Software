 /*
 
 document.addEventListener('DOMContentLoaded', function() {
    fetchJewelryItems();
});
function fetchJewelryItems() {
    fetch('http://127.0.0.1:5000/api/jewelry')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging log
            displayJewelryItems(data);
        })
        .catch(error => console.error('Error fetching jewelry items:', error));
}

function displayJewelryItems(items) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear any existing items

    if (items.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'No jewelry items found.';
        productList.appendChild(noItemsMessage);
    }

    items.forEach(item => {
        console.log('Processing item:', item); // Debugging log

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const category = document.createElement('h3');
        category.textContent = item.CategoryName;

        const goldWeight = document.createElement('p');
        goldWeight.textContent = `Gold Weight: ${item.GoldWeight} g`;

        const price = document.createElement('p');
        price.textContent = `Price: $${item.TagPrice}`;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('add-to-cart-btn');
        // Add event listener for Add to Cart button if needed

        productCard.appendChild(category);
        productCard.appendChild(goldWeight);
        productCard.appendChild(price);
        productCard.appendChild(addToCartBtn);

        productList.appendChild(productCard);
    });
}


// Gappp
document.addEventListener('DOMContentLoaded', function() {
    // Handle Login Page Functionality
    if (document.querySelector('.login-container')) {
        const loginType = document.getElementById('login-type');
        const userForm = document.getElementById('user-form');
        const adminForm = document.getElementById('admin-form');

        if (loginType) {
            loginType.addEventListener('change', function() {
                if (loginType.value === 'user') {
                    userForm.style.display = 'block';
                    adminForm.style.display = 'none';
                } else if (loginType.value === 'admin') {
                    userForm.style.display = 'none';
                    adminForm.style.display = 'block';
                }
            });

            // Trigger change event to set initial form visibility
            loginType.dispatchEvent(new Event('change'));
        }
    }

    // Handle Register Page Functionality
    if (document.querySelector('.register-container')) {
        const registerType = document.getElementById('register-type');
        const userRegisterForm = document.getElementById('user-register-form');
        const adminRegisterForm = document.getElementById('admin-register-form');

        if (registerType) {
            registerType.addEventListener('change', function() {
                if (registerType.value === 'user') {
                    userRegisterForm.style.display = 'block';
                    adminRegisterForm.style.display = 'none';
                } else if (registerType.value === 'admin') {
                    userRegisterForm.style.display = 'none';
                    adminRegisterForm.style.display = 'block';
                }
            });

            // Trigger change event to set initial form visibility
            registerType.dispatchEvent(new Event('change'));
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(queryParams.get('id'));

    const items = [
        { id: 1, name: 'Jewelry Item 1', price: 200, image: 'images/jewelry1.jpg' },
        { id: 2, name: 'Jewelry Item 2', price: 150, image: 'images/jewelry2.jpg' },
        { id: 3, name: 'Jewelry Item 3', price: 300, image: 'images/jewelry3.jpg' },
        { id: 4, name: 'Jewelry Item 4', price: 250, image: 'images/jewelry4.jpg' }
    ];

    function getCartItems() {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    }

    function saveCartItems(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function addToCart(item) {
        const cartItems = getCartItems();
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...item, quantity: 1 });
        }

        saveCartItems(cartItems);
    }

    function renderCart() {
        const cartItems = getCartItems();
        const cartTableBody = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        cartTableBody.innerHTML = '';

        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            totalPrice += subtotal;

            cartTableBody.innerHTML += `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" class="cart-item-image"></td>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td><input type="number" value="${item.quantity}" class="quantity-input" data-id="${item.id}"></td>
                    <td>$${subtotal}</td>
                    <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
                </tr>
            `;
        });

        totalPriceElement.textContent = `$${totalPrice}`;
    }

    if (itemId) {
        const item = items.find(item => item.id === itemId);
        if (item) {
            addToCart(item);
            window.location.href = 'add-to-cart.html'; // Redirect to Add to Cart page
        }
    }

    renderCart();

    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const itemId = parseInt(event.target.dataset.id);
            let cartItems = getCartItems();
            cartItems = cartItems.filter(item => item.id !== itemId);
            saveCartItems(cartItems);
            renderCart();
        }
    });

    document.getElementById('cart-items').addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const itemId = parseInt(event.target.dataset.id);
            const quantity = parseInt(event.target.value);
            let cartItems = getCartItems();
            const item = cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity = quantity;
                saveCartItems(cartItems);
                renderCart();
            }
        }
    });
});


// scripts.js
// scripts.js
// scripts.js
// scripts.js

// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.item');
            const itemId = item.getAttribute('data-id');
            addToCart(itemId);
        });
    });

    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.item');
            const itemId = item.getAttribute('data-id');
            addToWishlist(itemId);
        });
    });

    function addToCart(itemId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (!cartItems.includes(itemId)) {
            cartItems.push(itemId);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function addToWishlist(itemId) {
        let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        if (!wishlistItems.includes(itemId)) {
            wishlistItems.push(itemId);
        }
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const wishlistContainer = document.querySelector('.wishlist-container');
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    wishlistItems.forEach(itemId => {
        const itemElement = document.querySelector(`.item[data-id="${itemId}"]`).cloneNode(true);
        itemElement.classList.add('wishlist-item');
        wishlistContainer.appendChild(itemElement);
    });

    const removeButtons = wishlistContainer.querySelectorAll('.add-to-wishlist');
    removeButtons.forEach(button => {
        button.textContent = 'Remove';
        button.addEventListener('click', function () {
            const item = this.closest('.wishlist-item');
            const itemId = item.getAttribute('data-id');
            removeFromWishlist(itemId);
            item.remove();
        });
    });
});

function removeFromWishlist(itemId) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    wishlistItems = wishlistItems.filter(id => id !== itemId);
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
}



    function addToCart(event) {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const itemElement = event.target.closest('.jewelry-item');
            const itemId = itemElement.dataset.id;
            const itemName = itemElement.querySelector('.item-name').innerText;
            const itemPrice = itemElement.querySelector('.item-price').innerText;
            const itemImage = itemElement.querySelector('.item-image').src;

            // Create item object
            const item = {
                id: itemId,
                name: itemName,
                price: itemPrice,
                image: itemImage
            };

            // Get current cart items from local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item is already in the cart
            const existingItemIndex = cart.findIndex(i => i.id === itemId);
            if (existingItemIndex > -1) {
                // Update quantity if already in the cart (optional)
                cart[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                item.quantity = 1;
                cart.push(item);
            }

            // Save updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(cart));

            alert('Item added to cart!');
        }
    }

    // Attach event listener to the document for delegated event handling
    document.addEventListener('click', addToCart);


document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('#cart-items tbody');

    // Function to render cart items
    function renderCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // Add each item to the cart page
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.dataset.id = item.id;

            row.innerHTML = `
                <td><img src="${item.image}" class="cart-item-image" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" class="quantity-input" min="1"></td>
                <td><button class="remove-btn">Remove</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });
    }

    // Function to remove item from cart
    
    // Render cart items on page load
    renderCartItems();

    // Attach event listener to the table body for delegated event handling
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', removeFromCart);
    }
});


// admin-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // Show specific section based on the button clicked
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }

    // Event listeners for the action buttons
    document.querySelectorAll('.actions button').forEach(button => {
        button.addEventListener('click', () => {
            showSection(button.getAttribute('onclick').split("'")[1]);
        });
    });

    // Example code to handle form submissions for adding jewelry
    document.getElementById('add-jewelry-form').addEventListener('submit', (event) => {
        event.preventDefault();
        // Add your code to handle form submission, e.g., send data to server
        alert('Jewelry added successfully!');
    });

    // Initially show the 'Add Jewelry' section
    showSection('add-jewelry');
    
});
// admin-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('add-item-form');
    const itemList = document.getElementById('item-list');

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemPrice = document.getElementById('item-price').value;
        const itemDescription = document.getElementById('item-description').value;
        const itemImage = document.getElementById('item-image').value;

        // Create new item element
        const listItem = document.createElement('li');
        listItem.classList.add('item');

        listItem.innerHTML = `
            <div class="item-info">
                <h3>${itemName}</h3>
                <p>Price: $${itemPrice}</p>
                <p>${itemDescription}</p>
                <img src="${itemImage}" alt="${itemName}" width="100">
            </div>
            <div class="item-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Add event listeners for edit and delete buttons
        listItem.querySelector('.edit-btn').addEventListener('click', () => {
            editItem(listItem);
        });

        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            deleteItem(listItem);
        });

        // Append new item to the list
        itemList.appendChild(listItem);

        // Clear form fields
        addItemForm.reset();
    });

    function editItem(itemElement) {
        // Get item details
        const itemInfo = itemElement.querySelector('.item-info');
        const itemName = itemInfo.querySelector('h3').textContent;
        const itemPrice = itemInfo.querySelector('p').textContent.split('$')[1];
        const itemDescription = itemInfo.querySelectorAll('p')[1].textContent;
        const itemImage = itemInfo.querySelector('img').src;

        // Pre-fill the form with current item details
        document.getElementById('item-name').value = itemName;
        document.getElementById('item-price').value = itemPrice;
        document.getElementById('item-description').value = itemDescription;
        document.getElementById('item-image').value = itemImage;

        // Remove item from list
        itemElement.remove();
    }

    function deleteItem(itemElement) {
        itemElement.remove();
    }
});
*/


// Scripts for Shop Page

// Event listener to fetch jewelry items when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchJewelryItems();
});

// Fetch jewelry items from the API and handle the response
function fetchJewelryItems() {
    fetch('http://127.0.0.1:5000/api/jewelry')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging log
            displayJewelryItems(data);
        })
        .catch(error => console.error('Error fetching jewelry items:', error));
}

// Display fetched jewelry items on the page
function displayJewelryItems(items) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear any existing items

    if (items.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'No jewelry items found.';
        productList.appendChild(noItemsMessage);
    }

    items.forEach(item => {
        console.log('Processing item:', item); // Debugging log

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const category = document.createElement('h3');
        category.textContent = item.CategoryName;

        const goldWeight = document.createElement('p');
        goldWeight.textContent = `Gold Weight: ${item.GoldWeight} g`;

        const price = document.createElement('p');
        price.textContent = `Price: $${item.TagPrice}`;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('add-to-cart-btn');
        // Add event listener for Add to Cart button if needed

        productCard.appendChild(category);
        productCard.appendChild(goldWeight);
        productCard.appendChild(price);
        productCard.appendChild(addToCartBtn);

        productList.appendChild(productCard);
    });
}

// Event listener to handle login and register page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle Login Page Functionality
    if (document.querySelector('.login-container')) {
        const loginType = document.getElementById('login-type');
        const userForm = document.getElementById('user-form');
        const adminForm = document.getElementById('admin-form');

        if (loginType) {
            loginType.addEventListener('change', function() {
                if (loginType.value === 'user') {
                    userForm.style.display = 'block';
                    adminForm.style.display = 'none';
                } else if (loginType.value === 'admin') {
                    userForm.style.display = 'none';
                    adminForm.style.display = 'block';
                }
            });

            // Trigger change event to set initial form visibility
            loginType.dispatchEvent(new Event('change'));
        }
    }

    // Handle Register Page Functionality
    if (document.querySelector('.register-container')) {
        const registerType = document.getElementById('register-type');
        const userRegisterForm = document.getElementById('user-register-form');
        const adminRegisterForm = document.getElementById('admin-register-form');

        if (registerType) {
            registerType.addEventListener('change', function() {
                if (registerType.value === 'user') {
                    userRegisterForm.style.display = 'block';
                    adminRegisterForm.style.display = 'none';
                } else if (registerType.value === 'admin') {
                    userRegisterForm.style.display = 'none';
                    adminRegisterForm.style.display = 'block';
                }
            });

            // Trigger change event to set initial form visibility
            registerType.dispatchEvent(new Event('change'));
        }
    }
});

// Event listener to handle cart item addition and rendering
document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(queryParams.get('id'));

    const items = [
        { id: 1, name: 'Jewelry Item 1', price: 200, image: 'images/jewelry1.jpg' },
        { id: 2, name: 'Jewelry Item 2', price: 150, image: 'images/jewelry2.jpg' },
        { id: 3, name: 'Jewelry Item 3', price: 300, image: 'images/jewelry3.jpg' },
        { id: 4, name: 'Jewelry Item 4', price: 250, image: 'images/jewelry4.jpg' }
    ];

    // Retrieve cart items from local storage
    function getCartItems() {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    }

    // Save cart items to local storage
    function saveCartItems(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Add item to cart
    function addToCart(item) {
        const cartItems = getCartItems();
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...item, quantity: 1 });
        }

        saveCartItems(cartItems);
    }

    // Render cart items
    function renderCart() {
        const cartItems = getCartItems();
        const cartTableBody = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        cartTableBody.innerHTML = '';

        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            totalPrice += subtotal;

            cartTableBody.innerHTML += `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" class="cart-item-image"></td>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td><input type="number" value="${item.quantity}" class="quantity-input" data-id="${item.id}"></td>
                    <td>$${subtotal}</td>
                    <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
                </tr>
            `;
        });

        totalPriceElement.textContent = `$${totalPrice}`;
    }

    // Add item to cart if itemId is present in the query params
    if (itemId) {
        const item = items.find(item => item.id === itemId);
        if (item) {
            addToCart(item);
            window.location.href = 'add-to-cart.html'; // Redirect to Add to Cart page
        }
    }

    renderCart();

    // Event listener to handle item removal from cart
    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const itemId = parseInt(event.target.dataset.id);
            let cartItems = getCartItems();
            cartItems = cartItems.filter(item => item.id !== itemId);
            saveCartItems(cartItems);
            renderCart();
        }
    });

    // Event listener to handle quantity change in cart
    document.getElementById('cart-items').addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const itemId = parseInt(event.target.dataset.id);
            const quantity = parseInt(event.target.value);
            let cartItems = getCartItems();
            const item = cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity = quantity;
                saveCartItems(cartItems);
                renderCart();
            }
        }
    });
});

// Event listener to handle adding items to cart and wishlist
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.item');
            const itemId = item.getAttribute('data-id');
            addToCart(itemId);
        });
    });

    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.item');
            const itemId = item.getAttribute('data-id');
            addToWishlist(itemId);
        });
    });

    // Add item to cart
    function addToCart(itemId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (!cartItems.includes(itemId)) {
            cartItems.push(itemId);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Add item to wishlist
    function addToWishlist(itemId) {
        let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        if (!wishlistItems.includes(itemId)) {
            wishlistItems.push(itemId);
        }
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
});

// Event listener to handle wishlist display and item removal
document.addEventListener('DOMContentLoaded', function () {
    const wishlistContainer = document.querySelector('.wishlist-container');
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    if (wishlistContainer) {
        renderWishlist();
    }

    function renderWishlist() {
        const wishlistList = document.querySelector('.wishlist-items');
        wishlistList.innerHTML = '';

        wishlistItems.forEach(itemId => {
            const item = getItemDetails(itemId); // Implement getItemDetails() based on your data structure
            const wishlistItem = document.createElement('div');
            wishlistItem.classList.add('wishlist-item');
            wishlistItem.setAttribute('data-id', itemId);
            wishlistItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="wishlist-item-image">
                <div class="wishlist-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="buy-now" data-id="${itemId}">Buy Now</button>
                    <button class="add-to-cart" data-id="${itemId}">Add to Cart</button>
                    <button class="remove-from-wishlist" data-id="${itemId}">Remove</button>
                </div>
            `;
            wishlistList.appendChild(wishlistItem);
        });

        // Event listeners for wishlist buttons
        document.querySelectorAll('.remove-from-wishlist').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                removeFromWishlist(itemId);
            });
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                addToCart(itemId);
            });
        });
    }

    function removeFromWishlist(itemId) {
        wishlistItems = wishlistItems.filter(id => id !== itemId);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        renderWishlist();
    }

    function addToCart(itemId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (!cartItems.includes(itemId)) {
            cartItems.push(itemId);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function getItemDetails(itemId) {
        // Implement this function based on your data structure
        // Example:
        const items = [
            { id: '1', name: 'Jewelry Item 1', description: 'Description for Jewelry Item 1', image: 'images/jewelry1.jpg' },
            { id: '2', name: 'Jewelry Item 2', description: 'Description for Jewelry Item 2', image: 'images/jewelry2.jpg' },
            { id: '3', name: 'Jewelry Item 3', description: 'Description for Jewelry Item 3', image: 'images/jewelry3.jpg' }
        ];
        return items.find(item => item.id === itemId);
    }
});

// Assuming the location is stored in localStorage after registration
document.addEventListener('DOMContentLoaded', function() {
    var userLocation = localStorage.getItem('user-location');
    if (userLocation) {
        document.getElementById('user-location').textContent = userLocation;
    }
});

// You would store the location like this after registration:
document.querySelector('#user-register-form').addEventListener('submit', function() {
    var location = document.getElementById('user-address').value;
    localStorage.setItem('user-location', location);
});
