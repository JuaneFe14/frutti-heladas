const ref = db.collection('cliente'); // referencia a la coleccion (tabla)

// atributos del formulario para el DOM
const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const fechaNacimiento = document.getElementById('fechaNacimiento');

// obtener un unico dato de la coleccion previa con un metodo de un array
function getByDocument() {
    if (documento.value.trim() === '') {
        documento.focus();
        return;
    }

    ref.where('documento', '==', documento.value.trim()).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log(`No hay datos ${querySnapshot.docs}`);
        }
        //mapear los datos en el formulario
        documento.value = querySnapshot.docs.data().documento
        nombre.value = querySnapshot.docs.data().nombre
        apellido.value = querySnapshot.docs.data().apellido
        correo.value = querySnapshot.docs.data().correo
        fechaNacimiento.value = querySnapshot.docs.data().fechaNacimiento
    }).catch((error) => {
        console.error('Error: ', error);
    });
};