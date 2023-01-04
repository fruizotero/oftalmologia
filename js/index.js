import { getPacientes, getPacientesBuscar } from "../js/get_data.js";
import { Pagination } from "../js/pagination.js";
import { renderizarPacientes } from "../js/renderizar_pacientes.js";
import { setInfoPaciente, setInfoPacienteDataset } from "../js/set_info.js";
import { updateDataPaciente } from "../js/update_data.js";
import { newPaciente } from "../js/new_data.js";
import { newHistoria } from "../js/new_historia.js";
import { deletePaciente } from "../js/delete_data.js";

const d = document;
let datosPacientes = [];
let datosPacienteAux = [];
let elementCodigo;
let $elementParent;
let pag = new Pagination();

const disableElement = (classElement, isDisabled) => {
    d.querySelectorAll(classElement).forEach(el => {
        el.disabled = isDisabled;
    });
}

const showMessage = (mensaje) => {
    d.querySelector(".mensaje").textContent = mensaje;
    d.querySelector(".mensaje").classList.add("show-mensaje");
    setTimeout(() => {

        d.querySelector(".mensaje").classList.remove("show-mensaje");
    }, 2000);
}

const updatePacienteArray = (paciente = {}) => {
    for (let index = 0; index < datosPacientes.length; index++) {
        if (datosPacientes[index]["COD_TRABAJ"] === paciente["cod_trabaj"]) {

            datosPacientes[index]["DIRECCION"] = paciente["direccion"];
            datosPacientes[index]["EDAD"] = paciente["edad"];
            datosPacientes[index]["ESTADO_C"] = paciente["estado"];
            datosPacientes[index]["LUGAR"] = paciente["lugar"];
            datosPacientes[index]["NOMBRE"] = paciente["nombre"];
            datosPacientes[index]["OTROS"] = paciente["otros"];
            datosPacientes[index]["RUC"] = paciente["ruc"];
            datosPacientes[index]["TELEFONO"] = paciente["telefono"];
            break;
        }
    }

    // console.log(datosPacientes);
}

const updatePagination = () => {

    pag.setValues(
        0,
        datosPacientes.length < 5 ? datosPacientes.length : 5,
        datosPacientes.length < 5 ? datosPacientes.length : 5,
        1,
        datosPacientes
    );

    renderizarPacientes(pag.elementsPAge(pag.indexBegin, pag.indexFinal, datosPacientes));
    pag.paginationText(pag.counter, pag.totalPages, ".paginacion__text");
}

d.addEventListener("DOMContentLoaded", async e => {
    console.log(

    );

    datosPacientes = await getPacientes();
    datosPacienteAux = [...datosPacientes];
    pag.pagination(datosPacientes, ".button__left", ".button__right", ".paginacion__text", renderizarPacientes);

});

