<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1046599495"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'AW-1046599495');
  </script>
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
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-7102368-87"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-7102368-87');
  </script>
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