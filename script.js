// Theme switching
function setTheme(theme) {
  const root = document.documentElement;
  const themes = {
    lilac: {
      bg: 'linear-gradient(135deg, #e6e6fa 0%, #d8bfd8 100%)',
      primary: '#b19cd9',
      accent: '#6c3483',
      btnBg: '#b19cd9',
      btnHover: '#a084ca',
    },
    rose: {
      bg: 'linear-gradient(135deg, #ffe4e1 0%, #ffb6c1 100%)',
      primary: '#ffb6c1',
      accent: '#c2185b',
      btnBg: '#ffb6c1',
      btnHover: '#e57373',
    },
    sunflower: {
      bg: 'linear-gradient(135deg, #fffde7 0%, #ffe082 100%)',
      primary: '#ffe082',
      accent: '#ffb300',
      btnBg: '#ffe082',
      btnHover: '#ffb300',
    },
  };

  if (themes[theme]) {
    const t = themes[theme];
    root.style.setProperty('--bg-gradient', t.bg);
    root.style.setProperty('--primary', t.primary);
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--button-bg', t.btnBg);
    root.style.setProperty('--button-hover', t.btnHover);
  }
}

// Get query string parameter value
function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

// Create floating hearts and sparkles in background
function createFloatingElements() {
  document.querySelectorAll('.background').forEach((bg) => {
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div');
      el.classList.add(Math.random() > 0.5 ? 'floating-heart' : 'floating-sparkle');
      el.style.left = Math.random() * 100 + 'vw';
      el.style.animationDelay = Math.random() * 7 + 's';
      el.style.animationDuration = 5 + Math.random() * 4 + 's';
      bg.appendChild(el);
    }
  });
}

// Mouse and touch sparkle trail (throttled)
let lastSparkleTime = 0;
const sparkleInterval = 40;

function spawnSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'trail-sparkle';
  sparkle.style.left = x - 10 + 'px';
  sparkle.style.top = y - 10 + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 700);
}

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkleTime > sparkleInterval) {
    lastSparkleTime = now;
    spawnSparkle(e.clientX, e.clientY);
  }
});

document.addEventListener('touchmove', (e) => {
  if (e.touches && e.touches[0]) {
    spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const greeting = document.getElementById('greeting');
  const giftText = document.getElementById('giftText');
  const yesBtn = document.getElementById('yesButton');
  const shareBtn = document.getElementById('shareBtn');
  const shareBtnScreen2 = document.getElementById('shareBtnScreen2');

  const shareModal = document.getElementById('shareModal');
  const modalNameInput = document.getElementById('modalNameInput');
  const modalShareBtn = document.getElementById('modalShareBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');

  // Get name from URL param or default "there"
  const urlName = getQueryParam('name') || 'there';

  // Update greeting and gift text
  greeting.textContent = `Hello, ${urlName}?`;
  giftText.textContent = `Just for you, ${urlName}!`;

  // Yes button shows gift screen
  yesBtn.addEventListener('click', () => {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';
    shareBtnScreen2.style.display = 'inline-block';
  });

  // Show modal when Share button clicked
  function openModal() {
    shareModal.classList.add('show');
    shareModal.setAttribute('aria-hidden', 'false');
    modalNameInput.value = '';
    modalNameInput.focus();
  }

  // Hide modal
  function closeModal() {
    shareModal.classList.remove('show');
    shareModal.setAttribute('aria-hidden', 'true');
  }

  // Create and trigger share link
  function doShare(name) {
    const cleanName = encodeURIComponent(name.trim());
    if (!cleanName) {
      alert('Please enter a valid name.');
      return;
    }
    const shareUrl = `${window.location.origin}${window.location.pathname}?name=${cleanName}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Flowers for You',
          text: `Hello, ${name.trim()}? Just for you!`,
          url: shareUrl,
        })
        .catch((err) => {
          console.error('Sharing failed:', err);
        });
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => alert('Link copied! Send it to your friend to share your personalized message.'))
        .catch(() => prompt('Copy this link to share your personalized message:', shareUrl));
    } else {
      prompt('Copy this link to share your personalized message:', shareUrl);
    }
  }

  // Share button -> open modal
  shareBtn.addEventListener('click', openModal);
  shareBtnScreen2.addEventListener('click', openModal);

  // Modal Share button
  modalShareBtn.addEventListener('click', () => {
    const name = modalNameInput.value;
    if (!name.trim()) {
      alert('Please enter a name to share.');
      modalNameInput.focus();
      return;
    }
    doShare(name);
    closeModal();
  });

  // Modal Cancel button
  modalCancelBtn.addEventListener('click', closeModal);

  // Accessibility: close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareModal.classList.contains('show')) {
      closeModal();
    }
  });

  // Initialize theme and floating effects
  setTheme('lilac');
  createFloatingElements();
});
