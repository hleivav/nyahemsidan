<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "wmaster@sjtkl.se";
    $from = "wmaster@sjtkl.se";
    $subject = "Ny medlemsansökan via hemsidan";
    $message = "Följande medlemsansökan har skickats in via newmember.html på sjtk.se:\n\n";
    $message .= "Namn: " . htmlspecialchars($_POST["fullname"] ?? '') . "\n";
    $message .= "E-post: " . htmlspecialchars($_POST["email"] ?? '') . "\n";
    $message .= "Telefon: " . htmlspecialchars($_POST["phone"] ?? '') . "\n";
    $message .= "Adress: " . htmlspecialchars($_POST["address"] ?? '') . "\n";
    $message .= "Födelseår: " . htmlspecialchars($_POST["birthyear"] ?? '') . "\n";
    $message .= "Tennisnivå: " . htmlspecialchars($_POST["level"] ?? '') . "\n";
    $message .= "Medlemsavgift: ";
    if (isset($_POST["membershipFee"])) {
        if (is_array($_POST["membershipFee"])) {
            $message .= implode(", ", array_map('htmlspecialchars', $_POST["membershipFee"]));
        } else {
            $message .= htmlspecialchars($_POST["membershipFee"]);
        }
    }
    $message .= "\n";

    $headers = "From: $from\r\nReply-To: $from\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    mail($to, $subject, $message, $headers);
    header("Location: tack.html");
    exit();
} else {
    header("Location: newmember.html");
    exit();
}
