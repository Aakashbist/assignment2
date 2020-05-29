import { Firebase } from '../config/Firebase';
import { mapToArray } from '../utils/firebaseArray';
import axios from 'axios';

const url = "https://us-central1-notes-1e004.cloudfunctions.net"


export async function getNotes() {

    try {
        const result = await axios.get(`${url}/getNotes`);
        return result.data;
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
        const result = await axios.get(`${url}/getNotesById?id=${noteId}`);
        return result.data;
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

