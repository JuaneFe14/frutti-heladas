const ref = db.collection('cliente').get(); // referencia a la coleccion (tabla)
const tbody = document.getElementById('tbody'); //tabla

(async () => {
    await ref.then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log(`No hay datos ${querySnapshot.docs}`);
        }
        for (let i = 0; i < querySnapshot.docs.length; i++) {
            tbody.innerHTML += `
                <tr>
                    <td>${querySnapshot.docs[i].data().documento}</td>
                    <td>${querySnapshot.docs[i].data().nombre}</td>
                    <td>${querySnapshot.docs[i].data().apellido}</td>
                    <td>${querySnapshot.docs[i].data().correo}</td>
                    <td>${querySnapshot.docs[i].data().fechaNacimiento}</td>
                    <td>Editar | Borrar</td>
                </tr>
            `;
        }
    }).catch((error) => {
        console.error('Error: ', error);
    });
})();