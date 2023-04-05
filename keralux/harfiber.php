<?php
include "head.php";
?>

<div id="content-container">
  <h1>HÅRFIBER KERALUX, BUTIK</h1>
  <div id="butik-top-flex">
    <img src="images/hårfiber-toppbild.jpg" class="center-image" alt="butik" />
    <br /><br /><br />
    <div id="butik-text">
      <p><b>OBS: Fri frakt!</b></p>
      <p>
        Det är billigt och enkelt att dölja tunt hår och håravfall. En
        burk på 28g täcker två månaders dagligt användande, och ofta så
        räcker en burk betydligt längre än så.
      </p>
      <p>
        OBS! En burk KeraLux rymmer 28g hårfibrer. Det betyder att du får
        mer än dubbelt så mycket hårfibrer för samma pengar jämfört med
        den största konkurrenten. Om du mot förmodan inte skulle vara nöjd
        med produkten så kan du kontakta oss för att begära dina pengar
        tillbaka. KeraLux är hårfibrer av allra högsta kvalitét och vi är
        säkra på att du kommer att bli nöjd med ditt köp.
      </p>
    </div>
  </div>
  <div id="product-cards">
    <div class="product-card">
      <img src="images/Black.jpg" alt="keralux-black" />
      <div class="product-title-name">KERALUX LARGE 28G BLACK</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('Black', 299)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/DarkBrown.jpg" alt="keralux-dark-brown" />
      <div class="product-title-name">KERALUX LARGE 28G DARK BROWN</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('DarkBrown', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/MediumBrown.jpg" alt="keralux-m-brown" />
      <div class="product-title-name">KERALUX LARGE 28G MEDIUM BROWN</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('MediumBrown', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/LightBrown.jpg" alt="keralux-l-brown" />
      <div class="product-title-name">KERALUX LARGE 28G LIGHT BROWN</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('LightBrown', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/MediumBlonde.jpg" alt="keralux-m-blonde" />
      <div class="product-title-name">KERALUX LARGE 28G MEDIUM BLONDE</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('MediumBlonde', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/Blonde.jpg" alt="keralux-blonde" />
      <div class="product-title-name">KERALUX LARGE 28G BLONDE</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('Blonde', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/LightBlonde.jpg" alt="keralux-l-blonde" />
      <div class="product-title-name">KERALUX LARGE 28G LIGHT BLONDE</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('LightBlonde', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/Grey.jpg" alt="keralux-grey" />
      <div class="product-title-name">KERALUX LARGE 28G GREY</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('Grey', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/White.jpg" alt="keralux-white" />
      <div class="product-title-name">KERALUX LARGE 28G WHITE</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('White', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/RedAuburn.jpg" alt="keralux-red" />
      <div class="product-title-name">KERALUX LARGE 28G RED AUBURN</div>
      <div class="product-card-price">299kr</div>
      <button type="submit" class="buy-button" onclick="addToCart('RedAuburn', 299, 1)">
        Lägg i varukorg
      </button>
    </div>
    <div class="product-card">
      <img src="images/Spray.jpg" alt="applikator" />
      <div class="product-title-name">KERALUX APPLIKATOR / PUMP</div>
      <div class="product-card-price">149kr</div>
      <div>
        Sprayapplikatorn gör det enklare att applicera fibrer över ett
        stort område för den som använder mycket hårfiber. Skruvas enkelt
        fast på toppen på burken.
      </div>
      <br />
      <button type="submit" class="buy-button" onclick="addToCart('Spray', 149, 1)">
        Lägg i varukorg
      </button>
    </div>
  </div>
</div>

<?php
include "foot.php";
?>