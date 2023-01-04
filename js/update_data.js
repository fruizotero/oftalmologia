const d = document;

export const updateDataPaciente = async (dataPaciente = {}, callback = () => { }) => {


    try {
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(dataPaciente)
        };

        // let res = await fetch(`http://localhost/oftalmologia/pacientes?codigo=${dataPaciente["cod_trabaj"]}`, options);
        let res = await fetch(`https://fruizotero.com/pacientes?codigo=${dataPaciente["cod_trabaj"]}`, options);
        let json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        console.log(
            json
        );
        callback("Se actualizó correctamente");
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        console.log(message);
        callback("Ocurrió un error. Por favor vuelve a intentarlo")
    }

}