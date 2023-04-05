<?php
include "head.php";
?>

<div id="content-container">
  <h1>KASSA</h1>
  <p><b>Betalningsinformation</b></p>
  <p>
    Faktura med 14 dagars betalningsvillkor skickas via E-post. Vänligen
    kolla skräpposten om mailet ej erhålles.
  </p>
  <p>Pappersfaktura skickas också med beställningen.</p>
  <p>Vänligen betala inte innan du fått beställningen</p>
  <br />
  <form action="tack.php" method="post" id="varukorg-form">
    <div class="kassa-cart-färg-antal">Färg:</div>
    <div class="kassa-cart-färg-antal">Antal:</div>
    <div id="kassa-items"></div>
    <br />
    <div id="kassa-totalsum"></div>
    Totalt:
    <input readonly type="text" id="kassa-sum" class="disabled-input-fields" name="totalsum" />
    kr
    <p><a href='varukorg.php'>Ändra</a></p>
    <p><b>100kr rabatt för förstagångskunder läggs till automatiskt efter köp!</b></p>
    <br />
    <div id="kassa-order-details">
      <label for="email">E-postadress:</label>
      <br />
      <input type="email" id="email" name="email" required />
      <br /><br />
      <label for="name">Namn:</label>
      <br />
      <input type="text" id="name" name="fullname" required />
      <br /><br />
      <label for=" street">Gatuadress:</label>
      <br />
      <input type="text" id="street" name="street" required />
      <br /><br />
      <label for="zip">Postnummer:</label>
      <br />
      <input type="text" id="zip" name="zip" required />
      <br /><br />
      <label for="town">Ort:</label>
      <br />
      <input type="text" id="town" name="town" required />
      <br />
      <br />
      Jag har läst och godkänner
      <label for="checkbox">
        <b><a href="kopvillkor.php" target="_blank">köpvillkoren</a></b>
      </label>
      <input type="checkbox" id="checkbox" name="checkbox" required />
      <br />
      <br />
      <button type="submit" class="button-large">Slutför köp</button>
    </div>
  </form>
</div>

<?php
include "foot.php";
?>