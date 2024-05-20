<!DOCTYPE html>
<html lang="en">

<head>

  <style>
    /* Style to hide the div */
    .hidden {
      display: none;
    }
  </style>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-D99WQL446F"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-D99WQL446F');
  </script>

  <!-- Facebook Pixel Code -->
  <script>
    ! function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '156911164805454');
    fbq('track', 'PageView');
  </script>
  <noscript>
    <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=156911164805454&ev=PageView&noscript=1" />
  </noscript>
  <!-- End Facebook Pixel Code -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
  <title>Hårfiber KeraLux, dölj tunnhårighet på en minut</title>
  <link rel="stylesheet" href="css/style.css" />
  <?php
  $uri = $_SERVER['REQUEST_URI'];
  if (str_contains($uri, 'backend') || str_contains($uri, 'chart')) {
    echo '<link rel="stylesheet" href="css/backend.css" />';
  }
  ?>
</head>

<body>
  <nav id="menu" class="menu">
    <a href="#" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index.php" class="logo"><img src="images/logo.png" alt="logo" /></a>
    <a href="harfiber.php">Butik</a>
    <a href="foreefter.php">Före / efter</a>
    <a href="fragor-svar.php">Frågor & svar</a>
    <a href="kopvillkor.php">Köpvillkor</a>
    <a href="kontakt.php">Kontakt</a>
    <a href="varukorg.php">Varukorg</a>
    <div id="desktop-header-cart-qty-number"></div>
    <a href="varukorg.php">
      <img src="images/shopping-bag.png" id="cart-icon" alt="cart" />
    </a>
  </nav>

  <header>
    <a href="#" class="menu-icon" onclick="openNav()">
      <img src="images/mobile-menu-icon.png" alt="menu" />
    </a>
    <a href="index.php" class="logo">
      <img src="images/logo.png" alt="logo" />
    </a>
    <div id="header-cart-qty-number"></div>
    <a href="varukorg.php" class="cart-icon">
      <img src="images/shopping-bag.png" alt="cart" />
    </a>
  </header>