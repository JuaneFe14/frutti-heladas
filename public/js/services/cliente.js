// #region atributos
const ref = db.collection('cliente') // referencia a la coleccion (tabla)
const clientes = [] // array para almacenar los datos de la coleccion

// atributos del formulario para el DOM
const documento = document.getElementById('documento')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const correo = document.getElementById('correo')
const fechaNacimiento = document.getElementById('fechaNacimiento')

// botones de accion del formulario
const btnFactura = document.getElementById('btnFactura')
const btnCrearCliente = document.getElementById('btnCrearCliente')

    // #endregion

    //#region funciones

    // Obtener los datos completos de una coleccion (tabla)
    (() => {
        ref.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No hay datos')
            }
            for (let i = 0; i < querySnapshot.docs.length; i++) {
                clientes.push(querySnapshot.docs[i].data())
            }
        })
        btnFactura.classList.add('disabled')
    })()

// buscar un cliente por su documento
const clienteByDocument = (documento) => clientes.find((cliente) => cliente.documento === documento)

// obtener un unico dato de la coleccion previa con un metodo de un array
function getById() {
    const searchCliente = clienteByDocument(documento.value.trim())
    if (searchCliente) {
        //mapear los datos en el formulario
        documento.value = searchCliente.documento
        nombre.value = searchCliente.nombre
        apellido.value = searchCliente.apellido
        correo.value = searchCliente.correo
        fechaNacimiento.value = searchCliente.fechaNacimiento
        console.log(searchCliente.id);

        btnFactura.classList.remove('disabled')
        btnFactura.focus()
        location.href = '/factura.html'
    } else {
        nombre.focus()
    }
}

// crear un nuevo documento en la coleccion
function create() {
    if (documento.value.trim() === '' || nombre.value.trim() === '' || apellido.value.trim === '' || correo.value.trim() === '' || fechaNacimiento.value.trim() === '') {
        documento.focus()
        return
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
            console.log('Document written with ID: ', docRef.id)
            location.href = '/factura.html'
        })
        .catch((error) => {
            console.error('Error adding document: ', error)
            documento.focus()
        })
}

// actualizar un documento en la coleccion
function update() {
    if (documento.value.trim() === '' || nombre.value.trim() === '' || apellido.value.trim() === '' || correo.value.trim() === '' || fechaNacimiento.value.trim() === '') {
        documento.focus()
        return
    }

    ref.doc(`${searchCliente.id}`).update({
        documento: `${documento.value.trim()}`,
        nombre: `${nombre.value.trim()}`,
        apellido: `${apellido.value.trim()}`,
        correo: `${correo.value.trim()}`,
        fechaNacimiento: `${fechaNacimiento.value.trim()}`
    })
        .then(() => {
            console.log('Document successfully updated!')
        })
        .catch((error) => {
            console.error('Error updating document: ', error)
            documento.focus()
        })
}
//#endregion

//#region eventos
btnCrearCliente.addEventListener('click', () => {
    const searchCliente = clienteByDocument(documento.value.trim())
    if (searchCliente) {
        update()
    } else {
        create()
    }
})
//#endregion