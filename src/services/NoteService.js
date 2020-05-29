import { Firebase } from '../config/Firebase';
import { mapToArray } from '../utils/firebaseArray';
import axios from 'axios';

const noteCollection = 'notes';

const url = "https://us-central1-notes-1e004.cloudfunctions.net"


export async function getNotes(userId) {
    try {
        const result = await fetch(`${url}/getNotes`);
        const notes = await result.json();

        return notes;
    }
    catch (error) {
    };


}

export async function deleteNotesWithId(noteId) {
    try {
        const res = await axios.delete(`${url}/delete?id=${noteId}`);
        res.data;
    }
    catch (error) {
        return alert(">>>:  " + error);
    }

}

export async function getNoteById(noteId) {
    try {
        const result = await fetch(`${url}/getNotesById?id=${noteId}`);
        const note = await result.json();
        return note;
    }
    catch (error) {
    };
}


export async function createNotes(note) {
    try {
        const res = await axios.post(`${url}/addNotes`, note);
        res.data
    }
    catch (error) {
        return alert(">>>:  " + error);
    }
}

