const getById = (user) => {
    db.collection(`${user}`).get().then((querySnapshot) => {
        querySnapshot.map((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
}