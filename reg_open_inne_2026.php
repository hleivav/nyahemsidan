<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $to = "anmalan@sjtk.se, wmaster@sjtk.se";
  $subject = '=?UTF-8?B?'.base64_encode("Anmälan SJTK Open Inne 2026").'?=';

  $classes = isset($_POST['klasser']) && is_array($_POST['klasser']) ? $_POST['klasser'] : [];
  $classes = array_map('trim', $classes);

  $allowedClasses = ['Herrsingel', 'Damsingel', 'Herrdubbel', 'Damdubbel'];
  $classes = array_values(array_intersect($classes, $allowedClasses));

  $singelClasses = array_values(array_intersect($classes, ['Herrsingel', 'Damsingel']));
  $dubbelClasses = array_values(array_intersect($classes, ['Herrdubbel', 'Damdubbel']));

  $name = trim($_POST['name'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $phone = trim($_POST['phone'] ?? '');
  $member = trim($_POST['member'] ?? ''); // "ja" eller "nej"

  $partner_name = trim($_POST['partner_name'] ?? '');
  $partner_email = trim($_POST['partner_email'] ?? '');
  $partner_member = trim($_POST['partner_member'] ?? ''); // "ja" eller "nej"

  $swish = isset($_POST['payment']) ? 'Ja' : 'Nej';

  $isMember = $member === 'ja';
  $partnerIsMember = $partner_member === 'ja';

  $total = 0;

  if (count($singelClasses) > 0) {
    $total += count($singelClasses) * ($isMember ? 250 : 500);
  }

  if (count($dubbelClasses) > 0) {
    if ($isMember && $partnerIsMember) {
      $perDubbel = 250;
    } elseif (!$isMember && !$partnerIsMember) {
      $perDubbel = 500;
    } else {
      $perDubbel = 375;
    }
    $total += count($dubbelClasses) * $perDubbel;
  }

  $message = "Ny anmälan SJTK Open Inne 2026:\n\n";
  $message .= "Klasser: " . (count($classes) ? implode(', ', $classes) : '-') . "\n\n";
  $message .= "Namn: $name\n";
  $message .= "E-post: $email\n";
  $message .= "Telefon: $phone\n";
  $message .= "Medlem i SJTK: " . ($isMember ? 'Ja' : 'Nej') . "\n";

  if (count($dubbelClasses) > 0) {
    $message .= "\nPartner (dubbel):\n";
    $message .= "Namn: $partner_name\n";
    $message .= "E-post: $partner_email\n";
    $message .= "Medlem i SJTK: " . ($partnerIsMember ? 'Ja' : 'Nej') . "\n";
  }

  $message .= "\nTotal avgift: $total kr\n";
  $message .= "Pris betalt (swish): $swish\n";

  $headers = "From: wmaster@sjtk.se\r\n";
  $headers .= "Reply-To: " . ($email !== '' ? $email : 'wmaster@sjtk.se') . "\r\n";
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
    <title>Anmälan SJTK Open Inne 2026</title>
    <link rel="stylesheet" href="reg_open_inne_2026.css">
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

          <img src="images/openinne.png" alt="SJTK Open Inne 2026" class="registration-image"/>

          <div class="tournament-name">SJTK Open Inne 2026</div>

          <div class="registration-form-container">
            <h3 class="form-title">Anmälan till SJTK Open Inne 2026</h3>
            <form method="post" action="" id="regForm">

              <div class="form-group">
                <label class="form-label">Klass (välj en eller flera)</label>
                <div class="class-options" id="classOptions">
                  <label class="class-option">
                    <input type="checkbox" class="class-checkbox" data-type="singel" name="klasser[]" value="Herrsingel">
                    <span>Herrsingel</span>
                  </label>
                  <label class="class-option">
                    <input type="checkbox" class="class-checkbox" data-type="singel" name="klasser[]" value="Damsingel">
                    <span>Damsingel</span>
                  </label>
                  <label class="class-option">
                    <input type="checkbox" class="class-checkbox" data-type="dubbel" name="klasser[]" value="Herrdubbel">
                    <span>Herrdubbel</span>
                  </label>
                  <label class="class-option">
                    <input type="checkbox" class="class-checkbox" data-type="dubbel" name="klasser[]" value="Damdubbel">
                    <span>Damdubbel</span>
                  </label>
                </div>
              </div>

              <div class="form-group" id="memberGroup" hidden>
                <label class="form-label">Är du medlem i SJTK?</label>
                <div class="member-options">
                  <label class="member-option">
                    <input type="radio" name="member" value="ja" id="memberYes">
                    <span>Ja, medlem</span>
                  </label>
                  <label class="member-option">
                    <input type="radio" name="member" value="nej" id="memberNo">
                    <span>Nej, icke medlem</span>
                  </label>
                </div>
              </div>

              <div id="playerSection" hidden>
                <div class="form-group">
                  <label class="form-label" for="name">Ditt namn</label>
                  <input class="form-input" id="name" name="name" type="text" placeholder="Ditt namn">
                </div>

                <div class="form-group">
                  <label class="form-label" for="email">Din e-post</label>
                  <input class="form-input" id="email" name="email" type="email" placeholder="Din e-post">
                </div>

                <div class="form-group">
                  <label class="form-label" for="phone">Din telefon</label>
                  <input class="form-input" id="phone" name="phone" type="tel" placeholder="Din telefon">
                </div>
              </div>

              <div id="partnerSection" class="player-section" hidden>
                <div class="player-section-title">Din partner (dubbel)</div>

                <div class="form-group">
                  <label class="form-label" for="partner_name">Partnerns namn</label>
                  <input class="form-input" id="partner_name" name="partner_name" type="text" placeholder="Partnerns namn">
                </div>

                <div class="form-group">
                  <label class="form-label" for="partner_email">Partnerns e-post</label>
                  <input class="form-input" id="partner_email" name="partner_email" type="email" placeholder="Partnerns e-post">
                </div>

                <div class="form-group">
                  <label class="form-label">Är din partner medlem i SJTK?</label>
                  <div class="member-options">
                    <label class="member-option">
                      <input type="radio" name="partner_member" value="ja" id="partnerMemberYes">
                      <span>Ja, medlem</span>
                    </label>
                    <label class="member-option">
                      <input type="radio" name="partner_member" value="nej" id="partnerMemberNo">
                      <span>Nej, icke medlem</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="price-box" id="priceBox" hidden>
                <div class="price-label">Att betala</div>
                <div class="price-amount" id="priceAmount">0 kr</div>
              </div>
              <input type="hidden" name="total_price" id="totalPriceInput" value="0">

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
          <a class="nav-button" href="sjtk_open_inne.html">Till Open Inne-sidan</a>
        </div>
      </div>
    </div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const classCheckboxes = Array.from(document.querySelectorAll('.class-checkbox'));
        const memberGroup = document.getElementById('memberGroup');
        const memberYes = document.getElementById('memberYes');
        const memberNo = document.getElementById('memberNo');
        const playerSection = document.getElementById('playerSection');
        const partnerSection = document.getElementById('partnerSection');
        const partnerMemberYes = document.getElementById('partnerMemberYes');
        const partnerMemberNo = document.getElementById('partnerMemberNo');
        const priceBox = document.getElementById('priceBox');
        const priceAmount = document.getElementById('priceAmount');
        const totalPriceInput = document.getElementById('totalPriceInput');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const partnerNameInput = document.getElementById('partner_name');
        const partnerEmailInput = document.getElementById('partner_email');
        const payment = document.getElementById('payment');
        const submitBtn = document.getElementById('submitBtn');

        if (!classCheckboxes.length || !payment || !submitBtn) return;

        function checkedOf(list) {
          return list.filter(cb => cb.checked);
        }

        function updateOptionStyles() {
          classCheckboxes.forEach(cb => {
            cb.closest('.class-option').classList.toggle('checked', cb.checked);
          });
          [memberYes, memberNo, partnerMemberYes, partnerMemberNo].forEach(el => {
            if (el) el.closest('.member-option').classList.toggle('checked', el.checked);
          });
        }

        function update() {
          const singelChecked = checkedOf(classCheckboxes.filter(cb => cb.dataset.type === 'singel'));
          const dubbelChecked = checkedOf(classCheckboxes.filter(cb => cb.dataset.type === 'dubbel'));
          const hasSingel = singelChecked.length > 0;
          const hasDubbel = dubbelChecked.length > 0;
          const hasAny = hasSingel || hasDubbel;

          updateOptionStyles();

          memberGroup.hidden = !hasAny;
          playerSection.hidden = !hasAny;
          partnerSection.hidden = !hasDubbel;

          nameInput.required = hasAny;
          emailInput.required = hasAny;
          partnerNameInput.required = hasDubbel;
          partnerEmailInput.required = hasDubbel;

          const isMember = memberYes.checked ? true : (memberNo.checked ? false : null);
          const partnerIsMember = partnerMemberYes.checked ? true : (partnerMemberNo.checked ? false : null);

          let total = 0;
          let priceReady = hasAny;

          if (hasSingel) {
            if (isMember === null) {
              priceReady = false;
            } else {
              total += singelChecked.length * (isMember ? 250 : 500);
            }
          }

          if (hasDubbel) {
            if (isMember === null || partnerIsMember === null) {
              priceReady = false;
            } else {
              let perDubbel;
              if (isMember && partnerIsMember) perDubbel = 250;
              else if (!isMember && !partnerIsMember) perDubbel = 500;
              else perDubbel = 375;
              total += dubbelChecked.length * perDubbel;
            }
          }

          priceBox.hidden = !hasAny;
          if (hasAny) {
            priceAmount.textContent = priceReady ? (total + ' kr') : 'Välj medlemskap ovan';
          }
          totalPriceInput.value = priceReady ? total : 0;

          submitBtn.disabled = !(payment.checked && hasAny && priceReady);
        }

        classCheckboxes.forEach(cb => cb.addEventListener('change', update));
        [memberYes, memberNo, partnerMemberYes, partnerMemberNo].forEach(el => {
          if (el) el.addEventListener('change', update);
        });
        payment.addEventListener('change', update);

        update();
      });
    </script>
  </body>
</html>
