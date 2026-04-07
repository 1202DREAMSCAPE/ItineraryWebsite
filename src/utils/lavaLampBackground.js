export function injectLavaLampBackground() {
  if (document.getElementById('lava-lamp-style')) return;

  const style = document.createElement('style');
  style.id = 'lava-lamp-style';
  style.innerHTML = `
    .lava-lamp-bg {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #fff1f8, #f0dfff);
    }

    @media (prefers-color-scheme: dark) {
      .lava-lamp-bg {
        background: linear-gradient(135deg, #1e1e2f, #2c2c3c);
      }
    }

    .lava-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
      opacity: 0.9;
      pointer-events: none;
      mix-blend-mode: screen;
      animation: blobMove 10s ease-in-out infinite, blobColor 7s ease-in-out infinite alternate;
    }

    .blob-1 { width: 320px; height: 320px; top: 5%;   left: 8%;   animation-delay: 0s, 0s; }
    .blob-2 { width: 400px; height: 400px; top: 40%;  left: 60%;  animation-delay: 2s, 1s; }
    .blob-3 { width: 300px; height: 300px; top: 70%;  left: 30%;  animation-delay: 4s, 2s; }
    .blob-4 { width: 350px; height: 350px; top: 20%;  left: 70%;  animation-delay: 6s, 3s; }
    .blob-5 { width: 280px; height: 280px; top: 55%;  left: 15%;  animation-delay: 8s, 4s; }
    .blob-6 { width: 450px; height: 450px; top: 75%;  left: 75%;  animation-delay: 10s, 5s; }

    @keyframes blobMove {
      0%   { transform: translate(0, 0) scale(1); }
      25%  { transform: translate(60px, -40px) scale(1.2); }
      50%  { transform: translate(-50px, 60px) scale(0.85); }
      75%  { transform: translate(30px, -30px) scale(1.1); }
      100% { transform: translate(0, 0) scale(1); }
    }

    @keyframes blobColor {
      0%   { background-color: #ff3cac; }
      20%  { background-color: #ffc800; }
      40%  { background-color: #00ffff; }
      60%  { background-color: #ff4d4d; }
      80%  { background-color: #8e44ad; }
      100% { background-color: #ff3cac; }
    }

    @media (prefers-color-scheme: dark) {
      .lava-blob {
        mix-blend-mode: lighten;
        filter: blur(60px);
        opacity: 0.7;
      }

      @keyframes blobColor {
        0%   { background-color: #9b59b6; }
        20%  { background-color: #3498db; }
        40%  { background-color: #1abc9c; }
        60%  { background-color: #e74c3c; }
        80%  { background-color: #f39c12; }
        100% { background-color: #9b59b6; }
      }
    }
  `;
  document.head.appendChild(style);
}
