const yes = document.getElementById("yes");
const no = document.getElementById("no");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");

// Variables para guardar la elección de la Screen 2
let chosenPlan = '';
let chosenDay = '';

// Contador para el botón troll
let noCount = 0;

// Función del botón "No" que huye
function escape() {
    // Calculamos los límites basados en la pantalla actual
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 80);

    no.style.position = "absolute";
    no.style.left = x + "px";
    no.style.top = y + "px";

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

// Para móviles es ideal también escuchar el touchstart
no.addEventListener("mouseenter", escape);
no.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Evita clics fantasma
    escape();
});
no.addEventListener("click", escape);

// Pasar a la pantalla 2
yes.onclick = () => {
    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");
}

// --- LÓGICA DE LAS TARJETAS Y DÍAS ---
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

// --- PANTALLA FINAL Y RESUMEN ---
document.getElementById("confirm").onclick = () => {
    // Validar que haya elegido un plan y un día
    if (!chosenPlan || !chosenDay) {
        alert("¡Porfa, elige un plan y un día para continuar! 😊");
        return;
    }

    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");

    // Mostramos el resumen
    document.getElementById("summary").innerHTML = `
        📅 <b>${chosenDay}</b>
         <b></b> ${chosenPlan}
    `;

    confetti();
}

// --- CORAZONES DE FONDO ---
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = ["❤️", "💖", "💕", "💗"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (20 + Math.random() * 20) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
}

setInterval(createHeart, 350);

// --- LLUVIA DE CONFETI FINAL ---
function confetti() {
    for(let i = 0; i < 150; i++) {
        setTimeout(() => {
            const h = document.createElement("div");
            h.innerHTML = ["❤️", "✨", "🎉", "💖"][Math.floor(Math.random() * 4)];
            h.style.position = "absolute";
            h.style.left = Math.random() * 100 + "vw";
            h.style.top = "-30px";
            h.style.fontSize = (20 + Math.random() * 20) + "px";
            h.style.transition = "4s linear";
            
            document.body.appendChild(h);
            
            setTimeout(() => {
                h.style.top = "110vh";
                h.style.transform = `rotate(${Math.random() * 720}deg)`;
            }, 10);
            
            setTimeout(() => h.remove(), 4500);
        }, i * 15);
    }
}