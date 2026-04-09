let cart = [];
let total = 0;

function addToCart(itemName, price) {
  cart.push({ name: itemName, price: price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(div);
    });
  }

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  total = 0;
  updateCart();
  document.getElementById("checkout").style.display = "none";
}

function showCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  document.getElementById("checkout").style.display = "block";
  document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
}

function placeOrder() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const note = document.getElementById("customer-note").value.trim();
  const orderMessage = document.getElementById("order-message");

  if (!name || !phone || !email) {
    orderMessage.textContent = "Please fill in your name, phone number, and email.";
    return;
  }

  let orderSummary = "Order Summary:%0A";
  cart.forEach((item) => {
    orderSummary += `- ${item.name} ($${item.price.toFixed(2)})%0A`;
  });

  orderSummary += `%0ATotal: $${total.toFixed(2)}%0A`;
  orderSummary += `Name: ${name}%0A`;
  orderSummary += `Phone: ${phone}%0A`;
  orderSummary += `Email: ${email}%0A`;
  orderSummary += `Details: ${note}`;

  orderMessage.innerHTML = `
    Thank you, ${name}! Your order is ready to send.<br><br>
    <a href="mailto:kairosdesignz@gmail.com?subject=New Kairos Designz Order&body=${orderSummary}">
      Click here to Place Your Order by Email
    </a>
  `;
}

function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightbox.style.display = "flex";
  lightboxImg.src = imageSrc;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}