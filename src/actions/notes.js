import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
 
        dispatch ( activeNote( doc.id, newNote ) );
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

})



export const startLoadingNotes = ( uid ) => {
    return async( dispacth ) => {
        
        const notes = await loadNotes( uid );
        dispacth( setNotes( notes ) );
        
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        if ( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );
        
        dispatch( resfreshNote( note.id, noteToFirestore ) );
        Swal.fire('Note Saved', note.title, 'success');

    }
}

export const resfreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async ( dispacth, getState ) => {
        
        const { active:activeNote } = getState().notes;

        const fileUrl = await fileUpload( file );

        console.log(fileUrl);


    }
}