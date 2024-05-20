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
  <br />
  <div>
    <center>
      <video controls preload="metadata" width="654" height="480">
        <source src="keralux.mp4#t=0.001" type="video/mp4">
      </video>
      <p>Denna video visar hur hårfiber fungerar.</p>
    </center>
  </div>

  <div id="reviews">




    <!-- <a href="#" id="showLink">Visa och lämna recensioner</a> -->





    <div id="hiddenDiv" class="hiddenDiv">
      <div class="review">
        <p class="reviewScore">&#11088 &#11088 &#11088 &#11088 &#11088</p>
        <p class="reviewName">Britt-Marie</p>
        <p class="reviewText">Mycket bra, funkar</p>
        <hr class="reviewHR">
      </div>
      <div class="review">
        <p class="reviewScore">&#11088 &#11088 &#11088 &#11088 &#11088</p>
        <p class="reviewName">Pia Lindström</p>
        <p class="reviewText">Måste säga &#128077;</p>
        <hr class="reviewHR">
      </div>
      <div class="review">
        <p class="reviewScore">&#11088 &#11088 &#11088 &#11088 &#11088</p>
        <p class="reviewName">Elisabeth Norén</p>
        <p class="reviewText">Väldigt bra produkt, räcker länge</p>
        <hr class="reviewHR">
      </div>
      <div class="review">
        <p class="reviewScore">&#11088 &#11088 &#11088 &#11088 &#11088</p>
        <p class="reviewName">Eva Nilsson</p>
        <p class="reviewText">Trodde inte att det skulle fungera men det funkar riktigt bra, kul!!</p>
        <hr class="reviewHR">
      </div>
      <div class="review">
        <p class="reviewScore">&#11088 &#11088 &#11088 &#11088</p>
        <p class="reviewName">Per-Håkan L</p>
        <p class="reviewText">Bra</p>
        <hr class="reviewHR">
      </div>
      <div class="review">
        <p class="reviewScore">&#11088 &#11088 &#11088 &#11088</p>
        <p class="reviewName">Inger</p>
        <p class="reviewText">Jättebra men lite svårt att se hur mycket som är kvar i burken</p>
        <hr class="reviewHR">
      </div>
      <br />

      <!-- <a href="#" id="showLinkLeaveReview">Skriv recension</a>
      <div id="hiddenDivLeaveReview" class="hiddenDivLeaveReview">
        <br /><br />
        <p class="leaveReviewTitle">Lämna en recension</p>
        <form action="submit-review.php" method="post">
          <label for="name">Namn:</label>
          <br />
          <input type="text" id="leaveReviewName" name="username">
          <br />
          <label for="rating">Betyg:</label>
          <br />
          <select name="leaveReviewRating" id="leaveReviewRating">
            <option value="1">☆</option>
            <option value="2">☆☆</option>
            <option value="3">☆☆☆</option>
            <option value="4">☆☆☆☆</option>
            <option value="5">☆☆☆☆☆</option>
          </select>
          <br />
          <label for="review">Recension:</label>
          <br />
          <input type="text" id="leaveReviewTextArea" name="review"></textarea>
          <br>
          <button type="submit">Skicka</button>

        </form>
      </div> -->
    </div>
  </div>

  <!-- <script>
    document.getElementById('showLink').addEventListener('click', function() {
      event.preventDefault();
      var hiddenDiv = document.getElementById('hiddenDiv');
      hiddenDiv.classList.toggle('hiddenDiv');
    });

    document.getElementById('showLinkLeaveReview').addEventListener('click', function() {
      event.preventDefault();
      var hiddenDivLeaveReview = document.getElementById('hiddenDivLeaveReview');
      hiddenDivLeaveReview.classList.toggle('hiddenDivLeaveReview');
    });
  </script> -->

  <!-- <script>
    document.getElementById('showLink').addEventListener('click', function(event) {
      event.preventDefault();
      var hiddenDiv = document.getElementById('hiddenDiv');
      if (hiddenDiv.style.display === 'none') {
        hiddenDiv.style.display = 'block';
      } else {
        hiddenDiv.style.display = 'none';
      }
    });
  </script> -->

  <!-- <script>
    document.getElementById('showLink').addEventListener('click', function(event) {
      event.preventDefault();
      var hiddenDiv = document.getElementById('hiddenDiv');
      hiddenDiv.style.display = 'block';
    });
  </script> -->

  <!-- <script>
    document.getElementById('showLink').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      var hiddenDiv = document.getElementById('hiddenDiv');

      // Toggle the hidden class to show or hide the hidden div
      hiddenDiv.classList.toggle('hidden');
    });
  </script> -->




  <br /><br />
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
      <p>Just nu begränsat lager, bara en vara går att beställa i taget</p>
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