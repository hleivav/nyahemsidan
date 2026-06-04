<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $to = "anmalan@sjtk.se, wmaster@sjtk.se";
  $subject = '=?UTF-8?B?'.base64_encode("Anmälan Singel Ute Trivselstävling - SJTK").'?=';
  $name = trim($_POST['name'] ?? '');
  $captain_email = trim($_POST['captain_email'] ?? '');
  $captain_phone = trim($_POST['captain_phone'] ?? '');
  $swish = isset($_POST['payment']) ? 'Ja' : 'Nej';

  $message = "Ny anmälan Singel Ute Trivselstävling:\n\n";
  $message .= "Namn: $name\n";
  $message .= "E-post: $captain_email\n";
  $message .= "Telefon: $captain_phone\n\n";
  $message .= "Pris betalt (swish): $swish\n";

  $headers = "From: wmaster@sjtk.se\r\n";
  $headers .= "Reply-To: $captain_email\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
  $headers .= "Content-Transfer-Encoding: 8bit\r\n";

  if (mail($to, $subject, $message, $headers)) {
    $success = true;
  } else {
    $error = true;
  }
}
?>
<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Anmälan Singel Ute Trivselstävling - SJTK</title>
    <link rel="stylesheet" href="regsingeltrivselute.css">
  </head>
  <body>
    <div class="registration-container">
      <div class="registration-card">
        <?php if (!empty($success)): ?>
          <div class="confirmation-message show">
            <div class="confirmation-icon">✓</div>
            <div class="confirmation-title">Tack! Din anmälan är mottagen.</div>
            <div class="confirmation-text">Vi kommer att kontakta dig via e-post om fler detaljer.</div>
          </div>
        <?php else: ?>
          <h1 class="card-title">Tävlingsanmälningar</h1>
          <p class="section-subtitle">Pågående anmälningar</p>

          <img src="images/singeltrivselute.png" alt="Singel Ute Trivselstävling" class="registration-image"/>

          <div class="tournament-name">Singel Ute Trivselstävling 2026</div>

          <div class="registration-form-container">
            <h3 class="form-title">Anmälan till Singel Ute Trivselstävling 2026</h3>
            <form method="post" action="">
              <div class="form-group">
                <label class="form-label" for="name">Ditt namn</label>
                <input class="form-input" id="name" name="name" type="text" placeholder="Ditt namn" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="captain_email">Din e-post</label>
                <input class="form-input" id="captain_email" name="captain_email" type="email" placeholder="Din e-post" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="captain_phone">Din telefon</label>
                <input class="form-input" id="captain_phone" name="captain_phone" type="tel" placeholder="Din telefon" required>
              </div>

              <div class="form-group">
                <p style="margin:0.4rem 0 0.8rem 0;color:#333;font-weight:600;">Pris: 100 kr</p>
              </div>

              <div class="form-group">
                <div class="checkbox-group">
                  <input class="form-checkbox" id="payment" name="payment" type="checkbox" required>
                  <label class="checkbox-label" for="payment">Jag har swishat summan ovan till SWISH-nummer 1230571562</label>
                </div>
              </div>

              <button id="submitBtn" class="submit-button" type="submit" disabled>Skicka anmälan</button>
            </form>
          </div>
        <?php endif; ?>

        <div class="navigation-buttons">
          <a class="nav-button" href="index.html">Till startsidan</a>
          <a class="nav-button" href="singelutetrivsel.html">Till singel ute sidan</a>
        </div>
      </div>
    </div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const payment = document.getElementById('payment');
        const submitBtn = document.getElementById('submitBtn');
        if (!payment || !submitBtn) return;
        submitBtn.disabled = !payment.checked;
        payment.addEventListener('change', function() { submitBtn.disabled = !payment.checked; });
      });
    </script>
  </body>
</html>
