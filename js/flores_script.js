// CONFIGURACIÓN

const NUM_CARRILES = 50;                  // columnas invisibles por las que caen las flores
const TAMANO_FLOR_PORCENTAJE = 17;        // tamaño de cada flor, en % del ancho del contenedor
const JITTER_HORIZONTAL_PORCENTAJE = 5;   // desorden horizontal dentro de cada carril

const DURACION_CAIDA_MIN_MS = 1500;       // tiempo que tarda una flor en atravesar la pantalla
const DURACION_CAIDA_MAX_MS = 2200;

const INTERVALO_MIN_MS = 250;             // cada cuánto nace una flor nueva en un mismo carril
const INTERVALO_MAX_MS = 450;             // (debe ser menor que la duración de caída, si no, se abrirían huecos verticales)

const TIEMPO_HASTA_CUBRIR_MS = 3000;      // cuándo consideramos la pantalla ya cubierta
const TIEMPO_LLOVIENDO_TRAS_CAMBIO_MS = 1000; // cuánto seguimos lloviendo tras cambiar el contenido

const COLORES_FLOR = ['#f7c6dc', '#f2a6c4', '#f9d7e6', '#eb8fb5'];


// REFERENCIAS AL DOM

const capaTransicion = document.getElementById('capa_transicion');
const contenidoActual = document.getElementById('code_box');

// Contenido que aparecerá después
const NUEVO_CONTENIDO_HTML = `
  <div class="fila_pic">
    <div id="c1" class="cuadro">
      <img class="delete" src="sources/puzzle/12.png" alt="Foto_12" draggable="false">
    </div>
    <div id="c2" class="cuadro">
      <img class="delete" src="sources/puzzle/5.png" alt="Foto_5" draggable="false">
    </div>
    <div id="c3" class="cuadro">
      <img class="delete" src="sources/puzzle/14.png" alt="Foto_14" draggable="false">
    </div>
    <div id="c4" class="cuadro">
      <img class="delete" src="sources/puzzle/1.png" alt="Foto_1" draggable="false">
    </div>
  </div> 
  <div class="fila_pic">
    <div id="c5" class="cuadro">
      <img class="delete" src="sources/puzzle/8.png" alt="Foto_8" draggable="false">
    </div>
    <div id="c6" class="cuadro">
      <img class="delete" src="sources/puzzle/15.png" alt="Foto_15" draggable="false">
    </div>
    <div id="c7" class="cuadro">
      <img class="delete" src="sources/puzzle/3.png" alt="Foto_3" draggable="false">
    </div>
    <div id="c8" class="cuadro">
      <img class="delete" src="sources/puzzle/10.png" alt="Foto_10" draggable="false">
    </div>
  </div> 
  <div class="fila_pic">
    <div id="c9" class="cuadro">
      <img class="delete" src="sources/puzzle/6.png" alt="Foto_6" draggable="false">
    </div>
    <div id="c10" class="cuadro">
      <img class="delete" src="sources/puzzle/11.png" alt="Foto_11" draggable="false">
    </div>
    <div id="c11" class="cuadro">
      <img class="delete" src="sources/puzzle/2.png" alt="Foto_2" draggable="false">
    </div>
    <div id="c12" class="cuadro">
      <img class="delete" src="sources/puzzle/13.png" alt="Foto_13" draggable="false">
    </div>
  </div> 
  <div class="fila_pic">
    <div id="c13" class="cuadro">
      <img class="delete" src="sources/puzzle/9.png" alt="Foto_9" draggable="false">
    </div>
    <div id="c14" class="cuadro">
      <img class="delete" src="sources/puzzle/16.png" alt="Foto_16" draggable="false">
    </div>
    <div id="c15" class="cuadro">
      <img class="delete" src="sources/puzzle/7.png" alt="Foto_7" draggable="false">
    </div>
    <div id="c16" class="cuadro">
      <img class="delete" src="sources/puzzle/4.png" alt="Foto_4" draggable="false">
    </div>
  </div> 
`;

let lluviaActiva = false;


// DIBUJO DE UNA FLOR (SVG)

