// ==================== COMPONENT NAMES (1000 UNIQUE) ====================
const uniqueComponents = [
"Arduino UNO R3","Arduino Mega 2560","Arduino Nano","Arduino Leonardo","Arduino Micro",
"ESP32 Dev Board","ESP8266 NodeMCU","Raspberry Pi 4 Model B","Raspberry Pi 3 Model B+","Raspberry Pi Zero W",
"Raspberry Pi Pico","Breadboard Small","Breadboard Large","Jumper Wires Male to Male","Jumper Wires Male to Female",
"Jumper Wires Female to Female","LED Red","LED Green","LED Blue","LED Yellow",
"LED RGB","Resistor 220Ω","Resistor 330Ω","Resistor 470Ω","Resistor 1kΩ",
"Resistor 2.2kΩ","Resistor 4.7kΩ","Resistor 10kΩ","Capacitor 10μF","Capacitor 22μF",
"Capacitor 47μF","Capacitor 100μF","Capacitor 1μF","Transistor BC547","Transistor BC557",
"Transistor 2N2222","Transistor 2N3904","Diode 1N4007","Diode 1N4148","Zener Diode 5.1V",
"Push Button Switch","Slide Switch","Toggle Switch","Potentiometer 10kΩ","Potentiometer 100kΩ",
"Buzzer Active","Buzzer Passive","Relay Module 1 Channel","Relay Module 2 Channel","Relay Module 4 Channel",
"Servo Motor SG90","Servo Motor MG90S","Servo Motor MG996R","Stepper Motor NEMA17","Stepper Motor 28BYJ-48",
"Stepper Motor Driver A4988","Stepper Motor Driver DRV8825","Ultrasonic Sensor HC-SR04","IR Sensor Module","IR Obstacle Sensor",
"IR Remote Control","Temperature Sensor LM35","Temperature & Humidity Sensor DHT11","Temperature & Humidity Sensor DHT22",
"Humidity Sensor","Light Sensor LDR","Flame Sensor","Gas Sensor MQ2","Gas Sensor MQ3",
"Gas Sensor MQ135","Water Level Sensor","Tilt Sensor Module","Joystick Module","Capacitive Touch Sensor TTP223",
"Hall Effect Sensor","Microphone Sound Sensor","Sound Sensor Module","RGB LED Module","LCD Display 16x2",
"LCD Display 20x4","OLED Display 0.96 inch","Keypad 4x4","Power Supply Module 5V/3A","Voltage Regulator 7805",
"Voltage Regulator LM317","DC Motor 6V","DC Motor 12V","Stepper Motor 28BYJ-48 ULN2003","Motor Driver L298N",
"Bluetooth Module HC-05","Bluetooth Module HC-06","WiFi Module ESP01","Relay Board 8 Channel","RFID Module RC522",
"RFID Reader","RFID Tags","GPS Module NEO-6M","Accelerometer ADXL345","Gyroscope MPU6050",
"IMU Sensor MPU6050","Magnetometer HMC5883L","Soil Moisture Sensor Capacitive","Soil Moisture Sensor Resistive","Water Flow Sensor",
"Rain Sensor","Photoresistor LDR","Gas Leak Sensor","Flame Detection Sensor","Smoke Sensor MQ2",
"CO2 Sensor","pH Sensor Module","Ultrasonic Water Level Sensor","Level Switch Sensor","Stepper Motor Encoder",
"Rotary Encoder Module","DC Motor Encoder","Micro Servo SG92R","Relay Solid State","Relay Optocoupler",
"Stepper Motor Shield","Motor Driver TB6612FNG","Stepper Motor Driver Shield","Laser Diode Module","Laser Sensor Module",
"Infrared Emitter","Infrared Receiver","Piezoelectric Sensor","Vibration Sensor","Magnetic Reed Switch",
"NeoPixel LED Strip","WS2812 LED Strip","LED Matrix 8x8","LED Matrix 16x16","7 Segment Display",
"4 Digit 7 Segment Display","Stepper Motor 42BYGHW208","Servo Motor Tower Pro","BME280 Sensor","BMP180 Sensor",
"BMP280 Sensor","DHT12 Sensor","DS18B20 Temperature Sensor","LM393 Sound Sensor","KY-038 Microphone Module",
"TCS3200 Color Sensor","TCS34725 Color Sensor","IR Break Beam Sensor","IR Reflective Sensor","IR Proximity Sensor",
"HC-SR501 PIR Sensor","PIR Motion Sensor","Capacitive Soil Moisture Sensor","Load Cell 5kg","Load Cell 10kg",
"HX711 Load Cell Amplifier","RTC Module DS1307","RTC Module DS3231","Fan DC 12V","Fan DC 5V",
"Motor Pulley","Timing Belt","Micro Switch","Tilt Switch","Reed Relay",
"Photo Diode","Photo Transistor","UV Sensor Module","IR Thermal Sensor","Gas Sensor MQ7",
"Gas Sensor MQ9","Sound Level Meter","Laser Receiver","Stepper Motor Driver Module","DC Motor Driver",
"Brushless Motor ESC","Brushless Motor","Hall Encoder","Encoder Module","Capacitive Touch Button",
// … Continue filling up to 1000 realistic component names
];

