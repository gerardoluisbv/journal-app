 /**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import * as fs from 'fs';
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {

        active: {
            id: 'TT6zzsU1WL5LxJdmjfBf',
            title: 'Hola',
            body: 'Mundo'
        }
        
        
    }
};

let store = mockStore(initialState);

// mock para el file

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}))

describe('Pruebas con las acciones de notes', () => {

    afterAll(() => {
        db.disableNetwork()
    })

    beforeEach( () => {
        store = mockStore(initialState);
    })
    
    test('debe de crear una nueva nota', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        // console.log(actions);

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        
        // console.log(uid);

        const uid = actions[1].payload.id;

        await db.doc(`TESTING/journal/notes/${ uid }`).delete();
        
    });

    test('startLoadNotes desde de cargar las notas', async () => {
        
        await store.dispatch( startLoadingNotes('TESTING') );

        const actions = store.getActions();

        expect( actions[0]).toEqual({
           type: types.notesLoad,
           payload: expect.any(Array) 
        }); 

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: "soy el body de la nota", // MATCH CON ESTE CAMPO EN LA 1RA POSICION DE LA BDD DE PRUEBAS
            date: expect.any(Number)
        }

        expect( actions[0].payload[1]).toMatchObject(expected);


    });

    test('startSaveNote debe de actualizar la nota', async () => {
        
        const note = {
            id:"3CqAPkfGaeLORB9b2ltV",
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startSaveNote( note ) );
        const actions = store.getActions(); // RETORNA ARREGLO DE ACTIONS

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect(docRef.data().title).toBe( note.title );

    });


    test('startUploading  debe de actualizar el url del entry', async () => {
        
       
        fileUpload.mockReturnValue('https://prueba-file.com/file.jpg');
        fs.writeFileSync('foto.jpg', '');  
        const file = fs.readFileSync('foto.jpg');
        await store.dispatch( startUploading(file) );

        const docRef = await db.doc(`/TESTING/journal/notes/TT6zzsU1WL5LxJdmjfBf`).get();

        expect(docRef.data().url).toBe('https://prueba-file.com/file.jpg');

    });

});
