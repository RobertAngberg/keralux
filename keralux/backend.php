<?php include "head.php" ?>

<div id="backend-top">
    <form method="post">
        <input type="hidden" name="logout">
        <input type="submit" id="backend-logout" class="hide-on-mobile" value="Logga ut">
    </form>
    <form action="chart.php">
        <input type="submit" id="backend-statistik" class="hide-on-mobile" value="Statistik">
    </form>

    <form action="" method="post">
        <input id="backend-search" type="text" name="search">
        <input type="submit" value="Visa / sök">
    </form>
</div>

<?php
session_start();

if (!isset($_SESSION["user"])) {
    header("Location: loggy.php");
    exit();
}

if (isset($_POST["logout"])) {
    session_destroy();
    unset($_SESSION);
    header("Location: loggy.php");
    exit();
}

include "dbconnect.php";

// Visa sidor som kan bläddras. Om man inte klickat sida så är man på page 1, 
// annars på $_GET['page']. Koden för länkarna är längst ner
if (!isset($_GET['page'])) {
    $page = 1;
} else {
    $page = $_GET['page'];
}

$results_per_page = 50;
$result = mysqli_query($conn, "SELECT * FROM orders");
$number_of_results = mysqli_num_rows($result);

// Hur många sidor det blir, t.ex. 100 totala resultat / 20 results per page = 5 
$number_of_pages = ceil($number_of_results / $results_per_page);

// Determine the sql LIMIT starting number for the results on the displaying page  
$page_first_result = ($page - 1) * $results_per_page;

// Visa orders vid page load. Måste kolla $_POST == null annars körs denna också när man söker
// så att man får resultaten två gånger
if ($_POST == null) {
    $query = "SELECT * FROM orders ORDER by id desc LIMIT " . '?' . ',' . '?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $page_first_result, $results_per_page);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $resultID = $row["id"];
            showOrders($conn, $resultID);
        }
    } else {
        echo "Inga results";
    }
}

// Sök-knapp
if (isset($_POST['search'])) {
    $search = '%' . $_POST['search'] . '%';
    $query = "SELECT * FROM orders WHERE id LIKE ? OR email LIKE ? OR fullname LIKE ? ORDER by id desc LIMIT " . '?' . ',' . '?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssii', $search, $search, $search, $page_first_result, $results_per_page);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $resultID = $row["id"];
            showOrders($conn, $resultID);
        }
    } else {
        echo "Inga results";
    }
}

// Man kan tycka att $conn borde vara i global scope och inte behöva skickas som argument
// men så är det tydligen inte i php.. får skicka som argument
function showOrders($conn, $resultID)
{
    $skus = array(
        "Black", "DarkBrown", "MediumBrown", "LightBrown", "MediumBlonde",
        "Blonde", "LightBlonde", "Grey", "White", "RedAuburn", "Spray"
    );

    // Visa allt förutom orders/skus samt knapparna för skickad, påminnelse, etc
    $sql = "SELECT id, ordertime, email, fullname, street, zip, town, totalsum, discount FROM orders WHERE id = $resultID";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo
            "<form action='faktura.php' method='post'>" .
                "<div class='order-row hide-on-mobile'>" .

                // ID
                "<div class='order-column'>" .
                "<b>Order#</b><br/><hr /><br/>" .
                "<textarea readonly class='order-input-field-maxwidth' wrap='hard'
                name='" . $row["id"] . "'>" .  $row["id"] . "</textarea>" .
                "<button class='faktura-left-golden-btn' type='submit'>Faktura</button>" .
                "</div>" .

                // Ordertime
                "<div class='order-column'>" .
                "<b>Tid</b><br/><hr /><br/>" .
                "<textarea readonly class='order-input-field-maxwidth' wrap='hard'
                name='" . $row["ordertime"] . "'>" . $row["ordertime"] . "</textarea>" .
                "</div>" .

                // Email
                "<div class='order-column'>" .
                "<b>Email</b><br/><hr /><br/>" .
                "<textarea readonly class='order-input-field'
                name='" . $row["email"] . "'>" . $row["email"] . "</textarea>" .
                "</div>" .

                // Adress
                "<div class='order-column'>" .
                "<b>Adress</b><br/><hr /><br/>" .
                "<textarea readonly class='order-input-field'
                name='" . $row["fullname"] . "\n" . $row["street"] . "\n" . $row["zip"] . "\n" . $row["town"] . "'>" . $row["fullname"] . "\n" . $row["street"] . "\n" . $row["zip"] . "\n" . $row["town"] .  "</textarea>" .
                "</div>" .

                // Summa
                "<div class='order-column'>" .
                "<b>Totalt</b><br/><hr /><br/>" .
                "<textarea readonly class='order-input-field-maxwidth'
                name='" . $row["totalsum"] . "'>" . $row["totalsum"] . "</textarea>" .
                "</div>" .

                // Rabatt
                "<div class='order-column'>" .
                "<b>Rabatt?</b><br/><hr /><br/>" .
                "<textarea readonly class='order-input-field-maxwidth'
                name='" . $row["discount"] . "'>" . $row["discount"] . "</textarea>" .
                "</div>";

            // Visa Order/skus och antal
            echo "<div class='order-column'><b>Order</b><br /><hr /><br />";
            echo "<textarea readonly class='order-input-field'
                        name='skus'>";
            foreach ($skus as $sku) {
                $sql1 = "SELECT $sku FROM orders WHERE id = $row[id]";
                $result1 = $conn->query($sql1);
                // Loopa genom / gör nåt med varje resultat
                while ($row1 = $result1->fetch_assoc()) {
                    // Utelämna kolumner (skus) som inte har något resultat/beställning
                    // Tänk på att $row1["$sku"] är t.ex. $row1["black"]
                    // och $sku är antalet
                    if (!empty($row1["$sku"])) {
                        // echo $row1["$sku"] . " " . $sku . "<br />" .
                        echo $row1["$sku"] . " " . $sku . "\n";
                    }
                }
            }

            echo "</textarea></div></form>";

            // Visa knappar för skickad, påminnelse, etc
            echo "<div class='order-column'>";
            // Form för att skicka info till db när man klickar på någon av knapparna
            echo "<form action='' method='post'>";
            // Viktigt: ett dolt input. Det gör att om man trycker på t.ex. knappen 
            // "skickad" så får man row id plus knappens name samtidigt vid submit, och 
            // kan kontrollera båda och då veta vilken knapp som klickas på vilken rad/ID
            echo "<input type='hidden' name='" . $row['id'] . "'>";

            // Kolla i db för varje order ($row["id"]) och poppulate knappar med info
            // Det är konstigt att det står inuti knappen som jag vill.. source code weird

            // Skickad-knappen
            echo "<button type='submit' class='backend-button skickad' name='skickad-button' />";
            populateBtns($row['id'], "whensent", "Skickad: ", $conn);

            // Påminnelse-knappen
            echo "<button type='submit' class='backend-button påminnelse' name='påminnelse-button' />";
            populateBtns($row['id'], "whenreminder", "Påminnelse: ", $conn);

            // Inkasso-knappen
            echo "<button type='submit' class='backend-button inkasso' name='inkasso-button' />";
            populateBtns($row['id'], "whenfinalreminder", "Inkasso: ", $conn);

            echo "</div><div class='order-column'>";

            // Skuld-knappen
            echo "<button type='submit' class='backend-button skuld' name='skuld-button' />";
            populateBtns($row['id'], "whendebt", "Skuld: ", $conn);

            // Misslyckad-knappen
            echo "<button type='submit' class='backend-button misslyckad' name='misslyckad-button' />";
            populateBtns($row['id'], "whenfailed", "Misslyckad: ", $conn);

            // Färdig-knappen
            echo "<button type='submit' class='backend-button färdig' name='färdig-button' />";
            populateBtns($row['id'], "whencompleted", "Färdig: ", $conn);

            echo "</form>";
            echo "</div>";
            echo "</div>";
            echo "<hr class='hr' />";
        }
    } else {
        echo "0 results";
    }
}

