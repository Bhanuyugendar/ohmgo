// ==================== LOAD SAVED PRODUCTS OR DEFAULT ====================
let products = JSON.parse(localStorage.getItem("productsData")) || uniqueComponents.map(name => {
  const price = componentPrices[name] || 50;
  const image = `https://via.placeholder.com/150?text=${encodeURIComponent(name)}`;
  return { name, price, image };
});

function saveProducts() {
  localStorage.setItem("productsData", JSON.stringify(products));
}

// ==================== ADMIN LOGIN ====================
let isAdmin = false;

function adminLogin() {
  const pass = prompt("Enter Admin Password:");
  if (pass === "admin123") {
    isAdmin = true;
    alert("Admin Mode Activated");
    displayProducts(products);
  } else {
    alert("Wrong Password!");
  }
}

// ==================== DISPLAY PRODUCTS ====================
const initialDisplayCount = 30;

function displayProducts(list) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  const toShow = list.slice(0, initialDisplayCount);

  toShow.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart('${product.name}')">Add to Cart</button>

      ${isAdmin ? `
        <button onclick="triggerFileUpload('${product.name}')">Upload Image</button>
        <input type="file" id="fileUpload-${product.name}" accept="image/*" style="display:none;">
      ` : ""}
    `;

    container.appendChild(card);
  });
}

// ==================== FILE UPLOAD FOR IMAGE (ADMIN) ====================
function triggerFileUpload(name) {
  if (!isAdmin) return;

  const input = document.getElementById(`fileUpload-${name}`);
  input.onchange = () => uploadImageFile(name, input.files[0]);
  input.click();
}

function uploadImageFile(name, file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Image = e.target.result;

    const p = products.find(p => p.name === name);
    p.image = base64Image;

    saveProducts();
    displayProducts(products);
  };

  reader.readAsDataURL(file);
}

// ==================== CART ====================
let cart = [];

function addToCart(name) {
  const p = products.find(p => p.name === name);
  cart.push(p);
  updateCart();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  updateCart();
}

function updateCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "";
    document.getElementById("continue-btn").style.display = "none";
    document.getElementById("cart-count").textContent = 0;
    return;
  }

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="removeFromCart(${i})">Remove</button>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `Total: ₹${total}`;
  document.getElementById("continue-btn").style.display = "block";
  document.getElementById("cart-count").textContent = cart.length;
}

// ==================== WHATSAPP CHECKOUT ====================
function showWhatsAppCheckout() {
  document.getElementById("whatsapp-checkout").style.display = "block";
}

function checkoutWhatsApp() {
  if (cart.length === 0) return;

  let msg = "Hello, I want to buy these items:\n";
  cart.forEach(item => msg += `- ${item.name} : ₹${item.price}\n`);
  msg += `Total: ₹${cart.reduce((a, b) => a + b.price, 0)}`;

  window.open(`https://wa.me/919010532390?text=${encodeURIComponent(msg)}`, "_blank");
}

// ==================== SEARCH ====================
document.getElementById("search").addEventListener("input", function () {
  const val = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(val));
  displayProducts(filtered.length ? filtered : products);
});

// ==================== BACK TO TOP ====================
const topBtn = document.getElementById("backToTopBtn");
window.onscroll = () => {
  topBtn.style.display = (document.documentElement.scrollTop > 200) ? "block" : "none";
};
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ==================== INITIAL LOAD ====================
displayProducts(products);
updateCart();
