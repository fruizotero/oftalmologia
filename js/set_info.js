const d = document;

export const setInfoPaciente = (paciente = d.createElement()) => {

    const checkNull = (value = "") => {
        return value.toLowerCase() === "null" ? "" : value;
    }

    let $info = paciente.querySelector(".class__all__info");

    d.querySelector(".info__paciente__codigo").value = checkNull($info.dataset.cod_trabaj);
    d.querySelector(".info__paciente__nombre").value = checkNull($info.dataset.nombre);
    d.querySelector(".info__paciente__direccion").value = checkNull($info.dataset.direccion);
    d.querySelector(".info__paciente__telefono").value = checkNull($info.dataset.telefono);
    d.querySelector(".info__paciente__lugar").value = checkNull($info.dataset.lugar);
    d.querySelector(".info__paciente__ruc").value =
        checkNull($info.dataset.ruc);
    d.querySelector(".info__paciente__edad").value =
        checkNull($info.dataset.edad);
    d.querySelector(".info__paciente__otros").value = checkNull($info.dataset.otros);

}

export const setInfoPacienteDataset = (paciente = d.createElement(), pacienteData = {}) => {

    let $info = paciente.querySelector(".class__all__info");

    $info.dataset.cod_trabaj = pacienteData["cod_trabaj"];
    $info.dataset.nombre = pacienteData["nombre"];
    $info.dataset.direccion = pacienteData["direccion"];
    $info.dataset.telefono = pacienteData["telefono"];
    $info.dataset.lugar = pacienteData["lugar"];
    $info.dataset.ruc = pacienteData["ruc"];
    $info.dataset.edad = pacienteData["edad"];
    $info.dataset.otros = pacienteData["otros"];

}