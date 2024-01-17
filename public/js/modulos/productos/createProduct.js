const ref = db.collection('cliente'); // referencia a la coleccion (tabla)

// atributos del formulario para el DOM
const presentacion = document.getElementById('presentacion');
const nombre = document.getElementById('nombre');

// crear un nuevo presentacion en la coleccion
const createProduct = () => {
    if (nombre.value.trim() === '' || presentacion.value.trim() === '') {
        nombre.focus();
        return;
    }

    // Add a second document with a generated ID.
    ref.add({
        nombre: `${nombre.value.trim()}`,
        presentacion: `${presentacion.value.trim()}`,
    })
        .then((docRef) => {
            alert('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
            alert('Error adding document: ', error);
            presentacion.focus();
        });
};