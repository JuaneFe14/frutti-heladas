const ref = db.collection('cliente'); // referencia a la coleccion (tabla)

// atributos del formulario para el DOM
const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const fechaNacimiento = document.getElementById('fechaNacimiento');
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