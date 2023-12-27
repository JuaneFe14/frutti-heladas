//#region atributos
const ref = db.collection("cliente");
const clientes = [];

const documento = document.getElementById("documento");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("correo");
const fechaNacimiento = document.getElementById("fechaNacimiento");

const btnFactura = document.getElementById("btnFactura");
const btnCrearCliente = document.getElementById("btnCrearCliente");

//#endregion


(() => {
    ref.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log("No hay datos");
        }
        for (let i = 0; i < querySnapshot.docs.length; i++) {
            clientes.push(querySnapshot.docs[i].data())
        }
    });
    btnFactura.classList.add("disabled");
})()

function getById() {
    const searchCliente = clientes.find((cliente) => cliente.documento === documento.value.trim())
    if (searchCliente) {
        alert("El cliente ya existe");
        btnFactura.classList.remove("disabled");
        location.href = "/public/factura.html"
        return;
    } else {
        nombre.focus();
    }
}



function create() {

    if (documento.value.trim() === "" || nombre.value.trim() === "" || apellido.value().trim === "" || correo.value.trim() === "" || fechaNacimiento.value.trim() === "") {
        documento.focus();
        return;
    }

    // Add a second document with a generated ID.
    ref.add({
        documento: `${documento.value.trim()}`,
        nombre: `${nombre.value.trim()}`,
        apellido: `${apellido.value.trim()}`,
        correo: `${correo.value.trim()}`,
        fechaNacimiento: `${fechaNacimiento.value.trim()}`
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            documento.focus();
        });
}

function update() {
    const searchCliente = clientes.find((cliente) => cliente.documento === documento.value.trim())
    if (searchCliente) {
        if (documento.value.trim() === "" || nombre.value.trim() === "" || apellido.value.trim() === "" || correo.value.trim() === "" || fechaNacimiento.value.trim() === "") {
            documento.focus();
            return;
        }

        ref.doc(`${id}`).update({
            documento: `${documento.value.trim()}`,
            nombre: `${nombre.value.trim()}`,
            apellido: `${apellido.value.trim()}`,
            correo: `${correo.value.trim()}`,
            fechaNacimiento: `${fechaNacimiento.value.trim()}`
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
                documento.focus();
            });
    }
}