d.addEventListener("click", async e => {

    if (e.target.matches(".paciente__info") ||
        e.target.matches(".paciente__info *")
    ) {
        let $parent = e.target.closest(".paciente");
        setInfoPaciente($parent);
        disableElement(".disabled", true);
        d.querySelector(".info__paciente").classList.toggle("info__paciente__show");
    }
    if (e.target.matches(".info__paciente__container") ||
        e.target.matches(".info__paciente__container *")
    ) {
        d.querySelector(".info__paciente").classList.toggle("info__paciente__show");
    }

    if (e.target.matches(".info__paciente__container__editar") ||
        e.target.matches(".info__paciente__container__editar *")) {
        disableElement(".disabled", false);
    }

    if (e.target.matches(".info__paciente__guardar") || e.target.matches(".info__paciente__guardar *")) {
        let $paciente = {
            "cod_trabaj": parseInt(d.querySelector(".info__paciente__codigo").value),
            "nombre": d.querySelector(".info__paciente__nombre").value,
            "direccion": d.querySelector(".info__paciente__direccion").value,
            "telefono": d.querySelector(".info__paciente__telefono").value,
            "lugar": d.querySelector(".info__paciente__lugar").value,
            "ruc": d.querySelector(".info__paciente__ruc").value,
            "estado": "",
            "edad": d.querySelector(".info__paciente__edad").value,
            "otros": d.querySelector(".info__paciente__otros").value,
        }
        //Database
        await updateDataPaciente($paciente, showMessage);
        //Array
        updatePacienteArray($paciente)
        //Dataset
        let $parent = d.getElementById($paciente["cod_trabaj"]);
        setInfoPacienteDataset($parent, $paciente);
        //DOM
        $parent.querySelector(".paciente__nombre").textContent = $paciente["nombre"];
        $parent.querySelector(".paciente__direccion").textContent = $paciente["direccion"];
        $parent.querySelector(".paciente__edad").textContent = $paciente["edad"];
        //
        disableElement(".disabled", true);
    }

    if (e.target.matches(".add__paciente") ||
        e.target.matches(".add__paciente *")) {
        d.querySelector(".new__paciente").classList.toggle("new__paciente__show");
    }

    if (e.target.matches(".new__paciente__container") ||
        e.target.matches(".new__paciente__container *")) {
        d.querySelector(".new__paciente").classList.toggle("new__paciente__show");
    }

    if (e.target.matches(".paciente__historia") ||
        e.target.matches(".paciente__historia *")
    ) {
        let $parent = e.target.closest(".paciente");
        let $info = $parent.querySelector(".class__all__info");
        let datosPaciente = {
            nombre: $info.dataset.nombre,
            direccion: $info.dataset.direccion,
            edad: $info.dataset.edad,
            codigo: $info.dataset.cod_trabaj
        }

        localStorage.setItem("paciente", JSON.stringify(datosPaciente));
    }
    if (e.target.matches(".paciente__nueva__historia") ||
        e.target.matches(".paciente__nueva__historia *")
    ) {
        let $parent = e.target.closest(".paciente");
        d.querySelector(".new__historia").classList.toggle("new__historia__show");
        d.querySelector(".new__historia").dataset.codigo = $parent.getAttribute("id");

        let nombre = $parent.querySelector(".class__all__info").dataset.nombre;
        d.querySelector(".new__historia--nombre").textContent = nombre;
    }

    if (e.target.matches(".new__historia__container") ||
        e.target.matches(".new__historia__container *")) {
        
        // console.log(nombre);
        // new__historia--nombe
        d.querySelector(".new__historia").classList.toggle("new__historia__show");
    }

    if (e.target.matches(".remove") ||
        e.target.matches(".remove *")
    ) {
        d.querySelector(".alert").classList.toggle("alert__show");
        $elementParent = e.target.closest(".paciente");
        elementCodigo = $elementParent.getAttribute("id");
        let nombre = $elementParent.querySelector(".class__all__info").dataset.nombre;
        d.querySelector(".alert__nombre").textContent = nombre;
    }

    if (e.target.matches(".alert__true")) {
        d.querySelector(".alert").classList.toggle("alert__show");
        $elementParent.classList.add("paciente--hidden");
        await deletePaciente(elementCodigo, showMessage("Se ha eliminado un paciente"));
        setTimeout(() => {
            d.querySelector(".pacientes").removeChild($elementParent);
        }, 1000);
        location.reload();
    }
    if (e.target.matches(".alert__false")) {
        d.querySelector(".alert").classList.toggle("alert__show");
    }

    if (e.target.matches(".buscador__container") ||
        e.target.matches(".buscador__container *")) {
        let buscar = d.querySelector(".buscador__input").value.toLowerCase().trim();
        if (buscar !== "") {
            datosPacientes = await getPacientesBuscar(buscar);
            console.log(datosPacientes.length);
            d.querySelector(".resultados__numero").textContent = datosPacientes.length;
            d.querySelector(".resultados").classList.toggle("resultados__show");
            setTimeout(() => {
                d.querySelector(".resultados").classList.toggle("resultados__show");
            }, 2000);

            if (datosPacientes.length > 0) {
                updatePagination();
            }
        }
    }

});

d.addEventListener("submit", async e => {

    //Nuevo paciente
    if (e.target.matches(".new__paciente")) {
        e.preventDefault();
        let $form = e.target;
        let $newPaciente = {
            "nombre": $form["nombre"].value,
            "direccion": $form["direccion"].value,
            "telefono": $form["telefono"].value,
            "ruc": $form["ruc"].value,
            "edad": $form["edad"].value,
            "otros": $form["otros"].value,
            "lugar": "",
            "estado": ""
        }

        await newPaciente($newPaciente, showMessage("Se añadió un nuevo usuario"));
        e.target.reset();
        d.querySelector(".new__paciente").classList.toggle("new__paciente__show");
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    //Nueva historia

    if (e.target.matches(".new__historia")) {
        e.preventDefault();
        let $form = e.target;
        let $newHistoria = {
            "importe": $form["importe"].value,
            "enfermedad": $form["enfermedad"].value,
            "odv": $form["odv"].value,
            "oiv": $form["oiv"].value,
            "texto1": $form["texto1"].value,
            "texto2": $form["texto2"].value,
            "texto2b": $form["texto2b"].value,
            "texto2c": $form["texto2c"].value,
            "texto3": $form["texto3"].value,
            "texto4": $form["texto4"].value,
            "texto5": $form["texto5"].value,
            "resul1": $form["resul1"].value,
            "fecha": "",
            "resul2": "",
            "resul3": "",
            "cod_examen": "",
            "cod_intiqui": "",
            "cod_otros": "",
            "cod_trab": e.target.dataset.codigo
        }

        await newHistoria($newHistoria, showMessage("Se Añadió un nuevo diagnóstico"))
        e.target.reset();
        d.querySelector(".new__historia").classList.toggle("new__historia__show");
    }

});

d.addEventListener("keyup", async e => {


    if (e.target.matches(".buscador__input")) {

        let buscar = e.target.value.toLowerCase().trim();

        if (e.key === "Enter") {

            if (buscar !== "") {

                // let result = [];
                datosPacientes = await getPacientesBuscar(buscar);
                console.log(datosPacientes.length);
                d.querySelector(".resultados__numero").textContent = datosPacientes.length;
                d.querySelector(".resultados").classList.toggle("resultados__show");
                setTimeout(() => {
                    d.querySelector(".resultados").classList.toggle("resultados__show");
                }, 2000);

                if (datosPacientes.length > 0) {
                    updatePagination();
                }
            }
        }

        if (e.key === "Backspace") {
            if (e.target.value === "") {
                datosPacientes = [...datosPacienteAux];
                updatePagination();

            }
        }
    }
    console.log(e.key);
});