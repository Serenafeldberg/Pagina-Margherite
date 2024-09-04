// Inicializar el carrito desde localStorage si existe, sino iniciar vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

// Inicializar el total del carrito
cart.forEach(item => {
    cartTotal += item.price * item.quantity;
});


function addToCart(productName, productPrice, productImage) {
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // Si el producto ya está, incrementar su cantidad
        existingItem.quantity += 1;
    } else {
        // Si no está, agregarlo con cantidad 1
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    cartTotal += productPrice;

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}


function updateCart() {
    // Calcular el total de productos
    let totalProducts = 0;
    cart.forEach(item => {
        totalProducts += item.quantity;
    });
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = totalProducts;
    }

    // Calcular el total a pagar
    let totalToPay = 0;
    cart.forEach(item => {
        totalToPay += item.price * item.quantity;
    });
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.innerText = totalToPay.toFixed(2);
    }

    // Mostrar los productos en el carrito
    displayCart();
}

function removeFromCart(productName) {
    // Filtrar el carrito para eliminar el producto especificado
    cart = cart.filter(item => item.name !== productName);
    cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}


function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // Limpiar contenido previo

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.style.width = '100px';
        itemImage.style.height = 'auto';

        const itemText = document.createElement('div');
        itemText.innerText = `${item.name} - $${item.price} x ${item.quantity}`;

        // Controles para aumentar o disminuir cantidad
        const controls = document.createElement('div');
        controls.classList.add('controls');

        const decreaseButton = document.createElement('button');
        decreaseButton.innerText = '-';
        decreaseButton.onclick = () => updateQuantity(item.name, -1);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.classList.add('quantity');
        quantityDisplay.innerText = item.quantity;

        const increaseButton = document.createElement('button');
        increaseButton.innerText = '+';
        increaseButton.onclick = () => updateQuantity(item.name, 1);

        controls.appendChild(decreaseButton);
        controls.appendChild(quantityDisplay);
        controls.appendChild(increaseButton);

        itemElement.appendChild(itemImage);
        itemElement.appendChild(itemText);
        itemElement.appendChild(controls);

        cartItems.appendChild(itemElement);
    });

    cartTotalElement.innerText = cartTotal.toFixed(2);
}

function updateQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);

    if (item) {
        item.quantity += change;

        // Eliminar el producto si la cantidad llega a cero
        if (item.quantity <= 0) {
            cart = cart.filter(i => i !== item);
        } else {
            cartTotal += item.price * change;
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Función para manejar el formulario de búsqueda
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    window.location.href = `search.html?q=${encodeURIComponent(searchInput)}`;
});

// Mostrar los resultados de búsqueda en la página de resultados
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const resultsContainer = document.getElementById('results-container');

    if (query && resultsContainer) {
        const filteredProducts = filterProducts(query);

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-item');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Agregar al carrito</button>
                `;
                resultsContainer.appendChild(productElement);
            });
        } else {
            resultsContainer.innerHTML = `<p>No se encontraron los productos</p>`;
        }
    }
});

// Función que filtra los productos basados en el término de búsqueda
function filterProducts(query) {
    const allProducts = [
      { name: 'Vela de Lavanda', price: 3000, image: 'imgs/img1.png' },
      { name: 'Aromatizante Floral', price: 6000, image: 'imgs/img1.png' },
      { name: 'Jabón Artesanal', price: 2000, image: 'imgs/img1.png' },
      { name: 'Vela de Vainilla', price: 3000, image: 'imgs/img1.png' }
    ];
  
    return allProducts.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
  }

// Función para manejar la suscripción
function subscribe(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const emailInput = document.getElementById('subscribe-email').value;
    
    // Aquí debes agregar la lógica para guardar el correo electrónico
    // Por ejemplo, podrías enviar el correo a tu servidor o almacenarlo en localStorage
    console.log('Correo electrónico para suscripción:', emailInput);

    // Ejemplo de mensaje de éxito
    alert('¡Gracias por suscribirte!');

    // Limpiar el campo de entrada
    document.getElementById('subscribe-email').value = '';
}

// Llamar a updateCart al cargar la página para mostrar el estado actual del carrito
updateCart();