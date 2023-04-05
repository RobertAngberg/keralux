<?php include "head.php";
include "dbconnect.php";  ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rapport</title>
    <link rel="stylesheet" href="style.css" />
</head>
<?php include "chart-read-db.php" ?>
<script>
    const objData = <?php echo json_encode($ordersPerDay); ?>;
</script>

<body>
    <div id="aaa"></div>
    <!-- <input type="submit" name="" value="Senaste 30 dagar" onclick="ajax('30')" />
    <input type="submit" name="" value="Sen början" onclick="ajax('start')" /> -->
    <canvas id="myChart"></canvas>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/chart.js"></script>
</body>

</html>