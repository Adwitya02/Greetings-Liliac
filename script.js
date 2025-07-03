function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

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

window.addEventListener('DOMContentLoaded', () => {
  const name = getQueryParam('name') || 'there';
  document.getElementById('greeting').textContent = `Hello, ${name}?`;
  document.getElementById('giftText').textContent = `Just for you, ${name}!`;

  createFloatingElements();

  document.getElementById('yesButton').addEventListener('click', () => {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';
  });
});