<?php
include "dbconnect.php";

// Läs i toppen av js-filen för att kanske fatta nedan
// if (isset($_GET['q'])) {
//     $startDate = "";
//     if ($_GET['q'] == 30) {
//         $startDate = date('c', strtotime('-30 days'));
//         $startDate = substr($startDate, 0, -15);
//     } else if ($_GET['q'] == "2023-01-01") {
//         $startDate = "2023-01-01";
//     }
// }

function getBetweenDates($startDate, $endDate)
{
    $rangArray = [];
    $startDate = strtotime($startDate);
    $endDate = strtotime($endDate);
    for ($currentDate = $startDate; $currentDate <= $endDate; $currentDate += (86400)) {
        $date = date('Y-m-d', $currentDate);
        $rangArray[] = $date;
    }
    return $rangArray;
}
$dates = getBetweenDates('2023-01-15', date("Y-m-d"));

// Loopa över datumen, hämta hur många ordrar per dag
$ordersPerDay = [];
foreach ($dates as $element) {
    $elementWildcard = '%' . $element . '%';
    $query = "SELECT * FROM orders WHERE ordertime LIKE ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $elementWildcard);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Ta bort tid från slutet på string, ha bara kvar datumet
            array_push($ordersPerDay, substr($row["ordertime"], 0, -9));
        }
    } else {
        // Om inga träffar, pusha in datumet ändå
        array_push($ordersPerDay, $element);
    }
}

$conn->close();
$stmt->close();
