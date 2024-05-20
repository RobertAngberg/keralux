<?php
include "head.php";
include "dbconnect.php";

$email = $_POST["email"];
$fullname = $_POST["fullname"];
$street = $_POST["street"];
$zip = $_POST["zip"];
$town = $_POST["town"];
$totalsum = $_POST["totalsum"];
$discount = 0;

// Space klipper av postnumret, ta bort space
$zip = str_replace(' ', '', $zip);

// Kolla först, innan insert, om email redan finns i db och kolla om discount
$sql = "SELECT email FROM orders WHERE email = '$email'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  // Finns i db, ingen discount, lagra i db
  $stmt = $conn->prepare("INSERT INTO orders (discount) VALUES (?)");
  $nej = "Nej";
  $discount = 0;
  $stmt->bind_param("s", $nej);
  $stmt->execute();
} else {
  // Finns ej i db; får discount, lagra i db
  $stmt = $conn->prepare("INSERT INTO orders (discount) VALUES (?)");
  $ja = "Ja";
  $discount = 100;
  $stmt->bind_param("s", $ja);
  $stmt->execute();
}

$last_id = mysqli_insert_id($conn);

// Lagra allt förutom items/skus i db
$stmt = $conn->prepare("UPDATE orders SET email=?, fullname=?, street=?, zip=?, town=?, totalsum=? WHERE id = ?");
$stmt->bind_param("sssisii", $email, $fullname, $street, $zip, $town, $totalsum, $last_id);
$stmt->execute();

// Loopa igenom alla skus och för match i $_POST lägg in antalet items/$skuQty
// $last_id, lägg märke till, tar id på den senaste insert into
$skus = array(
  "Black", "DarkBrown", "MediumBrown", "LightBrown", "MediumBlonde",
  "Blonde", "LightBlonde", "Grey", "White", "RedAuburn", "Spray"
);

foreach ($skus as $sku) {
  if (isset($_POST[$sku])) {
    if (isset($_POST[$sku . "Qty"])) {
      $skuQty = $_POST[$sku . "Qty"];
      $sql = $conn->prepare("UPDATE orders SET $sku = ? WHERE id = ?");
      $sql->bind_param("ii", $skuQty, $last_id);
      $sql->execute();
    }
  }
}

echo "<div id='tack-container'>";
echo "<p>Tack så mycket, " . $fullname . "! Din order är mottagen. Ditt ordernummer är " . $last_id . "</p>";
echo "<p>En bekräftelse ska ha skickats till " . $email . "</p>";
echo "<p>Om du inte fått den vänligen kolla din skräppost!</p>";
echo "</div>";

////////////////// Email ////////////////////

$to = $email;
$subject = "KeraLux: Tack för din beställning!";

$message = "
<html>
<body>
<h1 style='color: #695d2d; text-align: center;'>Orderbekräftelse</h1>
Tack så mycket för din beställning, " . $fullname . "!
Du kommer att få en pappersfakura med i ditt paket 
men du kan också betala med uppgifterna nedan.
<br /><br />
Ordernummer/OCR: " . $last_id . "
<br />
Summa: " . $totalsum - $discount . "kr
<br />
Betala till Bankgiro: 291-3242
<br /><br />
Ange endast ordernumret/OCR vid inbetalning, namn behövs inte.
<br />
Vänligen betala inte innan du fått hem din beställning. Vanlig leveranstid är 2-3 dagar.
<br /><br />
Tack igen!
<br /><br />
Hälsningar,
<br />
KeraLux Sverige
<br />
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <info@keralux.se>' . "\r\n";

mail($to, $subject, $message, $headers);

$stmt->close();
$conn->close();
include "foot.php";
