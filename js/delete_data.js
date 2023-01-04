
export const deletePaciente = async (codigo, callback = () => { }) => {
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        };

        // let res = await fetch(`http://localhost/oftalmologia/pacientes?codigo=${codigo}}`, options);
        let res = await fetch(`https://fruizotero.com/pacientes?codigo=${codigo}}`, options);
        
        let json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        console.log(json);
        // location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        console.log(message);
        callback("Ocurrió un error. Por favor vuelve a intentarlo")
    }
}