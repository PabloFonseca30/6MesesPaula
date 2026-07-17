let active = 0;
let selected = '';
let final = 0;

const wuah = new Audio('sources/effects/wuah.mp3');
const pop = new Audio('sources/effects/pop.m4a');

const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const c4 = document.getElementById("c4");
const c5 = document.getElementById("c5");
const c6 = document.getElementById("c6");
const c7 = document.getElementById("c7");
const c8 = document.getElementById("c8");
const c9 = document.getElementById("c9");
const c10 = document.getElementById("c10");
const c11 = document.getElementById("c11");
const c12 = document.getElementById("c12");
const c13 = document.getElementById("c13");
const c14 = document.getElementById("c14");
const c15 = document.getElementById("c15");
const c16 = document.getElementById("c16");

c1.addEventListener("click", () => {
    selection(c1);
});

c2.addEventListener("click", () => {
    selection(c2);
});

c3.addEventListener("click", () => {
    selection(c3);
});

c4.addEventListener("click", () => {
    selection(c4);
});

c5.addEventListener("click", () => {
    selection(c5);
});

c6.addEventListener("click", () => {
    selection(c6);
});

c7.addEventListener("click", () => {
    selection(c7);
});

c8.addEventListener("click", () => {
    selection(c8);
});

c9.addEventListener("click", () => {
    selection(c9);
});

c10.addEventListener("click", () => {
    selection(c10);
});

c11.addEventListener("click", () => {
    selection(c11);
});

c12.addEventListener("click", () => {
    selection(c12);
});

c13.addEventListener("click", () => {
    selection(c13);
});

c14.addEventListener("click", () => {
    selection(c14);
});

c15.addEventListener("click", () => {
    selection(c15);
});

c16.addEventListener("click", () => {
    selection(c16);
});

function selection(cell){
    pop.currentTime = 0;
    pop.play();

    if(final == 0){
        if(active < 2 && selected != cell){
            if(active == 0){
                selected = cell;
            }
            active++;
            cell.style.border = "solid 3px rgb(223, 56, 207)";

            if(active == 2){
                intercambiar(cell);
                comprobar();
            }

        } else if(selected == cell){
            cell.style.border = "none";
            selected = '';
            active--;
        }
    }
}

function intercambiar(cell){
    const imagen1 = cell.querySelector("img");
    let rutaImagen1 = imagen1.getAttribute('src');
    const imagen2 = selected.querySelector("img");
    let rutaImagen2 = imagen2.getAttribute('src');

    imagen1.setAttribute('src', rutaImagen2);
    imagen2.setAttribute('src', rutaImagen1);

    cell.style.border = "none";
    selected.style.border = "none";
    selected = '';
    active = 0;
}

function comprobar(){
    const imagen1 = c1.querySelector("img");
    let rutaImagen1 = imagen1.getAttribute('src');
    const imagen2 = c2.querySelector("img");
    let rutaImagen2 = imagen2.getAttribute('src');
    const imagen3 = c3.querySelector("img");
    let rutaImagen3 = imagen3.getAttribute('src');
    const imagen4 = c4.querySelector("img");
    let rutaImagen4 = imagen4.getAttribute('src');
    const imagen5 = c5.querySelector("img");
    let rutaImagen5 = imagen5.getAttribute('src');
    const imagen6 = c6.querySelector("img");
    let rutaImagen6 = imagen6.getAttribute('src');
    const imagen7 = c7.querySelector("img");
    let rutaImagen7 = imagen7.getAttribute('src');
    const imagen8 = c8.querySelector("img");
    let rutaImagen8 = imagen8.getAttribute('src');
    const imagen9 = c9.querySelector("img");
    let rutaImagen9 = imagen9.getAttribute('src');
    const imagen10 = c10.querySelector("img");
    let rutaImagen10 = imagen10.getAttribute('src');
    const imagen11 = c11.querySelector("img");
    let rutaImagen11 = imagen11.getAttribute('src');
    const imagen12 = c12.querySelector("img");
    let rutaImagen12 = imagen12.getAttribute('src');
    const imagen13 = c13.querySelector("img");
    let rutaImagen13 = imagen13.getAttribute('src');
    const imagen14 = c14.querySelector("img");
    let rutaImagen14 = imagen14.getAttribute('src');
    const imagen15 = c15.querySelector("img");
    let rutaImagen15 = imagen15.getAttribute('src');
    const imagen16 = c16.querySelector("img");
    let rutaImagen16 = imagen16.getAttribute('src');

    if(rutaImagen1 == "sources/puzzle/16.png" &&
        rutaImagen2 == "sources/puzzle/15.png" &&
        rutaImagen3 == "sources/puzzle/14.png" &&
        rutaImagen4 == "sources/puzzle/13.png" &&
        rutaImagen5 == "sources/puzzle/12.png" &&
        rutaImagen6 == "sources/puzzle/11.png" &&
        rutaImagen7 == "sources/puzzle/10.png" &&
        rutaImagen8 == "sources/puzzle/9.png" &&
        rutaImagen9 == "sources/puzzle/8.png" &&
        rutaImagen10 == "sources/puzzle/7.png" &&
        rutaImagen11 == "sources/puzzle/6.png" &&
        rutaImagen12 == "sources/puzzle/5.png" &&
        rutaImagen13 == "sources/puzzle/4.png" &&
        rutaImagen14 == "sources/puzzle/3.png" &&
        rutaImagen15 == "sources/puzzle/2.png" &&
        rutaImagen16 == "sources/puzzle/1.png")
        {
            wuah.currentTime = 0;
            wuah.play();
            const marco = document.getElementById("code_box");
            marco.style.border = "solid 4px #F5A0A1";
            marco.style.marginBottom = "0";
            const next = document.getElementById("next_btn");
            next.style.visibility = "visible";
            final++;
        }
}