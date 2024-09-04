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




// Llamar a updateCart al cargar la página para mostrar el estado actual del carrito
updateCart();

// Función para manejar el formulario de búsqueda
// function search(event) {
//     event.preventDefault(); // Prevenir el envío del formulario por defecto

//     const searchInput = document.getElementById('search-input').value.toLowerCase();
    
//     // Aquí debes agregar la lógica para realizar la búsqueda real
//     // Por ejemplo, podrías buscar en una base de datos o filtrar productos en la página
//     console.log('Buscar:', searchInput);

//     // Ejemplo: Redireccionar a una página de resultados de búsqueda (puedes ajustar esto según tus necesidades)
//     window.location.href = `search.html?q=${encodeURIComponent(searchInput)}`;
// }

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

