// ==================== DATA / DEFAULT PRODUCTS ====================

// Default data (only used first time)
const uniqueComponents = [
  "Arduino UNO R3", "Arduino Mega 2560", "Arduino Nano",
  "ESP32 Dev Board", "Raspberry Pi 4 Model B",
];

const componentPrices = {
  "Arduino UNO R3": 575,
  "Arduino Mega 2560": 950,
  "Arduino Nano": 250,
  "ESP32 Dev Board": 350,
  "Raspberry Pi 4 Model B": 4899,
};

// ==================== LOAD OR CREATE PRODUCTS ====================
let products = JSON.parse(localStorage.getItem("productsData")) ||
  uniqueComponents.map(name => ({
    name,
    price: componentPrices[name] ?? 50,
    image: `https://via.placeholder.com/150?text=${encodeURIComponent(name)}`
  }));

function saveProducts() {
  localStorage.setItem("productsData", JSON.stringify(products));
}

// ==================== ADMIN LOGIN ====================
let isAdmin = false;

function adminLogin() {
  const pass = prompt("Enter admin password:");
  if (pass === "admin123") {
    isAdmin = true;
    alert("Admin mode activated!");
    displayProducts(products);
  } else {
    alert("Wrong password!");
  }
}

// ==================== DISPLAY PRODUCTS ====================
const initialDisplayCount = 50;

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
        <button onclick="changeImageByUrl('${product.name}')">Change URL</button>
        <button onclick="triggerFileUpload('${product.name}')">Upload Image</button>
        <input type="file" id="fileUpload-${product.name}" style="display:none" accept="image/*">
      ` : ""}
    `;
    container.appendChild(card);
  });
}

// ==================== REPLACE IMAGE: URL ====================
function changeImageByUrl(name) {
  if (!isAdmin) return;

  const url = prompt(`Enter new image URL for ${name}:`);
  if (!url) return;

  const p = products.find(x => x.name === name);
  p.image = url;

  saveProducts();
  displayProducts(products);
}

// ==================== REPLACE IMAGE: FILE UPLOAD ====================
function triggerFileUpload(name) {
  if (!isAdmin) return;

  const input = document.getElementById(`fileUpload-${name}`);
  input.onchange = () => {
    const file = input.files[0];
    if (file && file.type.startsWith("image/")) {
      const imgURL = URL.createObjectURL(file);
      const p = products.find(x => x.name === name);
      p.image = imgURL;

      saveProducts();
      displayProducts(products);
    }
  };
  input.click();
}

// ==================== ADD NEW PRODUCT (ADMIN ONLY) ====================
function addNewProduct() {
  if (!isAdmin) {
    alert("Only admin can add products!");
    return;
  }

  const name = document.getElementById("newProductName").value.trim();
  const price = parseFloat(document.getElementById("newProductPrice").value);
  const file = document.getElementById("newProductImage").files[0];

  if (!name) return alert("Enter a product name!");
  if (isNaN(price) || price <= 0) return alert("Enter valid price!");

  let imgURL = `https://via.placeholder.com/150?text=${encodeURIComponent(name)}`;
  if (file && file.type.startsWith("image/")) {
    imgURL = URL.createObjectURL(file);
  }

  products.unshift({ name, price, image: imgURL });

  saveProducts();
  displayProducts(products);

  document.getElementById("newProductName").value = "";
  document.getElementById("newProductPrice").value = "";
  document.getElementById("newProductImage").value = "";
}

// ==================== CART LOGIC ====================
let cart = [];

function addToCart(name) {
  const p = products.find(p => p.name === name);
  if (p) {
    cart.push(p);
    updateCart();
  }
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
    document.getElementById("cart-count").textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    container.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <button onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;
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

  let msg = "Hello, I'd like to buy the following items:\n";
  cart.forEach(item => msg += `- ${item.name}: ₹${item.price}\n`);
  msg += `Total: ₹${cart.reduce((s, i) => s + i.price, 0)}`;

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
  topBtn.style.display =
    window.scrollY > 200 ? "block" : "none";
};

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==================== INITIALIZE ====================
displayProducts(products);
updateCart();
