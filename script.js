/**
 * MOTOR DE LLUVIA DE DATOS MATRIX - ALAN SERVÍN
 */

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Caracteres: Números binarios, Katakana y Letras Técnicas
const characters = "0101010101ABCDEFHIJKLMNOPQRSTUVWXYZ@#$%&*()<>[]{}";
const fontSize = 18;
let columns = Math.floor(width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    // Fondo semitransparente para crear el rastro (trail)
    ctx.fillStyle = "rgba(0, 5, 5, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = `bold ${fontSize}px 'Fira Code'`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Efecto de brillo aleatorio (algunos caracteres son blancos)
        if (Math.random() > 0.98) {
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00ffcc";
        } else {
            ctx.fillStyle = "#00ffcc";
            ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicio de la gota al llegar al final de la pantalla
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Reloj en tiempo real
function updateSystemTime() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        clockElement.innerText = now.toISOString().split('T')[1].split('.')[0];
    }
}

// Manejo de redimensionamiento de ventana
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
});

// Inicialización del motor
setInterval(drawMatrix, 35);
setInterval(updateSystemTime, 1000);

// Generar un ID de Sesión único al azar
document.getElementById('session-id').innerText = `AS-${Math.floor(Math.random() * 9000 + 1000)}-${Math.random().toString(36).substring(7).toUpperCase()}`;

