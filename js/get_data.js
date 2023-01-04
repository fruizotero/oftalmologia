const d = document;

export const getPacientes = async () => {

    try {

        // let resp = await fetch("http://localhost/oftalmologia/pacientes");
        let resp = await fetch("https://fruizotero.com/pacientes");

        let json = await resp.json();

        if (!resp.ok) throw { status: resp.status, statusText: resp.statusText };

        return json["result"];

    } catch (error) {

        console.log(error);
    }

}
export const getPacientesBuscar = async (nombre) => {

    try {

        // let resp = await fetch(`http://localhost/oftalmologia/buscar?nombre=${nombre}`);
        let resp = await fetch(`https://fruizotero.com/buscar?nombre=${nombre}`);

        let json = await resp.json();

        if (!resp.ok) throw { status: resp.status, statusText: resp.statusText };

        return json["result"];

    } catch (error) {

        console.log(error);
    }

}