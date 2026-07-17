import { iniciarTransicion } from './flores_script.js';
import { iniciarCronometro } from './crono.js';

const bonk = new Audio('sources/effects/bonk.mp3');
const pedo = new Audio('sources/effects/pedo.mp3');
const cuack = new Audio('sources/effects/cuack.mp3');
const weee = new Audio('sources/effects/weee.mp3');
const uh = new Audio('sources/effects/uh.mp3');
const bruh = new Audio('sources/effects/bruh.mp3');
const aaaaaaaa = new Audio('sources/effects/aaaaaaaa.mp3');
const deslizar = new Audio('sources/effects/deslizar.mp3');
const titanic = new Audio('sources/effects/titanic_flute.mp3');

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const clave = "2001";
const intento = [];
let position = 0;
let fallos = 0;
const color_digito = "rgb(238, 0, 219)"

const b1 = document.getElementById("n1");
const b2 = document.getElementById("n2");
const b3 = document.getElementById("n3");
const b4 = document.getElementById("n4");
const b5 = document.getElementById("n5");
const b6 = document.getElementById("n6");
const b7 = document.getElementById("n7");
const b8 = document.getElementById("n8");
const b9 = document.getElementById("n9");
const b0 = document.getElementById("n0");
const del = document.getElementById("nDel");
const pista = document.getElementById("nPista");
const pista_box = document.getElementById("pista_box");

const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
const d3 = document.getElementById("d3");
const d4 = document.getElementById("d4");

b1.addEventListener("click", () => {
    let value = 1;
    update_try(value);
});

b2.addEventListener("click", () => {
    let value = 2;
    update_try(value);
});

b3.addEventListener("click", () => {
    let value = 3;
    update_try(value);
});

b4.addEventListener("click", () => {
    let value = 4;
    update_try(value);
});

b5.addEventListener("click", () => {
    let value = 5;
    update_try(value);
});

b6.addEventListener("click", () => {
    let value = 6;
    update_try(value);
});

b7.addEventListener("click", () => {
    let value = 7;
    update_try(value);
});

b8.addEventListener("click", () => {
    let value = 8;
    update_try(value);
});

b9.addEventListener("click", () => {
    let value = 9;
    update_try(value);
});

b0.addEventListener("click", () => {
    let value = 0;
    update_try(value);
});

del.addEventListener("click", () => {
    if(intento.length >= 1)
    {
        bonk.currentTime = 0;
        bonk.play();

        intento.pop();
        position--;
        update_position(position);
    }
});

pista.addEventListener("click", () => {
    if(fallos >= 2){
        pedo.currentTime = 0;
        pedo.play();
        pista_box.style.visibility = "visible";
        pista_box.style.opacity = "1";
    }
});

function update_try(value) {
    cuack.currentTime = 0;
    cuack.play();

    // Insertar nuevo
    intento.push(value);
    position++;
    update_position(position);

    // Si el array está lleno
    if(intento.length == 4)
    {
        if(intento.join('') == clave)
        {
            weee.currentTime = 0;
            weee.play();
            iniciarTransicion();
        } else {
            parpadeo_rojo();
            setTimeout(() => {
                parpadeo_rojo();
            }, 500);
            intento.length = 0;
            position = 0;
            fallos++;
            if(fallos == 1){
                uh.currentTime = 0;
                uh.play();
            } else if(fallos == 2){
                bruh.currentTime = 0;
                bruh.play();
            } else if(fallos > 2){
                aaaaaaaa.currentTime = 0;
                aaaaaaaa.play();
            }
            if(fallos >= 2){
                pista.style.visibility = "visible";
                pista.style.cursor = "pointer";
            }
        }
    }
}

