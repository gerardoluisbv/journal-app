 /**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

import "@testing-library/jest-dom";

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);


describe('Pruebas con las acciones de auth', () => {

    beforeEach( () => {
        store = mockStore(initialState);
    })
    
    test('login y logout deben de crear la accion respectiva', () => {
        
        const uid = '123456';
        const displayName = 'Gerardo';

        const actionLogin = login(uid, displayName);
        const actionLogout = logout();

        expect( actionLogin ).toEqual( {
            type: types.login,
            payload: {
                uid,
                displayName
            }
        } );
    

        expect( actionLogout ).toEqual({
            type: types.logout
        });
        
    });


    test('debe de realizar el logout', async () => {
            
        await store.dispatch( startLogout() );
        const actions = store.getActions();

        //console.log(actions);

        expect( actions[0]).toEqual({
            type: types.logout
        });
        
        expect( actions[1]).toEqual({
            type: types.notesLogoutCleaning
        }) 

    });

    test('debe de iniciar el startLoginEmailPassword', async () => {
        
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

        const actions = store.getActions();

        expect( actions[1]).toEqual({
            type: types.login,
            payload : {
                uid: 'kJPuBI92VqdimOZUkUkBlq3elk32',
                displayName: null                
            }
        }) 

    });



});