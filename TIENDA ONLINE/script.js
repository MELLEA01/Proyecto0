
    let cartCount = 0;

    function addToCart() {
        cartCount++;
        document.querySelector('.content-shopping-cart .number').textContent = `(${cartCount})`;
    }

    // Asignar la función al botón de añadir al carrito
    const addCartButtons = document.querySelectorAll('.add-cart');
    addCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    const searchForm = document.querySelector('.search-form');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario
        const searchTerm = searchForm.querySelector('input[type="search"]').value;
        alert(`Buscando: ${searchTerm}`);
    });

    // Esperar a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        // Seleccionar todos los enlaces con la clase 'open-tab'
        const openTabLinks = document.querySelectorAll('.open-tab');

        // Agregar un evento de clic a cada enlace
        openTabLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
                const url = this.getAttribute('href'); // Obtener la URL del enlace
                window.open(url, '_blank'); // Abrir la URL en una nueva pestaña
            });
        });
    });

  const cart = [];
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');

  // Detectar botones de agregar al carrito
  document.querySelectorAll('.add-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productCard = btn.closest('.card-product');
      const name = productCard.querySelector('h3').textContent;
      const priceText = productCard.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace('Q', '').trim());

      cart.push({ name, price });
      updateCart();
    });
  });

  function updateCart() {
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - Q${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">X</button>
      `;
      cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = total.toFixed(2);
    cartCountEl.textContent = cart.length;
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  function clearCart() {
    cart.length = 0;
    updateCart();
  }

  function openCart() {
    document.getElementById('cart').style.display = 'block';
  }

  function closeCart() {
    document.getElementById('cart').style.display = 'none';
  }

  // Manejar envío del formulario
  document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    const formData = new FormData(this);
    const resumen = `
Método de pago: ${formData.get('metodoPago')}
Dirección: ${formData.get('direccion')}
Zona: ${formData.get('zona')}
Departamento: ${formData.get('departamento')}
Total a pagar: Q${cartTotalEl.textContent}
    `;

    alert('¡Compra finalizada!\n\n' + resumen);
    clearCart();
    closeCart();
    this.reset();
  });

