const ref = db.collection('cliente'); // referencia a la coleccion (tabla)

// atributos del formulario para el DOM
const nombre = document.getElementById('nombre');
const presentacion = document.getElementById('presentacion');

// actualizar un presentacion en la coleccion
function update(id) {
    if (nombre.value.trim() === '') {
        nombre.focus();
        return;
    }

    ref.doc(`${id}`).update({
        nombre: `${nombre.value.trim()}`,
        presentacion: `${presentacion.value.trim() || " "}`,
    })
        .then(() => {
            alert('Document successfully updated!');
        })
        .catch((error) => {
            alert('Error updating document: ', error);
            nombre.focus();
        })
};