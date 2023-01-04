import { getPacientes } from "../js/get_data.js";

const d = document;

let $fragment = d.createDocumentFragment();

export const renderizarPacientes = (pacientes = []) => {

    pacientes.forEach(paciente => {
        let $templatePaciente = d.querySelector(".template-paciente").content;


        $templatePaciente.querySelector(".paciente").setAttribute("id",paciente["COD_TRABAJ"]);
        $templatePaciente.querySelector(".class__all__info").dataset.cod_trabaj = paciente["COD_TRABAJ"];
        $templatePaciente.querySelector(".class__all__info").dataset.direccion = paciente["DIRECCION"];
        $templatePaciente.querySelector(".class__all__info").dataset.edad = paciente["EDAD"];
        $templatePaciente.querySelector(".class__all__info").dataset.estado_c = paciente["ESTADO_C"];
        $templatePaciente.querySelector(".class__all__info").dataset.lugar = paciente["LUGAR"];
        $templatePaciente.querySelector(".class__all__info").dataset.nombre = paciente["NOMBRE"];
        $templatePaciente.querySelector(".class__all__info").dataset.nvo_codigo = paciente["NVO_CODIGO"];
        $templatePaciente.querySelector(".class__all__info").dataset.otros = paciente["OTROS"];
        $templatePaciente.querySelector(".class__all__info").dataset.ruc = paciente["RUC"];
        $templatePaciente.querySelector(".class__all__info").dataset.telefono = paciente["TELEFONO"];

        $templatePaciente.querySelector(".paciente__nombre").textContent = paciente["NOMBRE"];
        $templatePaciente.querySelector(".paciente__direccion").textContent = paciente["DIRECCION"];
        $templatePaciente.querySelector(".paciente__edad").textContent = paciente["EDAD"];

        let $clone = d.importNode($templatePaciente, true);

        $fragment.appendChild($clone);

    });

    d.querySelector(".pacientes").replaceChildren($fragment);




}