function svgFlor(color) {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g fill="${color}">
        <ellipse cx="50" cy="28" rx="16" ry="24" transform="rotate(0 50 50)"/>
        <ellipse cx="50" cy="28" rx="16" ry="24" transform="rotate(72 50 50)"/>
        <ellipse cx="50" cy="28" rx="16" ry="24" transform="rotate(144 50 50)"/>
        <ellipse cx="50" cy="28" rx="16" ry="24" transform="rotate(216 50 50)"/>
        <ellipse cx="50" cy="28" rx="16" ry="24" transform="rotate(288 50 50)"/>
      </g>
      <circle cx="50" cy="50" r="10" fill="#fff6ca"/>
    </svg>
  `;
}


// CREAR UNA FLOR Y HACERLA CAER

function crearFlorEnCarril(carril) {
  const anchoCarril = 100 / NUM_CARRILES;
  const jitter = (Math.random() - 0.5) * 2 * JITTER_HORIZONTAL_PORCENTAJE;
  const left = carril * anchoCarril - (TAMANO_FLOR_PORCENTAJE / 2) + jitter;

  const rotacionInicial = Math.random() * 360;
  const color = COLORES_FLOR[Math.floor(Math.random() * COLORES_FLOR.length)];

  const flor = document.createElement('div');
  flor.className = 'flor';
  flor.style.width  = TAMANO_FLOR_PORCENTAJE + '%';
  flor.style.height = TAMANO_FLOR_PORCENTAJE + '%';
  flor.style.left   = left + '%';
  flor.style.top    = '-' + TAMANO_FLOR_PORCENTAJE + '%';
  flor.innerHTML = svgFlor(color);

  capaTransicion.appendChild(flor);

  const duracion = DURACION_CAIDA_MIN_MS +
    Math.random() * (DURACION_CAIDA_MAX_MS - DURACION_CAIDA_MIN_MS);

  const balanceo = 15 + Math.random() * 20;

  const animacion = flor.animate([
    { top: '-' + TAMANO_FLOR_PORCENTAJE + '%',
      transform: `translateX(0px) rotate(${rotacionInicial}deg)` },
    { top: '50%',
      transform: `translateX(${balanceo}px) rotate(${rotacionInicial + 180}deg)` },
    { top: '120%',
      transform: `translateX(-${balanceo}px) rotate(${rotacionInicial + 360}deg)` }
  ], {
    duration: duracion,
    easing: 'linear',
    fill: 'forwards'
  });

  animacion.onfinish = () => flor.remove();
}


// BUCLE DE UN CARRIL (genera flores sin parar mientras lluviaActiva sea true)

function bucleCarril(carril) {
  if (!lluviaActiva) return;

  crearFlorEnCarril(carril);

  const intervalo = INTERVALO_MIN_MS +
    Math.random() * (INTERVALO_MAX_MS - INTERVALO_MIN_MS);

  setTimeout(() => bucleCarril(carril), intervalo);
}

function iniciarTodosLosCarriles() {
  for (let carril = 0; carril < NUM_CARRILES; carril++) {
    const retrasoInicial = Math.random() * INTERVALO_MAX_MS;
    setTimeout(() => bucleCarril(carril), retrasoInicial);
  }
}


//TRANSICIÓN COMPLETA

export function iniciarTransicion(){
  lluviaActiva = true;
  iniciarTodosLosCarriles();

  // Cuando la pantalla ya está cubierta, cambiamos el contenido de detrás
  setTimeout(() => {
    contenidoActual.innerHTML = NUEVO_CONTENIDO_HTML;
    contenidoActual.style.backgroundColor = "rgb(249, 240, 246)";
    contenidoActual.style.boxShadow = "0px 0px 7px rgb(188, 188, 188)";

    const titulos = document.getElementById('tittle_cuadro');
    titulos.style.display = 'block';

    const scriptCuadro = document.createElement('script');
    scriptCuadro.src = 'js/cuadro.js';
    scriptCuadro.defer = true;
    document.head.appendChild(scriptCuadro);
  }, TIEMPO_HASTA_CUBRIR_MS);

  // Un rato después, dejamos de generar flores nuevas
  setTimeout(() => {
    lluviaActiva = false;
  }, TIEMPO_HASTA_CUBRIR_MS + TIEMPO_LLOVIENDO_TRAS_CAMBIO_MS);
}