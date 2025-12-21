<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "johnnylpaulsson@msn.com";
    $from = "wmaster@sjtk.se";
    $subject = "Anmälan Hällevik 2026";
    $message = "Följande anmälan har skickats in via Hällevik-sidan på sjtk.se:\n\n";
    $message .= "Förnamn: " . htmlspecialchars($_POST["fornamn"]) . "\n";
    $message .= "Efternamn: " . htmlspecialchars($_POST["efternamn"]) . "\n";
    $message .= "Mobil: " . htmlspecialchars($_POST["mobil"]) . "\n";
    $message .= "E-post: " . htmlspecialchars($_POST["epost"]) . "\n";
    $message .= "Familj: " . htmlspecialchars($_POST["familj"]) . "\n";
    $message .= "Rumskategori: " . htmlspecialchars($_POST["rumskategori"]) . "\n";
    $message .= "Träningsalternativ: ";
    if (isset($_POST["traning"])) {
        if (is_array($_POST["traning"])) {
            $message .= implode(", ", array_map('htmlspecialchars', $_POST["traning"]));
        } else {
            $message .= htmlspecialchars($_POST["traning"]);
        }
    }
    $message .= "\n";

    $headers = "From: $from\r\nReply-To: $from\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    mail($to, $subject, $message, $headers);
    header("Location: tack.html");
    exit();
} else {
    header("Location: hallevik.html");
    exit();
}