// Populate:ar knapparna med info om skickad, påminnelse, etc
function populateBtns($rowID, $column, $echo, $conn)
{
    $sql1 = "SELECT $column FROM orders WHERE id = $rowID";
    $result1 = $conn->query($sql1);
    if ($result1->num_rows > 0) {
        while ($row1 = $result1->fetch_assoc()) {
            echo $echo . $row1[$column];
        }
    }
}

// Körs när man trycker på knapp submit form t.ex. "Skickad". Det är här den känner 
// name attribute på den gömda input ovan, (tänk $_POST[$row['62'] eller whatev) 
// och uppdaterar kolumn på motsvarande row - vilken kolumn avgörs i btnClickUpdate()
if (isset($_POST['skickad-button']) || isset($_POST['påminnelse-button']) || isset($_POST['inkasso-button']) || isset($_POST['skuld-button']) || isset($_POST['misslyckad-button']) || isset($_POST['färdig-button'])) {
    // Måste göra om $_POST via array_keys för att kunna t.ex. $_POST[0]
    // Detta eftersom jag inte vet värdet på "name" attributet på varken row ID
    // eller knapp som klickas... jag gör samma grej av samma anledning i faktura.php
    $keys = array_keys($_POST);
    // Tänk på att två $_POST skickas, $keys[0] är row ID, $keys[1] är knappen som string
    btnClickUpdate($keys[0], $keys[1], $conn);
}

function btnClickUpdate($rowID, $button, $conn)
{
    // Vilken knapp som är klickad avgör vilken kolumn som ska uppdateras
    $updateColumn = "";
    if ($button == "skickad-button") {
        $updateColumn = "whensent";
    } else if ($button == "påminnelse-button") {
        $updateColumn = "whenreminder";
    } else if ($button == "inkasso-button") {
        $updateColumn = "whenfinalreminder";
    } else if ($button == "skuld-button") {
        $updateColumn = "whendebt";
    } else if ($button == "misslyckad-button") {
        $updateColumn = "whenfailed";
    } else if ($button == "färdig-button") {
        $updateColumn = "whencompleted";
    }

    $datetime = date('Y-m-d H:i:s');
    $sql = "UPDATE orders SET $updateColumn = '$datetime' WHERE id = $rowID";

    if ($conn->query($sql) === TRUE) {
        echo "Tillagt!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    // Uppdatera sidan så att ändringar syns
    header("Refresh:0");
}

echo "<div id='pagination-links'>";
// Bläddra sidor
for ($page = 1; $page <= $number_of_pages; $page++) {
    echo '<a class="backend-link" href = "backend.php?page=' .
        $page . '">' . $page . ' </a>';
}
echo "</div>";
$conn->close();

echo '<script src="./js/backend.js"></script>';
