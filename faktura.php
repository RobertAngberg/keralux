<!DOCTYPE html>

<?php
// Jag vet inte namnet på key i $_POST, detta pga hur knapparna funkar i backend.php
// Behöver därför kunna t.ex. $_POST[0] - fixa det här
$keys = array_keys($_POST);
?>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
    <title>Faktura</title>
    <link rel="stylesheet" href="style.css" />

    <style>
        #faktura-container {
            width: 700px;
            text-align: left;
        }

        #faktura-logo {
            width: 300px;
        }

        #faktura-H1 {
            font-size: 50px;
            float: right;
            color: #000;
            margin-top: -10px;
            font-weight: normal;
        }

        table {
            border-collapse: collapse;
        }

        .faktura-underline-tr {
            border-bottom: 3px solid #000;
            padding-bottom: 10px;
        }

        .faktura-produkt-td {
            width: 300px;
        }

        .faktura-antal-td {
            width: 300px;
        }

        .faktura-totalt-td {
            width: 80px;
            text-align: right;
        }
    </style>

</head>

<body>
    <div id="faktura-container">
        <img src="images/logo-faktura.png" id="faktura-logo" />
        <h1 id="faktura-H1">Faktura</h1>
        <br /><br /><br />

        <?php
        // Hackigt... det finns underscore från $_POST: "Namn_Efternamn", 
        // gör om till space med str_replace, och efter det
        // nl2br gör om "\n" (space) till linebreak
        $address = str_replace("_", ' ', $keys[3]);
        echo nl2br($address);
        echo "<br /><br /><br />";

        echo
        "<table><tr class='faktura-underline-tr'>
        <td class='faktura-produkt-td'><b>Produkt</b></td>
        <td class='faktura-antal-td'><b>Antal</b></td>
        <td class='faktura-totalt-td'><b>Totalt</b></td>
        </tr><tr>
        <td class='faktura-produkt-td'>KeraLux Large 28g</td>
        <td class='faktura-antal-td'>" . nl2br($_POST["skus"]) . "</td>
        <td class='faktura-totalt-td'>";
        // Rabatt eller inte?
        if ($keys[5] == "Ja") {
            echo $keys[4] . "kr";
            echo "<br> - 100kr";
            echo  " = " . $keys[4] - 100 . "kr";
        } else {
            echo $keys[4] . "kr";
        };
        echo "
        </td>
        </table><br />";

        if ($keys[5] == "Ja") {
            echo "Första köp - 100kr rabatt har redan dragits från originalbeloppet.";
        }

        echo "<br /><br /><br />";

        // Hackigt, ta bort klockslaget genom att ta bort sista 9 chars
        echo "Orderdatum: " . substr($keys[1], 0, -9);
        echo "<br>";
        // Lägg till 14 dagar för förfallodatum
        echo "Förfallodatum: " . date('Y-m-d', strtotime(substr($keys[1], 0, -9) . ' + 14 days'));
        echo "<br /><br />";
        echo "Ordernummer/OCR: <b>" . $keys[0] . "</b>";
        echo "<br />";
        echo "Betala till Bankgiro: <b>291-3242</b>";
        echo "<br /><br />";

        ?>

        <p>Vänligen ange ordernumret som OCR vid inbetalning.
            Det kan stå Firma Robert Angberg vid inbetalning,
            det är korrekt och inget fel.
        </p>

        <br />

        <p>
            <b>Instruktion</b>
        </p>

        <p>
            Med fingret, "knacka" på burken ovanför området där du vill att håret ska se tjockare ut och låt fibrerna falla ner i håret. Du kan göra eventuellt göra vissa justeringar med fingrarna efteråt, eller använda en borste/kam.
            <br />
            Om man vill kan man använda spray eller liknande efteråt, men oftast behövs det inte. Används inte spray eller mousse innan applicering av produkten.
            <br />
            Om man har stora områden av tunt hår som man vill åtgärda så finns en sprayapplikator att köpa på vår hemsida för att göra appliceringen enklare.
            <br />
            Fibrerna sitter kvar i blåst och regn, men spolas ur vid dusch.
        </p>
        <p><b>Sprayapplikator:</b> Ta av locket och pilla bort silen på toppen av burken och skruva sen på sprayapplikatorn.</p>

        <br /><br /><br /><br /><br /><br /><br /><br /><br />

        <p>
            <center><small>
                    Företaget innehar F-skattesedel.<br>
                    Org. nummer: 830618-6910<br>
                    Tack för din beställning och välkommen åter!<br>
                    Kontakt: info@keralux.se
                </small></center>
        </p>
    </div>
</body>

</html>