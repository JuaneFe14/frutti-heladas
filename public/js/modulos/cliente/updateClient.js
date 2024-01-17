const ref = db.collection('cliente'); // referencia a la coleccion (tabla)

// atributos del formulario para el DOM
const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const fechaNacimiento = document.getElementById('fechaNacimiento');

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