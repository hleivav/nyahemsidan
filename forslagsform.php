<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "wmaster@sjtk.se";
    $from = "wmaster@sjtk.se";
    $subject = "Nytt förslag via förslagslådan";
    $message = "Följande förslag har skickats in via förslagslådan på sjtk.se:\n\n";
    $message .= "Namn: " . htmlspecialchars($_POST["name"]) . "\n";
    $message .= "E-post: " . htmlspecialchars($_POST["email"]) . "\n";
    $message .= "Rubrik: " . htmlspecialchars($_POST["subject"]) . "\n";
    $message .= "Förslag: " . htmlspecialchars($_POST["suggestion"]) . "\n";

    $headers = "From: $from\r\n";
    $headers .= "Reply-To: " . htmlspecialchars($_POST["email"]) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    mail($to, $subject, $message, $headers);
    header("Location: tackforforslag.html");
    exit();
} else {
    header("Location: forslagsladan.html");
    exit();
}
