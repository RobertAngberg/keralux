// Ta cartItems[] (från js.js) och gör till cartObj{}
// Loopa - om propertyn inte redan finns, skapa och sätt value till 1
// Else: om den redan finns, adda 1 till dess value
// Tänk: cartObj[Black[1]] vilket är samma som cartObj = {Black: 1}

cartObj = {};
for (var i = 0; i < cartItems.length; ++i) {
  if (!cartObj[cartItems[i]]) {
    cartObj[cartItems[i]] = 1;
  } else {
    cartObj[cartItems[i]] = cartObj[cartItems[i]] + 1;
  }
}

// Försökte skicka helt enkelt SKU som argument för buttonIncreaseClicked
// men det drog och jag vettefan... så nu känner den av ID istället

function checkSkusAndAdd(sku) {
  if (cartObj.hasOwnProperty(sku)) {
    document.getElementById("varukorg-cart").innerHTML +=
      "<div class='varukorg-item'>" +
      "<div class='varukorg-column-image'>" +
      "<img src='images/" +
      sku +
      ".jpg' /></div>" +
      "<div class='varukorg-column-sku'>KeraLux " +
      sku +
      " Large 28g</div>" +
      "<div class='varukorg-column-qty'>" +
      // Knapp öka
      "<button type='submit' id='" +
      sku +
      "' class='buttonIncrease" +
      sku +
      "' onclick='buttonIncreaseClicked(this.id)'>" +
      "+" +
      "</button>" +
      // Siffra
      cartObj[sku] +
      // Knapp minska
      "<button type='submit' id='" +
      sku +
      "' class='buttonDecrease" +
      sku +
      "' onclick='buttonDecreaseClicked(this.id)'>" +
      "-" +
      "</button>" +
      "</div></div>";
  }
}

// Spray kostar inte samma så kolla det först, sen push till cartItems och spara allt
function buttonIncreaseClicked(id) {
  if (id === "Spray") {
    totalSum = totalSum + 149;
  } else {
    totalSum = totalSum + 299;
  }
  cartItems.push(id);
  cartIconNumber++;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalSum", JSON.stringify(totalSum));
  localStorage.setItem("cartIconNumber", JSON.stringify(cartIconNumber));
  location.reload();
}

function buttonDecreaseClicked(id) {
  if (id === "Spray") {
    totalSum = totalSum - 149;
  } else {
    totalSum = totalSum - 299;
  }
  cartItems.splice(cartItems.indexOf(id), 1);
  cartIconNumber--;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalSum", JSON.stringify(totalSum));
  localStorage.setItem("cartIconNumber", JSON.stringify(cartIconNumber));
  location.reload();
}

// Kolla alla items om det finns några i cart
checkSkusAndAdd("Black");
checkSkusAndAdd("DarkBrown");
checkSkusAndAdd("MediumBrown");
checkSkusAndAdd("LightBrown");
checkSkusAndAdd("MediumBlonde");
checkSkusAndAdd("Blonde");
checkSkusAndAdd("LightBlonde");
checkSkusAndAdd("Grey");
checkSkusAndAdd("White");
checkSkusAndAdd("RedAuburn");
checkSkusAndAdd("Spray");

// När man klickar på öka eller minska så reloadas sidan, så att nedan körs
document.getElementById("varukorg-sum").innerHTML =
  "Totalt: <b>" + totalSum + "</b> kr";
