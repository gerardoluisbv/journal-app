import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";



describe('Pruebas en el authReducer', () => {
    test('Debe de retornar el UID y el Display name - Hacer Login', () => {
        
        const inicialState = {};

        const action = {
            type: types.login,
            payload : {
                uid: 123456,
                displayName: "Gerardo",
            }
        }
        
        const state = authReducer(inicialState, action);
        console.log(state);

        expect( state ).toEqual( {
            uid: 123456,
            name: "Gerardo",
        } );
    })

    test('Debe realizar Loguot', () => {
        
        const inicialState = {
            uid: '123456',
            name: "Juan",
        };

        const action = {
            type: types.logout
        }
        
        const state = authReducer(inicialState, action);
        expect( state ).toEqual( { } );
    })

    test('No debe de hacer cambios en el state - Debe de retornar el mismo estado', () => {
        
        const inicialState = {
            uid: '123456',
            name: "Juan",
        };

        const action = {
            type: 'sddvwdv(TypeDoesntExist)',
        }
        
        const state = authReducer(inicialState, action);
        expect( state ).toEqual( inicialState );
    })




});