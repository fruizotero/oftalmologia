const d = document;

export const newPaciente = async (paciente = {}, callback = () => { }) => {

    try {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(paciente)
        };
        // let res = await fetch("http://localhost/oftalmologia/pacientes", options);
        let res = await fetch("https://fruizotero.com/pacientes", options);
        let json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        console.log(
            json
        );
        // location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        console.log(message);
        callback("Ocurrió un error. Por favor vuelve a intentarlo")
        // $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
    }

}