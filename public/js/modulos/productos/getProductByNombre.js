const ref = db.collection('cliente'); // referencia a la coleccion (tabla)

// atributos del formulario para el DOM
const nombre = document.getElementById('nombre');
const presentacion = document.getElementById('presentacion');

// obtener un unico dato de la coleccion previa con un metodo de un array
function getByNombre() {
    if (nombre.value.trim() === '') {
        nombre.focus();
        return;
    }

    ref.where('nombre', '==', nombre.value.trim()).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log(`No hay datos ${querySnapshot.docs}`);
        }
        //mapear los datos en el formulario
        nombre.value = querySnapshot.docs.data().nombre
        presentacion.value = querySnapshot.docs.data().presentacion
    }).catch((error) => {
        console.error('Error: ', error);
    });
};