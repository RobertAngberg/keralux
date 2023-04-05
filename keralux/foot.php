      <footer>
        <p>Företaget innehar F-skattesedel och är momsregistrerat</p>
      </footer>
      <div id="offer-div">
        <p>Passa på! Nu får alla nya kunder 100kr rabatt på sin första beställning!
          Rabatten drages i kassan.</p>
      </div>
      <script src="./js/js.js"></script>
      <?php
      // Om URL:en ("uri") innehåller "varukorg", includa varukorg.js, etc
      $uri = $_SERVER['REQUEST_URI'];
      if (str_contains($uri, 'varukorg')) {
        echo '<script src="./js/varukorg.js"></script>';
      }
      if (str_contains($uri, 'kassa')) {
        echo '<script src="./js/kassa.js"></script>';
      }
      if (str_contains($uri, 'tack')) {
        echo '<script src="./js/tack.js"></script>';
      }
      if (str_contains($uri, 'chart')) {
        echo '<script src="./js/chart.js"></script>';
      }
      ?>
      </body>

      </html>