function update_position(position) {
    if(position == 0){
        d1.style.backgroundColor = "grey";
        d2.style.backgroundColor = "grey";
        d3.style.backgroundColor = "grey";
        d4.style.backgroundColor = "grey";
    }
    if(position == 1){
        d1.style.backgroundColor = color_digito;
        d2.style.backgroundColor = "grey";
        d3.style.backgroundColor = "grey";
        d4.style.backgroundColor = "grey";
    }
    if(position == 2){
        d1.style.backgroundColor = color_digito;
        d2.style.backgroundColor = color_digito;
        d3.style.backgroundColor = "grey";
        d4.style.backgroundColor = "grey";
    }
    if(position == 3){
        d1.style.backgroundColor = color_digito;
        d2.style.backgroundColor = color_digito;
        d3.style.backgroundColor = color_digito;
        d4.style.backgroundColor = "grey";
    }
    if(position == 4){
        d1.style.backgroundColor = color_digito;
        d2.style.backgroundColor = color_digito;
        d3.style.backgroundColor = color_digito;
        d4.style.backgroundColor = color_digito;
    }
}

function parpadeo_rojo() {
    d1.style.backgroundColor = "red";
    d2.style.backgroundColor = "red";
    d3.style.backgroundColor = "red";
    d4.style.backgroundColor = "red";

    setTimeout(() => {
        d1.style.backgroundColor = "grey";
        d2.style.backgroundColor = "grey";
        d3.style.backgroundColor = "grey";
        d4.style.backgroundColor = "grey";
    }, 250);
}

// Bloqueo de scroll y teclas

function bloquearRueda(e) {
    e.preventDefault();
}

function bloquearTeclas(e) {
    const teclasScroll = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (teclasScroll.includes(e.key)) {
        e.preventDefault();
    }
}

document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

window.addEventListener('wheel', bloquearRueda, { passive: false });
window.addEventListener('touchmove', bloquearRueda, { passive: false });
window.addEventListener('keydown', bloquearTeclas);

// Desbloquear página

const next_btn = document.getElementById('next_btn');
const PATH_DEL_PAJARO = `<path d="M410.5 130.2c-20.1 8.5-44.2 11.1-66.3 12.8-11.2.9-20.1-8.2-21.2-19.4-2.1-22.1-12.3-43.2-28.5-58.1-16.2-14.9-38.1-21.2-60.1-16.4-18.4 4.1-33.1 18.2-39.2 36.1-7.1 21.1-3.2 46.2-1.1 69.4-28.2-10.1-58.1-15.2-88.3-12.2-19.1 1.9-38.2 7.1-55.1 17.2-10.2 6.1-13.1 20.1-7.1 30.2 5.1 8.2 14.2 12.1 23.1 9.1 22.1-7.1 45.2-11.2 68.3-13.1-22.1 10.2-43.2 23.1-61.2 39.2-8.2 7.1-10.2 20.1-5.1 30.2 5.1 10.2 18.2 14.2 28.2 9.1 20.1-10.2 38.2-23.1 55.1-39.2-17.2 11.2-33.1 25.1-47.2 41.2-7.1 8.2-7.1 20.1-1 28.2 7.1 8.2 19.1 9.1 27.2 3 20.1-16.2 38.2-35.1 55.1-56.1-9.1 13.1-16.2 27.2-22.1 42.2-4.1 10.2 0 21.1 9.1 26.2 9.1 4.1 20.1 0 25.1-9.1 19.1-41.2 46.2-78.2 80.3-108.3 19.1-17.2 40.2-31.2 63.3-42.2 11.2-5.1 18.2-17.2 18.2-30.2 0-13-8.1-24.1-20.1-29.2z" fill="#111111"/>`;

