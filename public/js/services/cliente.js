// #region atributos
const ref = db.collection('cliente'); // referencia a la coleccion (tabla)
const clientes = []; // array para almacenar los datos de la coleccion

// atributos del formulario para el DOM
const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const fechaNacimiento = document.getElementById('fechaNacimiento');

// botones de accion del formulario
const btnFactura = document.getElementById('btnFactura');
const btnCrearCliente = document.getElementById('btnCrearCliente');
// #endregion

//#region tabla
const tbody = document.getElementById('tbody');
//#endregion

//#region funciones

(
    async () => {
        await ref.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No hay datos');
            }
            for (let i = 0; i < querySnapshot.docs.length; i++) {
                clientes.push(querySnapshot.docs[i].data());
            }
        });

        if (clientes.length > 0) {
            cargarTabla();
        }
    }
)();

const cargarTabla = () => {
    clientes.forEach((cliente) => {
        tbody.innerHTML += `
            <tr>
                <td>${cliente.documento}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.fechaNacimiento}</td>
            </tr>
        `;
    })
};
// buscar un cliente por su documento
const clienteByDocument = (documento) => clientes.find((client) => client.documento === documento);

// obtener un unico dato de la coleccion previa con un metodo de un array
async function getById() {
    if (documento.value.trim() === '') {
        documento.focus();
        return;
    }

    const searchCliente = clienteByDocument(documento.value.trim());
    const client = await searchCliente;

    if (client) {
        //mapear los datos en el formulario
        documento.value = client.documento
        nombre.value = client.nombre
        apellido.value = client.apellido
        correo.value = client.correo
        fechaNacimiento.value = client.fechaNacimiento

        btnFactura.focus();
        // location.href = '/factura.html'
    } else {
        console.error('No se encontro el cliente');
        nombre.focus();
    }
};

// crear un nuevo documento en la coleccion
function create() {
    if (documento.value.trim().trim() === '' || nombre.value.trim() === '' || apellido.value.trim() === '' || correo.value.trim() === '' || fechaNacimiento.value.trim() === '') {
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
            console.log('Document written with ID: ', docRef.id);
            location.href = '/factura.html';
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            documento.focus();
        });
};

// actualizar un documento en la coleccion
function update(id) {
    if (documento.value.trim().trim() === '' || nombre.value.trim() === '' || apellido.value.trim() === '' || correo.value.trim() === '' || fechaNacimiento.value.trim() === '') {
        documento.focus();
        return;
    }

    ref.doc(`${id}`).update({
        documento: `${documento.value.trim()}`,
        nombre: `${nombre.value.trim()}`,
        apellido: `${apellido.value.trim()()}`,
        correo: `${correo.value.trim()}`,
        fechaNacimiento: `${fechaNacimiento.value.trim()}`
    })
        .then(() => {
            console.log('Document successfully updated!');
            btnFactura.focus();
        })
        .catch((error) => {
            console.error('Error updating document: ', error);
            documento.focus();
        })
};
//#endregion

// #region eventos
btnCrearCliente.addEventListener('click', () => {
    const searchCliente = clienteByDocument(documento.value.trim());
    if (searchCliente) {
        update(searchCliente.id);
    } else {
        create();
    }
});
//#endregion