const yes = document.getElementById("yes");
const no = document.getElementById("no");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");

let chosenPlan = '';
let chosenDay = '';
let noCount = 0;

// --- FUNCIÓN DEL BOTÓN TROLL (Ahora no rompe la pantalla) ---
function escape() {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 80);

    no.style.position = "fixed"; // Esto es clave para que el scroll no se rompa
    no.style.left = Math.max(10, x) + "px";
    no.style.top = Math.max(10, y) + "px";

    noCount++;

    const frases = [
        "Uy",
        "¡Casi!",
        "¿Qué?",
        "QUE COJONES HACES🤡",
        "Vamos no me jodas🫩",
        "Elisa porfavor eh😔",
        "Te has confundido de botón🙂",
        "¿Segura? 🥹",
        "Piensa otra vez ❤️",
        "Jejeje",
        "Caracól 🐌"
    ];

    no.innerText = frases[noCount % frases.length];
    yes.style.transform = `scale(${1 + (noCount * .08)})`;
}

// Funciona tanto con el dedo en móvil como con el ratón
no.addEventListener("mouseenter", escape);
no.addEventListener("touchstart", escape);
no.addEventListener("click", escape);


// --- CUANDO DICE QUE SÍ ---
yes.onclick = () => {
    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");

    // Intenta reproducir la música si pusiste el archivo
    const bgMusic = document.getElementById("bgMusic");
    if(bgMusic) {
        bgMusic.volume = 0.4; // Volumen suavecito
        bgMusic.play().catch(e => console.log("La música requiere archivo mp3 válido"));
    }
}

// --- LÓGICA DE ELEGIR DÍA Y PLAN ---
function selectPlan(plan, element) {
    chosenPlan = plan;
    document.querySelectorAll('.card-plan').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');
}

function selectDay(day, element) {
    chosenDay = day;
    document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
    element.classList.add('selected');
}

// --- PANTALLA FINAL ---
document.getElementById("confirm").onclick = () => {
    if (!chosenPlan || !chosenDay) {
        alert("¡Amore, elige un plan y un día para continuar! 😊");
        return;
    }

    const h = document.getElementById("hour").value;

    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");

    document.getElementById("summary").innerHTML = `
        📅 <b>${chosenDay}</b> a las <b>${h}</b><br><br>
        📍 <b>Plan:</b> ${chosenPlan}
    `;

    confetti();
}

// --- CORAZONES FLOTANTES DE FONDO ---
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = ["❤️", "💖", "💕", "💗"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
}

setInterval(createHeart, 400);

// --- LLUVIA DE CONFETI EN LA PANTALLA 3 ---
function confetti() {
    for(let i = 0; i < 150; i++) {
        setTimeout(() => {
            const h = document.createElement("div");
            h.innerHTML = ["❤️", "✨", "🎉", "💖"][Math.floor(Math.random() * 4)];
            h.style.position = "fixed"; // Fixed para no alargar la página
            h.style.left = Math.random() * 100 + "vw";
            h.style.top = "-50px";
            h.style.fontSize = (20 + Math.random() * 20) + "px";
            h.style.transition = "4s linear";
            h.style.zIndex = "9999"; // Para que caigan por encima de todo
            
            document.body.appendChild(h);
            
            setTimeout(() => {
                h.style.top = "120vh";
                h.style.transform = `rotate(${Math.random() * 720}deg)`;
            }, 10);
            
            setTimeout(() => h.remove(), 4500);
        }, i * 15);
    }
}