// ==================== PRICES ====================
const componentPrices = {
"Arduino UNO R3": 575,"Arduino Mega 2560": 950,"Arduino Nano": 250,"Arduino Leonardo": 550,"Arduino Micro": 500,
"ESP32 Dev Board": 350,"ESP8266 NodeMCU": 300,"Raspberry Pi 4 Model B": 4899,"Raspberry Pi 3 Model B+": 3999,"Raspberry Pi Zero W": 700,
"Raspberry Pi Pico": 150,"Breadboard Small": 100,"Breadboard Large": 150,"Jumper Wires Male to Male": 30,"Jumper Wires Male to Female": 35,
"Jumper Wires Female to Female": 40,"LED Red": 2,"LED Green": 2,"LED Blue": 2,"LED Yellow": 2,"LED RGB": 10,
"Resistor 220Ω": 1,"Resistor 330Ω": 1,"Resistor 470Ω": 1,"Resistor 1kΩ": 1,"Resistor 2.2kΩ": 2,"Resistor 4.7kΩ": 2,"Resistor 10kΩ": 2,
// … Continue mapping realistic prices for all 1000 components
};

// ==================== PRODUCTS ====================
const products = uniqueComponents.map(name=>{
const price = componentPrices[name] || 50;
const image = `images/${name}.jpg`;
return {name, price, image};
});

// ==================== DISPLAY PRODUCTS ====================
const initialDisplayCount = 30;
function displayProducts(list){
const container = document.getElementById("product-container");
container.innerHTML="";
const toShow = list.slice(0, initialDisplayCount);
toShow.forEach(product=>{
const card = document.createElement("div");
card.className="product-card";
card.innerHTML=`<img src="${product.image}" alt="${product.name}" onclick="changeImage('${product.name}')">
<h3>${product.name}</h3>
<p>Price: ₹${product.price}</p>
<button onclick="addToCart('${product.name}')">Add to Cart</button>`;
container.appendChild(card);
});
}

// ==================== EDIT IMAGE ====================
function changeImage(name){
const url = prompt(`Enter new image URL for ${name}:`);
if(url){
const p = products.find(p=>p.name===name);
p.image=url;
displayProducts(products);
}
}

// ==================== CART ====================
let cart=[];
function addToCart(name){
const p = products.find(p=>p.name===name);
cart.push(p);
updateCart();
}
function removeFromCart(i){ cart.splice(i,1); updateCart(); }
function updateCart(){
const container = document.getElementById("cart-items");
const totalEl = document.getElementById("total-price");
container.innerHTML="";
if(cart.length===0){
container.innerHTML="<p>Your cart is empty.</p>";
totalEl.textContent="";
document.getElementById("continue-btn").style.display="none";
document.getElementById("whatsapp-checkout").style.display="none";
document.getElementById("cart-count").textContent=0;
return;
}
let total=0;
cart.forEach((item,i)=>{
total+=item.price;
const div = document.createElement("div");
div.className="cart-item";
div.innerHTML=`<span>${item.name} - ₹${item.price}</span>
<button onclick="removeFromCart(${i})">Remove</button>`;
container.appendChild(div);
});
totalEl.textContent=`Total: ₹${total}`;
document.getElementById("continue-btn").style.display="block";
document.getElementById("cart-count").textContent = cart.length;
}

// ==================== WHATSAPP CHECKOUT ====================
function showWhatsAppCheckout(){ document.getElementById("whatsapp-checkout").style.display="block"; }
function checkoutWhatsApp(){
if(cart.length===0) return;
let msg="Hello, I want to buy these items:\n";
cart.forEach(item=>msg+=`- ${item.name} : ₹${item.price}\n`);
msg+=`Total: ₹${cart.reduce((a,b)=>a+b.price,0)}`;
window.open(`https://wa.me/919010532390?text=${encodeURIComponent(msg)}`,"_blank");
}

// ==================== SEARCH ====================
document.getElementById("search").addEventListener("input",function(){
const val = this.value.toLowerCase();
const filtered = products.filter(p=>p.name.toLowerCase().includes(val));
displayProducts(filtered.length ? filtered : products);
});

// ==================== BACK TO TOP ====================
const topBtn=document.getElementById("backToTopBtn");
window.onscroll=function(){
if(document.body.scrollTop>200 || document.documentElement.scrollTop>200) topBtn.style.display="block";
else topBtn.style.display="none";
};
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:'smooth'}));

// ==================== INITIAL LOAD ====================
displayProducts(products);
updateCart();
