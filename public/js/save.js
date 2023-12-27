const createClient = () => {
    const nombre = document.getElementById("nombre").value.trim().toUpperCase();
    const apellido = document.getElementById("apellido").value.trim().toUpperCase();
    const documento = document.getElementById("documento").value.trim().toUpperCase();
    const telefono = document.getElementById("telefono").value.trim().toUpperCase();
    if (nombre === "" || apellido === "" || documento === "" || telefono === "") {
        alert("Todos los campos son obligatorios");
        return;
    } else {
        db.collection("cliente").add({
            nombre: "Ada",
            apellido: "Lovelace",
            documento: 1815,
            telefono: "123456789",
        })
            .then((docRef) => {
                alert("Document written with document: ", docRef.documento);
            })
            .catch((error) => {
                alert("Error: ", error);
            });
    }
}