<?php
// Copied from tournamentregistration.php and adjusted CSS link for reglagkm.css
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $to = "anmalan@sjtk.se, wmaster@sjtk.se";
  // Encode subject as UTF-8 MIME header to preserve åäö
  $subject = '=?UTF-8?B?'.base64_encode("Anmälan Lag - SJTK").'?=';
  $team = trim($_POST['team_name'] ?? '');
  $captain = trim($_POST['captain_name'] ?? '');
  $captain_email = trim($_POST['captain_email'] ?? '');
  $captain_phone = trim($_POST['captain_phone'] ?? '');
  $other_players = trim($_POST['other_players'] ?? '');
  $swish = isset($_POST['payment']) ? 'Ja' : 'Nej';

  $message = "Ny laganmälan:\n\n";
  $message .= "Lagets namn: $team\n";
  $message .= "Lagkapten/Anmälare: $captain\n";
  $message .= "E-post: $captain_email\n";
  $message .= "Telefon: $captain_phone\n\n";
  $message .= "Övriga spelare:\n$other_players\n";
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
    <title>Anmälan Lag - SJTK</title>
    <link rel="stylesheet" href="tournamentregistration.css">
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

          <img src="images/lagkm.png" alt="Tennis" class="registration-image"/>

          <div class="tournament-name">SJTK Lag</div>

          <div class="registration-form-container">
            <h3 class="form-title">Anmälan till SJTK Lag 2026</h3>
            <form method="post" action="">
              <div class="form-group">
                <label class="form-label" for="team_name">Lagets namn</label>
                <input class="form-input" id="team_name" name="team_name" placeholder="Ex: Trötta Gubbar." required>
              </div>

              <div class="form-group">
                <label class="form-label" for="captain_name">Lagkaptenens/Anmälarens namn</label>
                <input class="form-input" id="captain_name" name="captain_name" placeholder="Ditt namn" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="captain_email">Lagkaptenens e-post</label>
                <input class="form-input" id="captain_email" name="captain_email" type="email" placeholder="Din e-post" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="captain_phone">Lagkaptenens telefon</label>
                <input class="form-input" id="captain_phone" name="captain_phone" type="tel" placeholder="Din telefon" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="other_players">Övriga spelare</label>
                <textarea class="form-input" id="other_players" name="other_players" rows="4" placeholder="Medspelarnas namn och efternamn, kommaseparerade."></textarea>
              </div>

              <div class="form-group">
                <p style="margin:0.4rem 0 0.8rem 0;color:#333;font-weight:600;">Pris: 400 kr</p>
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
          <a class="nav-button" href="lagkom.html">Till lagkom-sidan</a>
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
