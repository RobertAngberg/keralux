<?php
include "head.php";
include "dbconnect.php";

$ordernote = $_POST["ordernote"];
$id = $_POST["id"];

$sqlOrdernote = "UPDATE orders SET ordernote = '$ordernote' WHERE id = $id";
if ($conn->query($sqlOrdernote) === TRUE) {
  echo "Noterat";
} else {
  echo "Fel: " . $conn->error;
}

header("Location: https://www.keralux.se/backend.php");
exit();

include "foot.php";
