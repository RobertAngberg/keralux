// LocalStorage, spara items i cart, totala summan,
// samt antalet items i cart att visa bredvid cart icon

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalSum = parseInt(localStorage.getItem("totalSum")) || 0;
let cartIconNumber = parseInt(localStorage.getItem("cartIconNumber")) || 0;

// Nedan callas när man lägger något i cart från shop page

function addToCart(sku, price) {
  cartItems.push(sku);
  totalSum += price;
  cartIconNumber++;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalSum", JSON.stringify(totalSum));
  localStorage.setItem("cartIconNumber", JSON.stringify(cartIconNumber));

  changeCartNumber();
}

// Ändra text när man trycker på köpknapp under butik
window.onclick = (e) => {
  if (e.target.className === "buy-button") {
    e.target.innerHTML = "Tillagd! <br>Tryck igen för att lägga till fler.";
  }
};

// Nedan callas på page load (längst ner) samt vid addToCart.
// Uppdatera siffra vid cart icon

function changeCartNumber() {
  document.getElementById("header-cart-qty-number").textContent =
    cartIconNumber;
  document.getElementById("desktop-header-cart-qty-number").textContent =
    cartIconNumber;
}

// På mobil, ändra css vid tryck på menyknappen

function openNav() {
  document.getElementById("menu").style.width = "100%";
}

function closeNav() {
  document.getElementById("menu").style.width = "0";
}

changeCartNumber();
