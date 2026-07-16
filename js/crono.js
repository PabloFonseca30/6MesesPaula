export function iniciarCronometro() {
    const contenedor = document.getElementById('unlocked_container_2');
    if (!contenedor) return;
 
    contenedor.innerHTML = `
      <div class="seccion-cronometro" id="seccion_cronometro">
        <h2 class="cronometro-titulo">♡ Cada segundo a tu lado ♡</h2>
        <div class="cronometro-box">
          <div class="tiempo-cuadro">
            <span class="tiempo-valor" id="crono-dias">00</span>
            <span class="tiempo-etiqueta">días</span>
          </div>
          <div class="tiempo-cuadro">
            <span class="tiempo-valor" id="crono-horas">00</span>
            <span class="tiempo-etiqueta">horas</span>
          </div>
          <div class="tiempo-cuadro">
            <span class="tiempo-valor" id="crono-minutos">00</span>
            <span class="tiempo-etiqueta">minutos</span>
          </div>
          <div class="tiempo-cuadro">
            <span class="tiempo-valor" id="crono-segundos">00</span>
            <span class="tiempo-etiqueta">segundos</span>
          </div>
        </div>
        <p class="txt_crono">Este es todo el tiempo que, por suerte o por desgracia, llevo aguantando al amor de mi vida. Como te conozco tan bien, el cronómetro es desde que nos conocimos, no desde que comenzamos a salir.</p>
        <button type="button" class="btn-inicio" id="btn_inicio">Inicio</button>
      </div>
    `;

    const btnInicio = document.getElementById('btn_inicio');
    btnInicio.addEventListener('click', () => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.location.reload();
    });
 
    // AJUSTA esta fecha y hora a la del inicio real de vuestra relación
    const FECHA_INICIO = new Date('2025-10-16T00:00:00');
 
    const elDias = document.getElementById('crono-dias');
    const elHoras = document.getElementById('crono-horas');
    const elMinutos = document.getElementById('crono-minutos');
    const elSegundos = document.getElementById('crono-segundos');
 
    function actualizarCronometro() {
        const ahora = new Date();
        let diffMs = ahora - FECHA_INICIO;
        if (diffMs < 0) diffMs = 0;
 
        const segundosTotales = Math.floor(diffMs / 1000);
        const dias = Math.floor(segundosTotales / 86400);
        const horas = Math.floor((segundosTotales % 86400) / 3600);
        const minutos = Math.floor((segundosTotales % 3600) / 60);
        const segundos = segundosTotales % 60;
 
        elDias.textContent = String(dias).padStart(2, '0');
        elHoras.textContent = String(horas).padStart(2, '0');
        elMinutos.textContent = String(minutos).padStart(2, '0');
        elSegundos.textContent = String(segundos).padStart(2, '0');
    }
 
    actualizarCronometro();
    setInterval(actualizarCronometro, 1000);
}