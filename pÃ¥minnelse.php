<?php
include "head.php";

$email = $_POST["email"];
$id = $_POST["id"];
$fullname = $_POST["fullname"];
$sum = $_POST["totalsum"];
$discount = $_POST["discount"];

if ($discount == "Ja") {
  $sum = $sum - 100;
}

echo $email;
echo "<br><br>";
echo $id;
echo "<br><br>";
echo $fullname;
echo "<br><br>";
echo $sum;
echo "<br><br>";
echo $discount;
echo "<br><br>";

////////////////// Email ////////////////////

$to = $email;
$subject = "Påminnelse, KeraLux";

$message = "
<html>
<body>
<h1 style='color: #695d2d; text-align: center;'>Påminnelse</h1>
Hejsan " . $fullname . "!
<br />
Du har en obetald faktura från oss på KeraLux.
<br /><br />
Ordernummer/OCR: " . $id . "
<br />
Summa: " . $sum . "kr
<br />
Betala till Bankgiro: 291-3242
<br /><br />
Ange endast ordernumret/OCR som meddelande vid inbetalning, namn behövs inte.
<br /><br />
Om du redan betalat fakturan kan du bortse från påminnelsen. 
<br />
Om fakturan önskas i PDF-form, vänligen maila tillbaka så ordnas det.
<br />
Tack så mycket på förhand.
<br /><br />
Hälsningar,
<br />
KeraLux Sverige
<br /><br />
<small>Företaget innehar F-skattesedel och är momsregistrerat.
<br />
Org. nummer: 830618-6910</small>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <info@keralux.se>' . "\r\n";

mail($to, $subject, $message, $headers);

echo $message;
echo "<br>";
echo $to;
echo "<br>";
echo $subject;
echo "<br>";
echo $headers;
echo "<br>";
include "foot.php";
