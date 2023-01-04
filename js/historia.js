import { getHistoria } from "../js/get_historia.js";
import { renderizarHistoria } from "../js/renderiar_historias.js";

const d = document;
let historias = [];

const setDataPaciente = (datosPaciente = {}) => {

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    d.querySelector(".header__nombre").textContent = datosPaciente["nombre"];
    d.querySelector(".header__direccion").textContent = datosPaciente["direccion"];
    d.querySelector(".header__edad").textContent = datosPaciente["edad"];
    d.querySelector(".header__fecha").textContent = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
}

d.addEventListener("DOMContentLoaded", async e => {

    let datosPaciente = JSON.parse(localStorage.getItem("paciente"));
    setDataPaciente(datosPaciente);
    historias = await getHistoria(datosPaciente["codigo"]);
    console.log(historias);
    renderizarHistoria(historias);
    console.log(historias);

});

