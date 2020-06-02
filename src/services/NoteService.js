import axios from 'axios';

const url = "https://us-central1-notes-1e004.cloudfunctions.net/notes"

export async function getNotes(userId) {
    try {
        const result = await axios.get(`${url}`);
        const allNotes = result.data;
        const notesByCurrentUserId = allNotes.filter(note => { return note.userId === userId });
        return notesByCurrentUserId;
    }
    catch (error) {
        return alert(error);
    };
}

export async function deleteNotesWithId(noteId) {
    try {
        const res = await axios.delete(`${url}/${noteId}`);

    }
    catch (error) {
        return alert(error);
    }

}

export async function getNoteById(noteId) {
    try {
        const result = await axios.get(`${url}/${noteId}`);
        return result.data;
    }
    catch (error) {
        return alert(error);
    };
}


export async function createNotes(note) {
    try {
        const notes = await axios.post(`${url}/`, note);
        return notes.data;
    }
    catch (error) {
        return alert(error);
    }
}

export async function updateNote(note, noteId) {
    try {
        await axios.put(`${url}/${noteId}`, note);
    } catch (error) {
        return alert(error);
    }
}