next_btn.addEventListener('click', () => {
    deslizar.currentTime = 0;
    deslizar.play();

    const unlockedContainer = document.getElementById('unlocked_container');
    unlockedContainer.innerHTML = `
      <div class="escena-carta">
        <!-- Capa de fondo (Detrás de la carta) -->
        <div class="capa-pajaros-detras"></div>

        <!-- Capa intermedia: Carta y pájaros posados -->
        <div class="carta-recipiente">
          <div class="carta">
             <h2>Te amo, Paula</h2>
             <p>En estos seis meses de relación me he dado cuenta de que soy el hombre más afortunado del mundo por tenerte a mi lado. Me hace muy feliz saber lo mucho que me quieres, despertarme abrazado a ti, reirnos a carcajadas por cosas absurdas, compartir tiempo contigo ya sea haciendo planes guays o viendo como me revientas todos los granos de la cara...</p>
             <p>Siento que desde que nos conocimos hemos conectado de una forma muy profunda, siento que estamos hechos para amarnos el uno al otro por siempre. Eres el amor de mi vida, y se a ciencia cierta que esta relación es para siempre.</p>
             <p>Te amo por siempre, Paula.</p>
          </div>
          <div class="next_btn2" id="next_btn2">
            <img class="flecha2" src="sources/flecha.png" alt="flecha2" draggable="false">
          </div>

          <!-- Pájaro posado izquierdo -->
          <div class="pajaro-posado" id="pajaro1">
             <svg class="pajaro-svg" viewBox="0 0 512 512">${PATH_DEL_PAJARO}</svg>
          </div>
          
          <!-- Pájaro posado derecho -->
          <div class="pajaro-posado" id="pajaro2">
             <svg class="pajaro-svg" viewBox="0 0 512 512">${PATH_DEL_PAJARO}</svg>
          </div>
        </div>

        <!-- Capa delantera (Pasan por encima de la carta) -->
        <div class="capa-pajaros-delante"></div>
      </div>
    `;

    iniciarRevoloteoPajaros();
    iniciarCronometro();

    setTimeout(() => {
        titanic.currentTime = 0;
        titanic.play();
    }, 1500);
    

    requestAnimationFrame(() => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    setTimeout(() => {
        const next_btn2 = document.getElementById('next_btn2');
        next_btn2.style.visibility = "visible";

        next_btn2.addEventListener('click', () => {
            deslizar.currentTime = 0;
            deslizar.play();
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: window.innerHeight * 2,
                    behavior: 'smooth'
                });
            });
        });
    }, 20000);
});

function iniciarRevoloteoPajaros() {
    const capaDetras = document.querySelector('.capa-pajaros-detras');
    const capaDelante = document.querySelector('.capa-pajaros-delante');

    function crearPajaro() {
        if (!capaDetras || !capaDelante) return;

        const pajaro = document.createElement('div');
        pajaro.className = 'pajaro-volando';
        pajaro.innerHTML = `<svg class="pajaro-svg" viewBox="0 0 512 512">${PATH_DEL_PAJARO}</svg>`;

        // Alturas aleatorias de vuelo en % de pantalla
        const yInicio = Math.random() * 70 + 10; // Entre el 10% y 80% de la pantalla
        const yFin = Math.random() * 70 + 10;
        const duracion = Math.random() * 3 + 5;   // Tardan entre 5s y 8s en cruzar
        const retraso = Math.random() * 1.5;

        pajaro.style.setProperty('--y-inicio', `${yInicio}vh`);
        pajaro.style.setProperty('--y-fin', `${yFin}vh`);
        pajaro.style.animationDuration = `${duracion}s`;
        pajaro.style.animationDelay = `${retraso}s`;

        // El 40% de los pájaros pasará por detrás de la carta (z-index inferior)
        if (Math.random() > 0.4) {
            capaDelante.appendChild(pajaro);
        } else {
            capaDetras.appendChild(pajaro);
        }

        // Limpiar el DOM una vez terminen de volar
        setTimeout(() => {
            pajaro.remove();
        }, (duracion + retraso) * 1000);
    }

    // A los 5 segundos exactos (cuando los posados se asustan) empiezan a cruzar bandadas
    setTimeout(() => {
        // Generar un pájaro cada 1.8 segundos
        setInterval(crearPajaro, 1800);
        
        // Lanzar los 3 primeros de golpe para un efecto inmediato de estampida
        crearPajaro();
        crearPajaro();
        crearPajaro();
    }, 3500);
}