
const d = document;

let $fragment = d.createDocumentFragment();

const returnListItem = (value) => {
    let $listItem = d.createElement("li");
    $listItem.textContent = value;
    return $listItem;
}

export const renderizarHistoria = (historias = []) => {

    let $templateRow = d.querySelector(".template-historia").content;

    historias.forEach(historia => {

        $templateRow.querySelector(".td_fecha").textContent = historia["FECHA"] !== null ? historia["FECHA"].replace("00:00:00", "").trim() : "";
        $templateRow.querySelector(".td_enfermedad").textContent = historia["ENFERM_ACT"];
        $templateRow.querySelector(".td_odv").textContent = historia["ODV"];
        $templateRow.querySelector(".td_oiv").textContent = historia["OIV"];
        $templateRow.querySelector(".td_po").textContent = historia["TEXTO1"];

        let $fragmentTexto = d.createDocumentFragment();
        if (historia["TEXTO2"] !== "") {
            $fragmentTexto.appendChild(returnListItem(historia["TEXTO2"]));
        }
        if (historia["TEXTO2B"] !== "") {
            $fragmentTexto.appendChild(returnListItem(historia["TEXTO2B"]));
        }
        if (historia["TEXTO2C"] !== "") {
            $fragmentTexto.appendChild(returnListItem(historia["TEXTO2C"])); (returnListItem(historia["TEXTO2C"]));
        }
        $templateRow.querySelector(".td_re_ul").replaceChildren($fragmentTexto);

        $templateRow.querySelector(".td_fo").textContent = historia["TEXTO3"];
        $templateRow.querySelector(".td_dx").textContent = historia["TEXTO4"];
        $templateRow.querySelector(".td_rp").textContent = historia["TEXTO5"]

        let $fragmentResult = d.createDocumentFragment();
        if (historia["RESUL1"] !== "") {
            $fragmentResult.appendChild(returnListItem(historia["RESUL1"]));
            // $templateRow.querySelector(".td_resultados_ul").appendChild
            // (returnListItem(historia["RESUL1"]));
        }
        if (historia["RESUL2"] !== "") {
            $fragmentResult.appendChild(returnListItem(historia["RESUL2"]));
            // $templateRow.querySelector(".td_resultados_ul").appendChild
            // (returnListItem(historia["RESUL2"]));
        }
        if (historia["RESUL3"] !== "") {
            $fragmentResult.appendChild(returnListItem(historia["RESUL3"]));
            // $templateRow.querySelector(".td_resultados_ul").appendChild
            // (returnListItem(historia["RESUL3"]));
        }
        $templateRow.querySelector(".td_resultados_ul").replaceChildren($fragmentResult);

        let $clone = d.importNode($templateRow, true);
        $fragment.appendChild($clone);
    });

    d.querySelector(".historias").appendChild($fragment);

}