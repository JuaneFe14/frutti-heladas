// #region atributos
const ref = db.collection('productos'); // referencia a la coleccion (tabla)
const productos = []; // array para almacenar los datos de la coleccion
//#endregion

//#region funciones
(
    async () => {
        await ref.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No hay datos');
            }
            for (let i = 0; i < querySnapshot.docs.length; i++) {
                productos.push(querySnapshot.docs[i].data());
            }
        });
    }
)();
//#endregion

// #region eventos
//#endregion