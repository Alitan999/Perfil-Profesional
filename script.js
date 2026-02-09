/**
 * MATRIX KERNEL - ALAN JESÚS SERVÍN TREJO
 * HIGH INTENSITY DATA STREAM
 */

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height, columns, drops;
const fontSize = 16;
const characters = "0101010101ABCDEFHIJKLMNOPQRSTUVWXYZ@#$%&*+=-";

function initMatrix() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    // Semi-transparent background for motion trail
    ctx.fillStyle = "rgba(0, 8, 8, 0.15)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = `bold ${fontSize}px 'Fira Code'`;

    for (let i = 0; i < drops.length; i++) {
        // Random character selection
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Highlight logic (some characters flash white)
        if (Math.random() > 0.98) {
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#00ffcc";
        } else {
            ctx.fillStyle = "#00ffcc";
            ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top with randomness
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// System Init
window.addEventListener('load', () => {
    initMatrix();
    setInterval(drawMatrix, 40);
});

// Responsive Handler
window.addEventListener('resize', () => {
    initMatrix();
});

// Optional: Security Sound simulation on click (Visual only)
document.querySelector('.main-frame').addEventListener('click', () => {
    console.log("UI Interaction Logged: Secure Session Active");
});

