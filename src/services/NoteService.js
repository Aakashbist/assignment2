import { Firebase } from '../config/Firebase';
import { mapToArray } from '../utils/firebaseArray';

const noteCollection = 'notes';



export function updateProperty(note, key) {
    return new Promise((resolve, reject) => {
        let dbNoteRef = Firebase.database().ref().child(`${noteCollection}/${key}`);
        dbNoteRef.update(note)
            .then(resolve())
            .catch(error => reject(error));
    });
}

export function getNotesByUserId(userId) {
    let dbNoteRef = Firebase.database().ref(`${noteCollection}/`);
    return new Promise((resolve, reject) => {
        const onResponse = (dataSnapshot) => {
            if (dataSnapshot.exists()) {
                let data = dataSnapshot.val();
                let result = mapToArray(data);
                resolve(result);
            } else {
                resolve([])
            }
        };
        dbNoteRef.orderByChild(`userId`).equalTo(userId).on('value', onResponse);
    }
    )

}

export function deleteNotesWithId(noteId) {
    let dbNoteRef = Firebase.database().ref(`${noteCollection}/${noteId}`);
    return new Promise((resolve, reject) => {
        return dbNoteRef.remove()
            .then(resolve())
            .catch(error => reject(error));
    });
}

export function getPropertyById(noteId) {
    return new Promise((resolve, reject) => {
        let dbNoteRef = Firebase.database().ref(`${noteCollection}/${noteId}`);
        return dbNoteRef.once("value", snapShot => {
            let data = snapShot.val();
            resolve(data);
        }, error => reject(error));
    })
}

export function createNotes(note) {
    return new Promise((resolve, reject) => {
        let dbNoteRef = Firebase.database().ref().child(noteCollection);
        dbNoteRef.push(note)
            .then((snapshot) => {
                resolve(snapshot.key);
            })
            .catch(error => reject(error));
    });
}
