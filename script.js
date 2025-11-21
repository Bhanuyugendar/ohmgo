// ==================== DEFAULT DATA ====================
const defaultComponents = [
  "Arduino UNO R3", "Arduino Mega 2560", "Arduino Nano",
  "ESP32 Dev Board", "Raspberry Pi 4 Model B"
];

const componentPrices = {
  "Arduino UNO R3": 575,
  "Arduino Mega 2560": 950,
  "Arduino Nano": 250,
  "ESP32 Dev Board": 350,
  "Raspberry Pi 4 Model B": 4899
};

// ==================== LOAD PRODUCTS FROM LOCALSTORAGE ====================
let products = JSON.parse(localStorage.getItem("productsData")) ||
  defaultComponents.map(name => ({
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
function displayProducts(list) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${product.name}')">Add to Cart</button>
      ${isAdmin ? `
        <button onclick="changeImageByUrl('${product.name}')">Change URL</button>
        <button onclick="triggerFileUpload('${product.name}')">Upload Image</button>
        <input type="file" accept="image/*" style="display:none" id="fileUpload-${product.name}">
      ` : ""}
    `;

    container.appendChild(card);
  });
}

// ==================== CHANGE IMAGE BY URL (ADMIN) ====================
function changeImageByUrl(name) {
  if (!isAdmin) return;

  const newUrl = prompt(`Enter new image URL for ${name}:`);
  if (!newUrl) return;

  const p = products.find(x => x.name === name);
  p.image = newUrl;

  saveProducts();
  displayProducts(products);
}

// ==================== UPLOAD IMAGE FILE (ADMIN) ====================
function triggerFileUpload(name) {
  if (!isAdmin) return;

  const input = document.getElementById(`fileUpload-${name}`);
  input.onchange = () => handleFileUpload(name, input.files[0]);
  input.click();
}

// Convert uploaded image to Base64
function handleFileUpload(name, file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64Image = e.target.result;

    const p = products.find(x => x.name === name);
    p.image = base64Image;

    saveProducts();
    displayProducts(products);
  };
  reader.readAsDataURL(file);
}

// ==================== ADD NEW PRODUCT (ADMIN) ====================
function addNewProduct() {
  if (!isAdmin) {
    alert("Only admin can add products!");
    return;
  }

  const name = document.getElementById("newProductName").value.trim();
  const price = parseFloat(document.getEle
