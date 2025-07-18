// Theme switching
function setTheme(theme) {
  let root = document.documentElement;
  if (theme === 'lilac') {
    root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #e6e6fa 0%, #d8bfd8 100%)');
    root.style.setProperty('--primary', '#b19cd9');
    root.style.setProperty('--accent', '#6c3483');
    root.style.setProperty('--button-bg', '#b19cd9');
    root.style.setProperty('--button-hover', '#a084ca');
  } else if (theme === 'rose') {
    root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #ffe4e1 0%, #ffb6c1 100%)');
    root.style.setProperty('--primary', '#ffb6c1');
    root.style.setProperty('--accent', '#c2185b');
    root.style.setProperty('--button-bg', '#ffb6c1');
    root.style.setProperty('--button-hover', '#e57373');
  } else if (theme === 'sunflower') {
    root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #fffde7 0%, #ffe082 100%)');
    root.style.setProperty('--primary', '#ffe082');
    root.style.setProperty('--accent', '#ffb300');
    root.style.setProperty('--button-bg', '#ffe082');
    root.style.setProperty('--button-hover', '#ffb300');
  }
}

// Personalized greeting
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Floating hearts and sparkles
function createFloatingElements() {
  document.querySelectorAll('.background').forEach(bg => {
    for (let i = 0; i < 18; i++) {
      const elem = document.createElement('div');
      elem.classList.add(Math.random() > 0.5 ? 'floating-heart' : 'floating-sparkle');
      elem.style.left = Math.random() * 100 + 'vw';
      elem.style.animationDelay = (Math.random() * 7) + 's';
      elem.style.animationDuration = (5 + Math.random() * 4) + 's';
      bg.appendChild(elem);
    }
  });
}

// Trailing sparkle effect with spacing (throttle)
let lastSparkleTime = 0;
const sparkleInterval = 40; // milliseconds between sparkles (increase for more spacing, e.g., 60 or 80)

document.addEventListener('mousemove', function(e) {
  const now = Date.now();
  if (now - lastSparkleTime > sparkleInterval) {
    lastSparkleTime = now;
    const sparkle = document.createElement('div');
    sparkle.className = 'trail-sparkle';
    sparkle.style.left = (e.clientX - 10) + 'px';
    sparkle.style.top = (e.clientY - 10) + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 700);
  }
});


// On DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  const name = getQueryParam('name') || 'there';
  document.getElementById('greeting').textContent = `Hello, ${name}?`;
  document.getElementById('giftText').textContent = `Just for you, ${name}!`;

  createFloatingElements();

  document.getElementById('yesButton').addEventListener('click', () => {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';
  });

  // Optional: Set default theme
  setTheme('lilac');
});

  document.getElementById('yesButton').addEventListener('click', () => {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';
  });
});
