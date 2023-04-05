// Koden liknar den i varukorg.js, (dock inte exakt för checkSkusAndAdd)
// Kolla där om info behövs

cartObj = {};
for (var i = 0; i < cartItems.length; ++i) {
  if (!cartObj[cartItems[i]]) {
    cartObj[cartItems[i]] = 1;
  } else {
    cartObj[cartItems[i]] = cartObj[cartItems[i]] + 1;
  }
}

function checkSkusAndAdd(sku) {
  if (cartObj.hasOwnProperty(sku)) {
    document.getElementById("kassa-items").innerHTML +=
      "<div class='kassa-item'>" +
      "<input readonly type='text' class='disabled-input-fields' value='" +
      sku +
      "' name='" +
      sku +
      "'>" +
      "<input readonly type='text' class='disabled-input-fields' value='" +
      cartObj[sku] +
      "' name='" +
      sku +
      "Qty'></div>";
  }
}

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

document.getElementById("kassa-sum").value = totalSum;

if (totalSum <= 0) {
  document.getElementsByTagName("button")[0].disabled = true;
}
