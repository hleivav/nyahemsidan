<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SJTK — Tävlingsanmälningar</title>
  <link rel="stylesheet" href="index.css">
  <link rel="stylesheet" href="tournamentregistration.css">
</head>
<body>
  <nav id="main-menu" role="navigation">
    <input type="checkbox" id="nav-toggle" aria-hidden="true">
    <div class="menu-inner">
      <a class="brand" href="index.html">SJTK</a>
      <label class="hamburger" for="nav-toggle" aria-label="Meny">
        <span></span><span></span><span></span>
      </label>
      <div class="nav-items">
        <a href="index.html">Hem</a>
        <div class="nav-dropdown">
          <a href="#">Tävlingar</a>
          <div class="dropdown-content">
            <a href="tournamentregistration.php">Tävlingsanmälan</a>
            <a href="schema.html">Spelscheman</a>
            <a href="guidelines.html">Tävlingsanvisningar</a>
            <a href="calendar.html">Tävlingskalender</a>
          </div>
        </div>
        <a href="gruppspel.html">Gruppspel</a>
        <a href="senior.html">Seniorverksamhet</a>
        <a href="newmember.html">Ny medlem</a>
        <a href="hallevik.html">Hällevik</a>
        <a href="forslagsladan.html">Förslagslådan</a>
        <a href="contact.html">Kontakt</a>
      </div>
    </div>
  </nav>

  <main class="registration-container">
    <div class="registration-card">
      <h1 class="card-title">Tävlingsanmälningar</h1>
      
      <h2 class="section-subtitle">Pågående anmälningar</h2>
      
      <img src="images/hostbollen.png" alt="Pågående anmälningar" class="registration-image" />
      
      <div class="tournament-name">Höstbollen</div>
      
      <div class="registration-form-container" id="formContainer">
        <h3 class="form-title">Anmälan till Höstbollen 2025</h3>
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
          // Byt ut till en e-postadress på din domän, t.ex. info@sjtk.se
          $to = "wmaster@sjtk.se";
          $from = "wmaster@sjtk.se"; // Måste vara en e-post på din domän
          $subject = "Anmälan till Höstbollen 2025";
          $message = "Namn: " . htmlspecialchars($_POST["namn"]) . "\n";
          $message .= "E-post: " . htmlspecialchars($_POST["epost"]) . "\n";
          $message .= "Telefon: " . htmlspecialchars($_POST["telefon"]) . "\n";
          $message .= "Swishat: " . (isset($_POST["payment"]) ? "Ja" : "Nej") . "\n";

          $headers = "From: $from\r\nReply-To: $from\r\n";
          mail($to, $subject, $message, $headers);
          echo '<div class="thankyou-message"><h2>Tack för din anmälan!</h2><p>Vi har tagit emot din anmälan och återkommer vid behov.<br>En bekräftelse skickas till tävlingsledningen.</p><a href="index.html" class="nav-button">Tillbaka till startsidan</a></div>';
        } else {
        ?>
        <form method="post" class="contact-form">
          <div class="form-group">
            <label for="name" class="form-label">Namn:</label>
            <input type="text" id="name" name="namn" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="email" class="form-label">E-mail:</label>
            <input type="email" id="email" name="epost" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="phone" class="form-label">Telefon:</label>
            <input type="tel" id="phone" name="telefon" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Pris: 200 kr</label>
            <div class="checkbox-group">
              <input type="checkbox" id="payment" name="payment" class="form-checkbox" required>
              <label for="payment" class="checkbox-label">Jag har swishat summan ovan till SWISH-nummer 1230571562</label>
            </div>
          </div>
          <button type="submit" class="submit-button">Skicka</button>
        </form>
        <?php } ?>
      </div>

      <!-- Navigationsknappar -->
      <div class="navigation-buttons">
        <a href="hostbollen.html" class="nav-button">Se inbjudan</a>
        <a href="mailto:tavlingsledning@sjtk.se" class="nav-button">Kontakta tävlingsledning</a>
      </div>
    </div>
  </main>

  <script src="navbar.js"></script>
</body>
</html>
