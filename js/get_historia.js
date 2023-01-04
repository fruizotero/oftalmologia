export const getHistoria = async (codigo) => {

    try {

        // let resp = await fetch(`http://localhost/oftalmologia/historias?codigo=${codigo}`);
        let resp = await fetch(`https://fruizotero.com/historias?codigo=${codigo}`);

        let json = await resp.json();

        if (!resp.ok) throw { status: resp.status, statusText: resp.statusText };

        return json["result"];

    } catch (error) {

        console.log(error);
    }

}