// #region atributos
const ref = db.collection('cliente') // referencia a la coleccion (tabla)
const clientes = [] // array para almacenar los datos de la coleccion

// atributos del formulario para el DOM
const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const fechaNacimiento = document.getElementById('fechaNacimiento');

// botones de accion del formulario
const btnFactura = document.getElementById('btnFactura');
const btnCrearCliente = document.getElementById('btnCrearCliente');

const cliente = {
    documento: cliente.documento.trim(),
    nombre: cliente.nombre.trim(),
    apellido: cliente.apellido.trim(),
    correo: cliente.correo.trim(),
    fechaNacimiento: cliente.fechaNacimiento.trim()
};

// #endregion

//#region funciones

// Obtener los datos completos de una coleccion (tabla)
(() => {
    ref.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log('No hay datos');
        }
        for (let i = 0; i < querySnapshot.docs.length; i++) {
            clientes.push(querySnapshot.docs[i].data());
        }
    });
    btnFactura.classList.add('disabled');
})();

// buscar un cliente por su documento
const clienteByDocument = (documento) => clientes.find((cliente) => cliente.documento === documento);

// obtener un unico dato de la coleccion previa con un metodo de un array
function getById() {
    const searchCliente = clienteByDocument(cliente.documento.trim());
    if (searchCliente) {
        //mapear los datos en el formulario
        cliente.documento = searchCliente.documento
        cliente.nombre = searchCliente.nombre
        cliente.apellido = searchCliente.apellido
        cliente.correo = searchCliente.correo
        cliente.fechaNacimiento = searchCliente.fechaNacimiento

        btnFactura.classList.remove('disabled');
        btnFactura.focus();
        // location.href = '/factura.html'
    } else {
        nombre.focus();
    }
}

// crear un nuevo documento en la coleccion
function create() {
    if (cliente.documento.trim() === '' || cliente.nombre.trim() === '' || cliente.apellido.trim === '' || cliente.correo.trim() === '' || cliente.fechaNacimiento.trim() === '') {
        documento.focus();
        return;
    }

    // Add a second document with a generated ID.
    ref.add({
        documento: `${cliente.documento.trim()}`,
        nombre: `${cliente.nombre.trim()}`,
        apellido: `${cliente.apellido.trim()}`,
        correo: `${cliente.correo.trim()}`,
        fechaNacimiento: `${cliente.fechaNacimiento.trim()}`
    })
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
            location.href = '/factura.html';
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            documento.focus();
        });
}

// actualizar un documento en la coleccion
function update() {
    if (cliente.documento.trim() === '' || cliente.nombre.trim() === '' || cliente.apellido.trim() === '' || cliente.correo.trim() === '' || cliente.fechaNacimiento.trim() === '') {
        documento.focus();
        return;
    }

    ref.doc(`${searchCliente.id}`).update({
        documento: `${cliente.documento.trim()}`,
        nombre: `${cliente.nombre.trim()}`,
        apellido: `${cliente.apellido.trim()}`,
        correo: `${cliente.correo.trim()}`,
        fechaNacimiento: `${cliente.fechaNacimiento.trim()}`
    })
        .then(() => {
            console.log('Document successfully updated!');
            btnFactura.focus();
        })
        .catch((error) => {
            console.error('Error updating document: ', error);
            documento.focus();
        })
}
//#endregion

//#region eventos
btnCrearCliente.addEventListener('click', () => {
    const searchCliente = clienteByDocument(cliente.documento.trim());
    if (searchCliente) {
        update();
    } else {
        create();
    }
})
//#endregion